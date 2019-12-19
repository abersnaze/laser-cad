import { AppContext } from "../../pages";
import Shape from './shape';

const Shapes = () => (
    <AppContext.Consumer>{({ state, dispatch }) => {
        const drawing = state.drawing.present;
        return <g>
            {drawing.shapes.map((shape, idx) => {
                return <Shape
                    key={idx}
                    shape={shape}
                    px={drawing.px}
                    solution={drawing.solution}
                    selected={state.app.selected}
                    isHighlighted={state.app.highlight.some(vs => vs.has(shape))}
                />;
            })}
        </g>
    }}
    </AppContext.Consumer>
);

export default Shapes;