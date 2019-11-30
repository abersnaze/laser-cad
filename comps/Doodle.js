import { AppContext } from '../pages/index'

const Doodle = () => (<>
    <AppContext.Consumer>{({ state, dispatch }) => {
        const drawing = state.drawing.present;
        console.log(drawing);
        return <svg
            viewBox={[0, 0, drawing.material.width, drawing.material.height].join(" ")}
            preserveAspectRatio="xMidYMid meet"
        >
            <g>
                <rect
                    x="1" y="1"
                    width={drawing.material.width - 2}
                    height={drawing.material.height - 2}
                    stroke="#000000"
                    fill="none"
                />
            </g>
        </svg>
    }}</AppContext.Consumer>
</>);

export default Doodle;
