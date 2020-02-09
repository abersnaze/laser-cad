import { Assignments } from "2d-algebra";
import React, { useMemo } from "react";
import { useTypedSelector } from "../../../ducks";
import * as BSP from "../../../lib/BSP";
import { IPoint } from "../../../lib/IPoint";
import Halo from "../halo";
import Shape from "../shape";

const SelectArea = () => {
    const [drawing, selectState, cursor] = useTypedSelector((state) => [
        state.drawing.present,
        state.select,
        state.app.cursor,
    ]);

    const quad: BSP.IQuad = useMemo(() => {
        const tmp = BSP.generatorFromPoint(selectState.context.from, drawing.solution, drawing.shapes);
        return tmp;
    }, [
        BSP.generatorFromPoint,
        selectState.context.from,
        drawing.solution,
        drawing.shapes,
    ]);

    if (cursor === undefined) {
        return <g>
            {drawing.shapes.map((shape) =>
                <Shape
                    key={shape.id}
                    px={drawing.px}
                    shape={shape}
                    solution={drawing.solution} />)}
        </g>;
    }

    const over = BSP.search(quad, cursor);
    const bounds = {
        maxX: Math.max(selectState.context.from.x, cursor.x),
        maxY: Math.max(selectState.context.from.y, cursor.y),
        minX: Math.min(selectState.context.from.x, cursor.x),
        minY: Math.min(selectState.context.from.y, cursor.y),
    };

    return <g>
        {drawing.shapes.map((shape) =>
            <Shape
                key={shape.id}
                px={drawing.px}
                shape={shape}
                solution={drawing.solution} />)}
        {over.map((shape) => <Halo
            shape={shape}
            px={drawing.px}
            material={drawing.material}
            solution={drawing.solution}
            onMouseEnter={() => { /* */ }}
            onMouseLeave={() => { /* */ }}
        />)}
        <rect
            fill="none"
            stroke="black"
            strokeDasharray={drawing.px * 5}
            x={bounds.minX}
            y={bounds.minY}
            width={bounds.maxX - bounds.minX}
            height={bounds.maxY - bounds.minY} />
    </g>;
};

export default SelectArea;
