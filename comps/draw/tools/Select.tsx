import { useSelector } from "react-redux";
import Shape from "../shape";

const Select = () => {
    const drawing = useSelector((state) => state.drawing.present);

    return <>{
        drawing.shapes.map((shape) => <Shape px={drawing.px} shape={shape} solution={drawing.solution}></Shape>)
    }</>;
};

export default Select;
