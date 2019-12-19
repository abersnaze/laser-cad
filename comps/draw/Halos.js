import Halo from "./halo";
import { AppContext } from "../../pages";
import { setHighlight, clearHighlight, toggleSelection, setSelection } from "../../ducks/app";

const Halos = () => (
    <AppContext.Consumer>{({ state, dispatch }) => {
        const drawing = state.drawing.present;

        return <g
            fill="#ff0000"
            stroke="#ff0000"
            opacity=".2"
        >
            {drawing.shapes.map((shape, idx) => {
                return <Halo
                    key={idx}
                    shape={shape}
                    material={drawing.material}
                    px={drawing.px}
                    solution={drawing.solution}
                    selected={state.app.selected}
                    onMouseEnter={(evt) => {
                        evt.stopPropagation();
                        dispatch(setHighlight([shape], 'cursor'));
                    }}
                    onMouseLeave={(evt) => {
                        evt.stopPropagation();
                        dispatch(clearHighlight('cursor'));
                    }}
                    onClick={(evt) => {
                        evt.stopPropagation();
                        dispatch((evt.shiftKey)
                            ? toggleSelection(shape)
                            : setSelection(shape));
                    }} />;
            })}
        </g>
    }}
    </AppContext.Consumer>
);

export default Halos;