import { useSelector } from "react-redux";

const Boarder = () => {
    const [drawing] = useSelector((state) => [state.drawing.present]);
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
};

export default Boarder;
