import Line from "./Line";
import Point from "./Point";

const typeComponents = {
    line: Line,
    point: Point,
}

const Shape = ({ shape, px, solution, selected, isHighlighted }) => {
    const ShapeComp = typeComponents[shape.type];
    if (ShapeComp === undefined)
        return null;
    return <ShapeComp
        shape={shape}
        px={px}
        solution={solution}
        selected={selected}
        isHighlighted={isHighlighted}
    />;
};

export default Shape;
