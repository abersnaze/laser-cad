import React, { useMemo } from "react";
import { useTypedSelector } from "../../../ducks";
import * as BSP from "../../../lib/BSP";
import Shape from "../shape";

const SelectArea = () => {
    const [drawing, selectState, cursor] = useTypedSelector((state) => [
        state.drawing.present,
        state.select,
        state.app.cursor,
    ]);

    const tree = useMemo(BSP.generator(cursor, drawing.solution, drawing.shapes), [
        BSP.generator,
        cursor,
        drawing.solution,
        drawing.shapes,
    ]);
    const inside = BSP.search(tree, cursor);

    return <>
        <g>
            {drawing.shapes.map((shape) =>
                <Shape
                    key={shape.id}
                    px={drawing.px}
                    shape={shape}
                    solution={drawing.solution} />)}
        </g>
    </>;
};

export default SelectArea;
