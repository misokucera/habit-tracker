import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

describe("Breadcrumbs", () => {
    it("render with segment", () => {
        render(<Breadcrumbs segments={["detail"]} />);

        expect(
            screen.getByRole("link", { name: /\/habit-tracker/i })
        ).toBeInTheDocument();

        expect(screen.getByText("/detail")).toBeInTheDocument();
    });
});
