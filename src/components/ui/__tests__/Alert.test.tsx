import { render, screen } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert", () => {
    it("render with correct role", () => {
        render(<Alert>Some message</Alert>);

        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
});
