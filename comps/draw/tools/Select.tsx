import React from "react";
import { useTypedSelector } from "../../../ducks";
import Halo from "../halo";
import Shape from "../shape";
import SelectArea from "./SelectArea";

const Select = () => {
    const [drawing, selectState] = useTypedSelector((state) => [
        state.drawing.present,
        state.select,
    ]);

    if (["outsideDownArea", "insideDownArea"].includes(selectState.value as string)) {
        return <SelectArea />;
    }

    return <>
        <g>
            {drawing.shapes.map((shape) =>
                <Shape
                    key={shape.id}
                    px={drawing.px}
                    shape={shape}
                    solution={drawing.solution} />)}
        </g>
        <g>
            {drawing.shapes.map((shape) =>
                <Halo key={shape.id}
                    shape={shape}
                    px={drawing.px}
                    material={drawing.material}
                    solution={drawing.solution}
                    selected={false}
                    onMouseEnter={() => { }}
                    onMouseLeave={() => { }} />)}
        </g>
    </>;
};

export default Select;
