import React from "react";
import { useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "../../../ducks/mouse";

const Line = ({ shape, px, solution }) => {
    const ay = solution[shape.a.y];
    const by = solution[shape.b.y];
    const ax = solution[shape.a.x];
    const bx = solution[shape.b.x];
    const strokeWidth = 20 * px;
    const dispatch = useDispatch();

    return (<line
        x1={ax} y1={ay}
        x2={bx} y2={by}
        strokeWidth={strokeWidth}
        onMouseEnter={() => dispatch(mouseEnter(shape.id))}
        onMouseLeave={() => dispatch(mouseLeave(shape.id))}
    />);
};

export default Line;
