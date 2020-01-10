import { compose, scale, toSVG, translate } from "transformation-matrix";
import { setCursor } from "../../ducks/app";
import { applyTransform, setScale } from "../../ducks/drawing";
import { AppContext } from "../../pages";
import Cursor from "./Cursor";
import Grid from "./Grid";
import Tool from "./tools";
import ViewPort from "./ViewPort";

const Doodle = ({ }) => (<>
    <AppContext.Consumer>{({ state, dispatch }) => {
        const drawing = state.drawing.present;
        const width = drawing.material.width;
        const height = drawing.material.height;
        const px = drawing.px;

        return <ViewPort
            width={width}
            height={height}
            onMove={(loc) => {
                dispatch(setCursor(loc));
                // nothing
            }} onDown={() => {
                // nothing
            }} onZoom={(factor) => {
                if (state.app.cursor !== undefined) {
                    const scaleAtCursor = compose(
                        // translate where the cursor is at to the origin 0,0
                        translate(state.app.cursor.x, state.app.cursor.y),
                        // scale the drawing
                        scale(factor, factor),
                        // move the drawing back.
                        translate(-state.app.cursor.x, -state.app.cursor.y));
                    dispatch(applyTransform(scaleAtCursor));
                }
            }} onPan={(dx, dy) => {
                dispatch(applyTransform(translate(-dx / drawing.transform.a, -dy / drawing.transform.a)));
            }} onUp={() => {
                // nothing
            }} onScale={(pixel) => {
                dispatch(setScale(pixel));
            }}>
            <g strokeWidth={px} transform={toSVG(drawing.transform)}>
                <Grid />
                <Tool tool={state.app.tool} />
                <Cursor />
            </g>
        </ViewPort>;
    }}</AppContext.Consumer>
</>);

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
