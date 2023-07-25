# Habit tracker

Simple application to track habits.

You can try it at: [habit-tracker-project.vercel.app](https://habit-tracker-project.vercel.app/).

## About

This is my personal project designed to assist me in building my daily routine, but it is open for use by everyone.

> **Warning:**
> Please keep in mind that this project also serves as a playground for me to try new libraries and other tools. I can't guarantee anything, except that I won't misuse any data in the application.

Application is built on Next.js and hosted on Vercel. Authentication and database are provided by Firebase. Database is located in Europe.

## Getting started

You can run application by yourself, but first, you need to create Firebase project with:

-   **Authentication** with enabled following sign-in methods: Google, Anonymous
-   **Firestore** database with index on *statuses* collection (please follow steps in console error after first run)

After that, you will need to create a .env file at the root of the project and include the following variables:
```env
NEXT_PUBLIC_API_KEY="..."
NEXT_PUBLIC_PROJECT_ID="..."
NEXT_PUBLIC_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_APP_ID="..."
```

Values are available at you Firebase project.

To start application locally run commands:
```
npm install

npm run dev
```

## Next steps
- Add streak counter (for every habit)
- Add multiple status options for every day (`success`, `failure`, `obstacle`)