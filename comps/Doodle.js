import { AppContext } from '../pages/index'
import Shape from './Shape';
import { setCusor, clearCusor } from '../ducks/selection';
import { transform } from 'transformation-matrix';

const Doodle = () => (<>
    <AppContext.Consumer>{({ state, dispatch }) => {
        const handleMouseMove = (evt) => {
            transform
            const svg = evt.target;
            const CTM = svg.getScreenCTM();
            dispatch(setCusor((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d), evt.clientX, evt.clientY);
        };
        const handleMouseLeave = (event) => {
            dispatch(clearCusor());
        };
        const handleMouseDown = (event) => {
        };
        const handleMouseUp = (event) => {
        };

        const drawing = state.drawing.present;

        return <svg
            style={{ cursor: "crosshair" }}
            viewBox={[0, 0, drawing.material.width, drawing.material.height].join(" ")}
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <g>
                <rect
                    x="1" y="1"
                    width={drawing.material.width - 2}
                    height={drawing.material.height - 2}
                    stroke="#000000"
                    strokeWidth=".1%"
                    fill="none"
                />
            </g>
            <g>{drawing.shapes.map((shape, idx) => <Shape key={idx} shape={shape} solution={drawing.solution} />)}</g>
            {state.select.svg ?
                <g>
                    <line
                        x1={state.select.svg.x}
                        y1={0}
                        x2={state.select.svg.x}
                        y2={drawing.material.height}
                        stroke="#000000"
                        strokeOpacity="0.1"
                    />
                    <line
                        x1={0}
                        y1={state.select.svg.y}
                        x2={drawing.material.width}
                        y2={state.select.svg.y}
                        stroke="#000000"
                        strokeOpacity="0.1"
                    />
                </g> : undefined
            }
        </svg>
    }}</AppContext.Consumer>
</>);

export default Doodle;
