import { useDispatch } from "react-redux";
import { compose, scale, toSVG, translate } from "transformation-matrix";
import { useTypedSelector } from "../../ducks";
import { applyTransform, setScale } from "../../ducks/drawing";
import { mouseDown, mouseMove, mouseUp } from "../../ducks/mouse";
import Cursor from "./Cursor";
import Grid from "./Grid";
import Tool from "./tools";
import ViewPort from "./ViewPort";

const Doodle = ({ }) => {
    const [drawing, cursor, tool] = useTypedSelector((state) => [
        state.drawing.present,
        state.app.cursor,
        state.app.tool,
    ]);
    const dispatch = useDispatch();

    return <ViewPort
        scale={drawing.scale}
        width={drawing.material.width}
        height={drawing.material.height}
        onMove={(loc) => { dispatch(mouseMove(loc)); }}
        onDown={(loc, modified) => { dispatch(mouseDown(loc, modified)); }}
        onUp={() => { dispatch(mouseUp()); }}
        onZoom={(factor) => {
            if (cursor !== undefined) {
                const scaleAtCursor = compose(
                    // translate where the cursor is at to the origin 0,0
                    translate(cursor.x, cursor.y),
                    // scale the drawing
                    scale(factor, factor),
                    // move the drawing back.
                    translate(-cursor.x, -cursor.y));
                dispatch(applyTransform(scaleAtCursor));
            }
        }}
        onPan={(dx, dy) => {
            dispatch(applyTransform(translate(-dx / drawing.transform.a, -dy / drawing.transform.a)));
        }}
        onScale={(pixel) => {
            dispatch(setScale(pixel));
        }}>
        <g strokeWidth={drawing.px} transform={toSVG(drawing.transform)}>
            <Grid />
            <Tool tool={tool}/>
            <Cursor />
        </g>
    </ViewPort>;
};

// function draggable(element) {
//     var dragging = null;

//     addListener(element, "mousedown", function(e) {
//         var e = window.event || e;
//         dragging = {
//             mouseX: e.clientX,
//             mouseY: e.clientY,
//             startX: parseInt(element.style.left),
//             startY: parseInt(element.style.top)
//         };
//         if (element.setCapture) element.setCapture();
//     });

//     addListener(element, "losecapture", function() {
//         dragging = null;
//     });

//     addListener(document, "mouseup", function() {
//         dragging = null;
//     }, true);

//     var dragTarget = element.setCapture ? element : document;

//     addListener(dragTarget, "mousemove", function(e) {
//         if (!dragging) return;

//         var e = window.event || e;
//         var top = dragging.startY + (e.clientY - dragging.mouseY);
//         var left = dragging.startX + (e.clientX - dragging.mouseX);

//         element.style.top = (Math.max(0, top)) + "px";
//         element.style.left = (Math.max(0, left)) + "px";
//     }, true);
// };

export default Doodle;
