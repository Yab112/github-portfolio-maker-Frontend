import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../../components/Counter/Counter";
test("renders counter and increments on button click", () => {
    render(_jsx(Counter, {}));
    const counterText = screen.getByText(/Count:/i);
    expect(counterText).toHaveTextContent("Count: 0");
    const button = screen.getByText("Increment");
    fireEvent.click(button);
    expect(counterText).toHaveTextContent("Count: 1");
});
