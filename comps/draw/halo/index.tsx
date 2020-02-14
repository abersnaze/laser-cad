import Circle from "./Circle";
import Line from "./Line";
import Point from "./Point";

const typeComponents = {
    circle: Circle,
    line: Line,
    point: Point,
};

const Halo = ({ shape, px, material, solution, onMouseEnter, onMouseLeave }) => {
    const HaloComp = typeComponents[shape.kind];
    if (HaloComp === undefined) {
        return null;
    }
    return <HaloComp
        shape={shape}
        px={px}
        material={material}
        solution={solution}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />;
};

export default Halo;
