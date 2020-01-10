import { AppContext } from "../../pages";

const Cursor = ({ }) => (
    <AppContext.Consumer>{({ state }) => {
        if (state.app.cursor === undefined) {
            return null;
        }
        const cursor = state.app.cursor;
        const material = state.drawing.present.material;

        if (cursor.x < 0 ||
            cursor.x > material.width ||
            cursor.y < 0 ||
            cursor.y > material.height) {
            return null;
        }

        return (
            <g
                fill="none"
                stroke="black"
                strokeOpacity="0.2"
            >
                <circle cx={cursor.x} cy={cursor.y} r={10 * state.drawing.present.px} />
                <line
                    x1={cursor.x} y1={0}
                    x2={cursor.x} y2={material.height}
                />
                <line
                    x1={0} y1={cursor.y}
                    x2={material.width} y2={cursor.y}
                />
            </g>);
    }
    }</AppContext.Consumer>
);

export default Cursor;
