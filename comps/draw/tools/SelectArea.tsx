import React, { useMemo } from "react";
import { useTypedSelector } from "../../../ducks";
import * as BSP from "../../../lib/BSP";
import Halo from "../halo";
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
    const { width, height } = drawing.material;

    return <>
        <g>
            {drawing.shapes.map((shape) =>
                <Shape
                    key={shape.id}
                    px={drawing.px}
                    shape={shape}
                    solution={drawing.solution} />)}
        </g>
        <g stroke="green">
            <ShowTree tree={quad.ne} bounds={{
                maxX: width, maxY: quad.origin.y,
                minX: quad.origin.x, minY: 0,
            }} />
            <ShowTree tree={quad.nw} bounds={{
                maxX: quad.origin.x, maxY: quad.origin.y,
                minX: 0, minY: 0,
            }} />
            <ShowTree tree={quad.se} bounds={{
                maxX: width, maxY: height,
                minX: quad.origin.x, minY: quad.origin.y,
            }} />
            <ShowTree tree={quad.sw} bounds={{
                maxX: quad.origin.x, maxY: height,
                minX: 0, minY: quad.origin.y,
            }} />
            <line x1={0} y1={quad.origin.y} x2={width} y2={quad.origin.y} />
            <line y1={0} x1={quad.origin.x} y2={height} x2={quad.origin.x} />
        </g>
    </>;
};

interface IBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

const ShowTree = ({ tree, bounds, vertical = false }:
    { tree: BSP.IBranch, bounds: IBounds, vertical?: boolean }) => {
    if (tree === undefined) {
        return null;
    }
    let line;
    let upperBounds;
    let lowerBounds;
    if (vertical) {
        line = <line x1={bounds.minX} y1={tree.pivot} x2={bounds.maxX} y2={tree.pivot} />;
        upperBounds = { ...bounds, maxY: tree.pivot };
        lowerBounds = { ...bounds, minY: tree.pivot };
    } else {
        line = <line x1={tree.pivot} y1={bounds.minY} x2={tree.pivot} y2={bounds.maxY} />;
        upperBounds = { ...bounds, maxX: tree.pivot };
        lowerBounds = { ...bounds, minX: tree.pivot };
    }
    return <>
        {line}
        <ShowTree
            tree={tree.above}
            bounds={lowerBounds}
            vertical={!vertical} />
        <ShowTree
            tree={tree.below}
            bounds={upperBounds}
            vertical={!vertical} />
    </>;
};

export default SelectArea;
