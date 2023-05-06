import React from "react";
import { useTypedSelector } from "../../../ducks";
import Halos from "../Halos";
import Shape from "../shape";
import SelectArea from "./SelectArea";

const Select = () => {
    const [drawing, selectState] = useTypedSelector((state) => [
        state.drawing.present,
        state.select,
    ]);

    return <>
        <g>
            {drawing.shapes.map((shape) =>
                <Shape
                    key={shape.id}
                    px={drawing.px}
                    shape={shape}
                    selected={shape.id in selectState.context.selected}
                    hover={shape.id in selectState.context.hover}
                    solution={drawing.solution} />)}
        </g>
        <Halos />
    </>;
};

export default Select;
