import { useTypedSelector } from "../../ducks";

const Cursor = ({ }) => {
    const [drawing, cursor] = useTypedSelector((state) => [state.drawing.present, state.app.cursor]);

    if (cursor === undefined) {
        return null;
    }
    const material = drawing.material;

    return (
        <g
            fill="none"
            stroke="black"
            strokeOpacity="0.2"
        >
            <circle cx={cursor.x} cy={cursor.y} r={10 * drawing.px} />
            <line
                x1={cursor.x} y1={0}
                x2={cursor.x} y2={material.height}
            />
            <line
                x1={0} y1={cursor.y}
                x2={material.width} y2={cursor.y}
            />
        </g>);
};

export default Cursor;
