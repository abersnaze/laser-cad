import { useTypedSelector } from "../../ducks";
import { IDrawing } from "../../lib/IDrawing";
import { hoverOrder } from "../../lib/Shape";
import Halo from "./halo";

const Halos = ({ }) => {
    const drawing: IDrawing = useTypedSelector((state) => state.drawing.present);

    return <g
        fill="#ff0000"
        stroke="#ff0000"
        strokeWidth={20 * drawing.px}
        opacity="0"
    >
        {drawing.shapes.sort(hoverOrder).map((shape) => {
            return <Halo
                key={shape.id}
                shape={shape}
                material={drawing.material}
                px={drawing.px}
                solution={drawing.solution}
            />;
        })}
    </g>;
};

export default Halos;
