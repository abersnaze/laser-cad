import Point from "./Point";

const typeComponents = {
    point: Point,
}

const Halo = ({ shape, px, solution, onClick, onMouseEnter, onMouseLeave }) => {
    const HaloComp = typeComponents[shape.type];
    if (HaloComp === undefined)
        return null;
    return <HaloComp
        shape={shape}
        px={px}
        solution={solution}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    />;
};

export default Halo;
