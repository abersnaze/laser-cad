import Line from "./Line";
import Point from "./Point";

const typeComponents = {
    line: Line,
    point: Point,
}

const Shape = ({ shape, px, solution, isSelected, isHighlighted }) => {
    const ShapeComp = typeComponents[shape.type];
    if (ShapeComp === undefined)
        return null;
    return <ShapeComp
        shape={shape}
        px={px}
        solution={solution}
        isSelected={isSelected}
        isHighlighted={isHighlighted}
    />;
};

export default Shape;
