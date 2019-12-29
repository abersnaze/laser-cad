import ViewPort from "./ViewPort";

const Doodle = ({ }) => (<>
    <ViewPort
        width={0}
        height={0}
        onMove={() => {
            // nothing
        }}
        onDown={() => {
            // nothing
        }}
        onZoom={() => {
            // nothing
        }}
        onPan={() => {
            // nothing
        }}
        onUp={() => {
            // nothing
        }}
    />
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
