import React from "react";
import { useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "../../../ducks/mouse";

const Circle = ({ shape, px, solution }) => {
    const cx = solution[shape.center.x];
    const cy = solution[shape.center.y];
    const tx = solution[shape.through.x];
    const ty = solution[shape.through.y];
    const strokeWidth = 20 * px;
    const r = Math.hypot(cx - tx, cy - ty);
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
