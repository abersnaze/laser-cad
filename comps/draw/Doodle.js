import { AutoSizer } from 'react-virtualized';
import { clearCusor, clearSelection, finishAreaSelection, setCusor, setSelection, startAreaSelection, toggleSelection, setHighlight, clearHighlight } from '../../ducks/app';
import { AppContext } from '../../pages/index';
import Cursor from './Cursor';
import Halo from './halo';
import SelectionArea from './SelectionArea';
import Shape from './shapes';
import { setPixel } from '../../ducks/drawing';

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

const Doodle = () => (<>
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
                console.log("up");
                
                evt.stopPropagation();
                dispatch(finishAreaSelection(evt.shiftKey));
            };
            const handleClick = (evt) => {
                console.log("click");
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
                <g>
                    {/* boundry */}
                    <rect
                        x={drawing.px / 2} y={drawing.px / 2}
                        width={drawing.material.width - drawing.px}
                        height={drawing.material.height - drawing.px}
                        stroke="#000000"
                        strokeWidth={drawing.px}
                        fill="none"
                    />
                </g>
                <g>
                    {/* shapes */}
                    {drawing.shapes.map((shape, idx) => {
                        return <Shape
                            key={idx}
                            shape={shape}
                            px={drawing.px}
                            solution={drawing.solution}
                            isSelected={state.app.selected.has(shape)}
                            isHighlighted={state.app.highlight.some(vs => vs.has(shape))}
                        />;
                    })}
                </g>
                <g
                    fill="none"
                    stroke="#000000"
                    strokeOpacity="0.2"
                    strokeWidth={drawing.px}
                >
                    {/* cursor and area selection */}
                    {state.app.cursor === undefined ? undefined :
                        <Cursor
                            cursor={state.app.cursor.svg}
                            material={drawing.material}
                        />}
                    {state.app.area === undefined ? undefined :
                        <SelectionArea
                            area={state.app.area}
                        />}
                </g>
                <g opacity="0">
                    {drawing.shapes.map((shape, idx) => {
                        return <Halo
                            key={idx}
                            shape={shape}
                            px={drawing.px}
                            solution={drawing.solution}
                            onMouseEnter={(evt) => {
                                evt.stopPropagation();
                                dispatch(setHighlight([shape], 'cursor'));
                            }}
                            onMouseLeave={(evt) => {
                                evt.stopPropagation();
                                dispatch(clearHighlight('cursor'));
                            }}
                            onClick={(evt) => {
                                evt.stopPropagation();
                                dispatch((evt.shiftKey)
                                    ? toggleSelection(shape)
                                    : setSelection(shape));
                            }} />;
                    })}
                </g>
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
