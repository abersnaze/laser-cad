import { useSelector } from "react-redux";
import Shape from "./shape";

const Shapes = () => {
    const drawing = useSelector((state) => state.drawing.present);
    return <g>
        {drawing.shapes.map((shape, idx) => {
            return <Shape
                key={idx}
                shape={shape}
                px={drawing.px}
                solution={drawing.solution}
                selected={[]}
                isHighlighted={false}
            />;
        })}
    </g>;
};

export default Shapes;
