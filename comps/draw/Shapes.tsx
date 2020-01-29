import { useTypedSelector } from "../../ducks";
import Shape from "./shape";

const Shapes = () => {
    const drawing = useTypedSelector((state) => state.drawing.present);
    return <g>
        {drawing.shapes.map((shape, idx) => {
            return <Shape
                key={idx}
                shape={shape}
                px={drawing.px}
                solution={drawing.solution}
                isHighlighted={false}
            />;
        })}
    </g>;
};

export default Shapes;
