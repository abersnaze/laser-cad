import React from "react";
import { useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "../../../ducks/mouse";

const Point = ({ shape, px, solution, onMouseEnter, onMouseLeave }) => {
    const dispatch = useDispatch();
    return <circle
        strokeWidth="0"
        cx={solution[shape.x]}
        cy={solution[shape.y]}
        r={10 * px}
        onMouseEnter={() => dispatch(mouseEnter(shape.id))}
        onMouseLeave={() => dispatch(mouseLeave(shape.id))}
    />;
};

export default Point;
