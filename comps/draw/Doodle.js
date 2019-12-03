import { transform } from 'transformation-matrix';
import { clearCusor, setCusor } from '../../ducks/selection';
import { AppContext } from '../../pages/index';
import Cursor from './Cursor';
import Shape from './Shape';
import { AutoSizer } from 'react-virtualized';

const Doodle = () => (<>
    <AutoSizer>{({ width, height }) => {
        return <AppContext.Consumer>{({ state, dispatch }) => {
            const handleMouseEnter = (evt) => {
                transform
                const svg = evt.target;
                const CTM = svg.getScreenCTM();
                dispatch(setCusor((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d), evt.clientX, evt.clientY);
            };
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
                width={width}
                height={height}
                style={{ cursor: "crosshair" }}
                viewBox={[0, 0, drawing.material.width, drawing.material.height].join(" ")}
                preserveAspectRatio="xMidYMid meet"
                onMouseEnter={handleMouseEnter}
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
                    <Cursor
                        x={state.select.svg.x}
                        y={state.select.svg.y}
                        h={drawing.material.height}
                        w={drawing.material.width}
                    /> : undefined
                }
            </svg>
        }}</AppContext.Consumer>
    }}</AutoSizer>
</>);

export default Doodle;
