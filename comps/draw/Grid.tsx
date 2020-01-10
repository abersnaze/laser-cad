import * as _ from "lodash";
import { units } from "../../ducks/drawing";
import { AppContext } from "../../pages";

const Grid = ({ }) => (
    <AppContext.Consumer>{({ state }) => {
        const drawing = state.drawing.present;
        const width = drawing.material.width;
        const height = drawing.material.height;
        const px = drawing.px / drawing.transform.a;

        return (<g stroke="#ddd" fill="none">
            <rect x="0" y="0" width="100%" height="100%" stroke="none" fill="black" opacity="0" />
            {_.range(0, 13).map((i) => <line
                key={"h" + i}
                x1={0} y1={i * units.inch}
                x2={width} y2={i * units.inch} />)}
            {_.range(0, 19).map((i) => <line
                key={"v" + i}
                x1={i * units.inch} y1={0}
                x2={i * units.inch} y2={height} />)}
        </g>);
    }
    }</AppContext.Consumer>
);

export default Grid;
