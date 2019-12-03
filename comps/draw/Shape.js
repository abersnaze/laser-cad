import Line from "./shapes/Line";
import Point from "./shapes/Point";

const typeComponents = {
    line: Line,
    point: Point,
    unknown: React.Fragment
}

const Shape = ({ shape, solution }) => {
    const ShapeComp = typeComponents[shape.type || 'unknown'] || typeComponents.unknown;
    return <ShapeComp shape={shape} solution={solution} />;
};

export default Shape;
