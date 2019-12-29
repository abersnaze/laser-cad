import { AppContext } from "../../pages";
import SelectionArea from "./SelectionArea";
import Reticle from "./Reticle";

const Cursor = ({ }) => (
    <AppContext.Consumer>{({ state }) => (
        <g
            fill="none"
            stroke="#000000"
            strokeOpacity="0.2"
            strokeWidth={state.drawing.present.px}
        >
            {/* cursor and area selection */}
            {state.app.cursor === undefined ? undefined :
                <Reticle
                    cursor={state.app.cursor.svg}
                    material={state.drawing.present.material}
                />}
            {state.app.area === undefined ? undefined :
                <SelectionArea
                    area={state.app.area}
                />}
        </g>)
    }</AppContext.Consumer>
);

export default Cursor;