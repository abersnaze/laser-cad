import { AppContext } from "../pages";

const Boarder = () => <AppContext.Consumer>{({ state }) => {
    const drawing = state.drawing.present;
    return (<g>
        <rect
            x={drawing.px / 2}
            y={drawing.px / 2}
            width={drawing.material.width - drawing.px}
            height={drawing.material.height - drawing.px}
            stroke="#000000"
            strokeWidth={drawing.px}
            fill="none" />
    </g>);
}}</AppContext.Consumer>;

export default Boarder;
