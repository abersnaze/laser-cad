import React, { useMemo } from "react";
import { useTypedSelector } from "../../../ducks";
import * as BSP from "../../../lib/QuadKDTree";
import Shape from "../shape";

const SelectArea = () => {
    const [drawing, selectState, cursor] = useTypedSelector((state) => [
        state.drawing.present,
        state.select,
        state.app.cursor,
    ]);

    const quad: BSP.IQuad = useMemo(() => BSP.generatorFromPoint(
        selectState.context.from,
        drawing.solution,
        drawing.shapes), [
        BSP.generatorFromPoint,
        selectState.context.from,
        drawing.solution,
        drawing.shapes,
    ]);

    const over = BSP.search(quad, cursor);
    const bounds = {
        maxX: Math.min(Math.max(selectState.context.from.x, cursor.x), drawing.material.width),
        maxY: Math.min(Math.max(selectState.context.from.y, cursor.y), drawing.material.height),
        minX: Math.max(Math.min(selectState.context.from.x, cursor.x), 0),
        minY: Math.max(Math.min(selectState.context.from.y, cursor.y), 0),
    };

    return <g>
        {drawing.shapes.map((shape) => {
            // const wasSelected = selectState.context.selected[shape.id] !== undefined;
            const isOver = over[shape.id] !== undefined;
            // const selected = wasSelected !== !isOver;
            const selected = isOver;

            return <Shape
                key={shape.id}
                px={drawing.px}
                shape={shape}
                hover={false}
                selected={selected}
                solution={drawing.solution} />;
        })}
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
