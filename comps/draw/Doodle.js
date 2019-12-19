import { AutoSizer } from 'react-virtualized';
import { clearCusor, clearSelection, finishAreaSelection, setCusor, startAreaSelection } from '../../ducks/app';
import { setPixel } from '../../ducks/drawing';
import { AppContext } from '../../pages/index';

const inside = (point, area) => {
    if (point.x < area.x)
        return false;
    if (point.y < area.y)
        return false;
    if (area.x + area.width < point.x)
        return false;
    if (area.y + area.height < point.y)
        return false;
    return true;
}

const Doodle = ({ children }) => (<>
    <AutoSizer>{({ width, height }) => {
        return <AppContext.Consumer>{({ state, dispatch }) => {
            const handleMouseEnter = (evt) => {
                const svg = evt.target;
                const CTM = svg.getScreenCTM();
                dispatch(setCusor((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d), evt.clientX, evt.clientY);
            };
            const handleMouseMove = (evt) => {
                const svg = evt.target;
                const CTM = svg.getScreenCTM();
                dispatch(setCusor((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d), evt.clientX, evt.clientY);
            };
            const handleMouseLeave = (evt) => {
                dispatch(clearCusor());
            };
            const handleMouseDown = (evt) => {
                evt.preventDefault();
                dispatch(startAreaSelection())
            };
            const handleMouseUp = (evt) => {
                evt.stopPropagation();
                dispatch(finishAreaSelection(evt.shiftKey));
            };
            const handleClick = (evt) => {
                if (!evt.shiftKey) {
                    dispatch(clearSelection());
                }
            }
            const handleContextClick = (evt) => {
                evt.preventDefault();
            }

            const drawing = state.drawing.present;

            return <svg
                width={width}
                height={height}
                style={{ cursor: "none" }}
                viewBox={[0, 0, drawing.material.width, drawing.material.height].join(" ")}
                preserveAspectRatio="xMidYMin meet"
                ref={(realSvg) => {
                    if (realSvg) {
                        const px = 1 / realSvg.getScreenCTM().a;
                        if (drawing.px != px)
                            dispatch(setPixel(px));
                    }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleClick}
                onContextMenu={handleContextClick}
            >
                {children}
            </svg>
        }}
        </AppContext.Consumer>
    }}</AutoSizer>
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
