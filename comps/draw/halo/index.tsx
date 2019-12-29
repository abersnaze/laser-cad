import Point from "./Point";
import Line from "./Line";

const typeComponents = {
    point: Point,
    line: Line,
}

const Halo = ({ shape, px, material, solution, selected, onClick, onMouseEnter, onMouseLeave }) => {
    const HaloComp = typeComponents[shape.type];
    if (HaloComp === undefined)
        return null;
    return <HaloComp
        shape={shape}
        px={px}
        material={material}
        solution={solution}
        selected={selected}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />;
};

export default Halo;
