import React from "react";
import { useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "../../../ducks/mouse";

const Circle = ({ shape, px, solution }) => {
    const cx = solution[shape.center.x];
    const cy = solution[shape.center.y];
    const r = solution[shape.radius];
    const strokeWidth = 20 * px;
    const dispatch = useDispatch();

    return <circle
        fill="none"
        strokeWidth={strokeWidth}
        cx={cx}
        cy={cy}
        r={r}
        onMouseEnter={() => dispatch(mouseEnter(shape.id))}
        onMouseLeave={() => dispatch(mouseLeave(shape.id))}
    />;
};

export default Circle;
