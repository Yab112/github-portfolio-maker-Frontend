import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const Counter = () => {
    const [count, setCount] = useState(0);
    return (_jsxs("div", { children: [_jsxs("p", { children: ["Count: ", count] }), _jsx("button", { onClick: () => setCount(count + 1), children: "Increment" })] }));
};
export default Counter;
