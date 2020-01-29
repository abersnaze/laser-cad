import { useTypedSelector } from "../../ducks";
import Align from "./align";

const Aligns = () => {
    const drawing = useTypedSelector((state) => state.drawing.present);

    return <g>
        {drawing.shapes.map((shape, idx) => {
            return <Align
                key={idx}
                shape={shape}
                material={drawing.material}
                px={drawing.px}
                solution={drawing.solution}
                selected={() => {
                    // state.app.selected
                }}
                onMouseEnter={(evt) => {
                    evt.stopPropagation();
                    // dispatch(setHighlight([shape], "cursor"));
                }}
                onMouseLeave={(evt) => {
                    evt.stopPropagation();
                    // dispatch(clearHighlight("cursor"));
                }}
                onClick={(evt) => {
                    evt.stopPropagation();
                    // dispatch((evt.shiftKey)
                    //     ? toggleSelection()
                    //     : setSelection());
                }} />;
        })}
    </g>;
};

export default Aligns;
