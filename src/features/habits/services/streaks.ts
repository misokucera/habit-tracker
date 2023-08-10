import { db } from "@/services/firebase";
import {
    Timestamp,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { StatusType } from "../contexts/StatusesContexts";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Habit } from "../contexts/HabitsContexts";
import { normalizeDate } from "@/utils/day";

dayjs.extend(isBetween);

export const updateStreaks = async (
    userId: string,
    habit: Habit,
    date: Date,
    statusType: StatusType,
) => {
    const habitRef = doc(db, `users/${userId}/habits/${habit.id}`);

    console.log("---- start edit -----");
    console.log("streak start date", habit.streakStartDate);
    console.log("streak end date", habit.streakEndDate);

    if (!habit.streakStartDate || !habit.streakEndDate) {
        console.log("streak does not exist");
        return await updateDoc(habitRef, {
            streakStartDate: Timestamp.fromDate(normalizeDate(date)),
            streakEndDate: Timestamp.fromDate(normalizeDate(date)),
        });
    }

    console.log("streak exists");

    const isInsideStreak = dayjs(date).isBetween(
        habit.streakStartDate,
        habit.streakEndDate,
        "date",
        "[]",
    );

    if (isInsideStreak) {
        console.log("date is inside streak");
        if (statusType === "success") {
            console.log("status type is done");
            return;
        }

        console.log("status type is not done");

        return await updateDoc(habitRef, {
            streakEndDate: Timestamp.fromDate(normalizeDate(date)),
        });
    }

    if (statusType === "success") {
        console.log("status type is done");
        const isDateRightAfterStreak = dayjs(date).isSame(
            dayjs(habit.streakEndDate).add(1, "day"),
            "date",
        );

        if (isDateRightAfterStreak) {
            console.log("date is right after streak");
            return await updateDoc(habitRef, {
                streakEndDate: Timestamp.fromDate(normalizeDate(date)),
            });
        }

        const isDateRightBeforeStreak = dayjs(date).isSame(
            dayjs(habit.streakStartDate).subtract(1, "day"),
            "date",
        );

        if (isDateRightBeforeStreak) {
            console.log("date is right before streak");
            return await updateDoc(habitRef, {
                streakStartDate: Timestamp.fromDate(normalizeDate(date)),
            });
        }
    }

    const q = query(
        collection(db, `users/${userId}/statuses/`),
        where("habitId", "==", habit.id),
        orderBy("date", "desc"),
    );

    const querySnapshot = await getDocs(q);

    // count all consecutive statuses in querySnapshots with type success from the beginning

    let streakStartDate: Date | null = null;
    let streakEndDate: Date | null = null;

    querySnapshot.docs.every((snapshot) => {
        if (snapshot.data().type === "success") {
            if (streakEndDate === null) {
                streakEndDate = snapshot.data().date.toDate();
            }
            streakStartDate = snapshot.data().date.toDate();
        }

        if (
            snapshot.data().type === "blocker" ||
            snapshot.data().type === "failure"
        ) {
            return false;
        }
    });

    console.log("date is not right after or before streak");

    console.log("streak start", streakStartDate);
    console.log("streak end", streakEndDate);

    return await updateDoc(habitRef, {
        streakStartDate: streakStartDate
            ? Timestamp.fromDate(normalizeDate(streakStartDate))
            : null,
        streakEndDate: streakEndDate
            ? Timestamp.fromDate(normalizeDate(streakEndDate))
            : null,
    });
};
