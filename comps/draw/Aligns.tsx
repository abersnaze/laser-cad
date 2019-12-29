import { clearHighlight, setHighlight, setSelection, toggleSelection } from "../../ducks/app";
import { AppContext } from "../../pages";
import Align from "./align";

const Aligns = () => (
    <AppContext.Consumer>{({ state, dispatch }) => {
        const drawing = state.drawing.present;

        return <g>
            {drawing.shapes.map((shape, idx) => {
                return <Align
                    key={idx}
                    shape={shape}
                    material={drawing.material}
                    px={drawing.px}
                    solution={drawing.solution}
                    selected={state.app.selected}
                    onMouseEnter={(evt) => {
                        evt.stopPropagation();
                        dispatch(setHighlight([shape], "cursor"));
                    }}
                    onMouseLeave={(evt) => {
                        evt.stopPropagation();
                        dispatch(clearHighlight("cursor"));
                    }}
                    onClick={(evt) => {
                        evt.stopPropagation();
                        dispatch((evt.shiftKey)
                            ? toggleSelection()
                            : setSelection());
                    }} />;
            })}
        </g>;
    }}
    </AppContext.Consumer>
);

export default Aligns;
