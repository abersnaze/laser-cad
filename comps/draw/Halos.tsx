import { useTypedSelector } from "../../ducks";
import Halo from "./halo";

const Halos = () => {
    const drawing = useTypedSelector((state) => state.drawing.present);

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
                selected={[]}
                onMouseEnter={(evt) => {
                    evt.stopPropagation();
                }}
                onMouseLeave={(evt) => {
                    evt.stopPropagation();
                }} />;
        })}
    </g>;
};

export default Halos;
