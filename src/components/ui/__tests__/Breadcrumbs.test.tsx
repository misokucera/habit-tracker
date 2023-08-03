import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

describe("Breadcrumbs", () => {
    it("render with segment", () => {
        render(
            <Breadcrumbs
                segments={[
                    { name: "segment with href", href: "/detail" },
                    { name: "segment without href" },
                ]}
            />,
        );

        expect(
            screen.getByRole("link", { name: /habit-tracker/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /segment with href/i }),
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("link", { name: /segment without href/i }),
        ).not.toBeInTheDocument();

        expect(screen.getByText(/segment with href/i)).toBeInTheDocument();
    });
});
