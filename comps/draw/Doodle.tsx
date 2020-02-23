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
        transform={drawing.transform}
        width={drawing.material.width}
        height={drawing.material.height}
        onMove={(loc) => {
            // if (loc === undefined ||
            //     loc.x < 0 ||
            //     loc.x > drawing.material.width ||
            //     loc.y < 0 ||
            //     loc.y > drawing.material.height) {
            //     dispatch(mouseMove(undefined));
            //     return;
            // }
            dispatch(mouseMove(loc));
        }}
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
        <defs>
            {dropShadow(1, 1, drawing.px, "select")}
            {dropShadow(1, 1, drawing.px, "hover")}
        </defs>

        <g strokeWidth={drawing.px} transform={toSVG(drawing.transform)}>
            <Grid />
            <Cursor />
            <Tool tool={tool} />
        </g>
    </ViewPort>;
};

const dropShadow = (offset: number, blur: number, px: number, name) => {
    return <filter id={name}
        x={-blur * px}
        y={-blur * px}
        width={`calc(100% + ${2 * blur * px}px)`}
        height={`calc(100% + ${2 * blur * px}px)`}>
        <feGaussianBlur in="SourceAlpha" stdDeviation={blur * px} />
        <feOffset dx={offset * px} dy={offset * px} />
        <feColorMatrix type="matrix"
            values={[
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 1,
                0, 0, 0, 1, 0].join(" ")} />
        <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>;
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
