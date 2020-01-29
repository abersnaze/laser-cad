import Circle from "./Circle";
import Line from "./Line";
import Point from "./Point";

const typeComponents = {
    circle: Circle,
    line: Line,
    point: Point,
};

const Shape = ({ shape, px, solution, selected = false, isHighlighted = false }) => {
    const ShapeComp = typeComponents[shape.kind];
    if (ShapeComp === undefined) {
        return null;
    }
    return <ShapeComp
        shape={shape}
        px={px}
        solution={solution}
        selected={selected}
        isHighlighted={isHighlighted}
    />;
};

export default Shape;
