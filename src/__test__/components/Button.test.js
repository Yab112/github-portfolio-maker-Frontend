import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/Buttons/Button";
test("renders button with correct label", () => {
    render(_jsx(Button, { label: "Click Me", onClick: () => { } }));
    expect(screen.getByText("Click Me")).toBeInTheDocument();
});
test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(_jsx(Button, { label: "Click Me", onClick: handleClick }));
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
