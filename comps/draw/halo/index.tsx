import Line from "./Line";
import Point from "./Point";

const typeComponents = {
    line: Line,
    point: Point,
};

const Halo = ({ shape, px, material, solution, selected, onMouseEnter, onMouseLeave }) => {
    const HaloComp = typeComponents[shape.kind];
    if (HaloComp === undefined) {
        return null;
    }
    return <HaloComp
        shape={shape}
        px={px}
        material={material}
        solution={solution}
        selected={selected}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />;
};

export default Halo;
