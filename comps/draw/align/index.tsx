import Point from "./Point";
import Line from "./Line";

const typeComponents = {
    point: Point,
    line: Line,
}

const Align = ({ shape, px, material, solution, selected, onClick, onMouseEnter, onMouseLeave }) => {
    const AlignComp = typeComponents[shape.type];
    if (AlignComp === undefined)
        return null;
    return <AlignComp
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

export default Align;
