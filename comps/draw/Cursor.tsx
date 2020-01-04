import { AppContext } from "../../pages";
import Reticle from "./Reticle";
import SelectionArea from "./SelectionArea";

const Cursor = ({ }) => (
    <AppContext.Consumer>{({ state }) => (
        <g
            fill="none"
            stroke="#000000"
            strokeOpacity="0.2"
            strokeWidth={state.drawing.present.px}
        >
            {/* cursor and area selection */}
            {/* {state.app.cursor === undefined ? undefined :
                <Reticle
                    cursor={state.app.cursor.svg}
                    material={state.drawing.present.material}
                />}
            {state.app.area === undefined ? undefined :
                <SelectionArea
                    area={state.app.area}
                />} */}
        </g>)
    }</AppContext.Consumer>
);

export default Cursor;
