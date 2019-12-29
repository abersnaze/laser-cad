import { MouseEventHandler, useEffect } from "react";
import { AutoSizer } from "react-virtualized";

function modified(evt) {
    return evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey;
}

const ViewPort = ({ width: drwWidth, height: drwHeight, onMove, onDown, onUp, onZoom, onPan }) => {
    const handleWheel = (evt) => {
        evt.preventDefault();
        if (evt.ctrlKey) {
            onZoom(evt.deltaY);
        } else {
            onPan(evt.deltaX, evt.deltaY);
        }
    };
    const handleMouseMove = (evt) => {
        const svg = evt.target;
        const CTM = svg.getScreenCTM();
        onMove((evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d, evt.clientX, evt.clientY);
    };
    const handleMouseLeave: MouseEventHandler = (evt) => {
        onMove();
    };
    const handleMouseDown: MouseEventHandler = (evt) => {
        onDown(modified(evt));
    };
    const handleMouseUp: MouseEventHandler = (evt) => {
        onUp();
    };
    const handleContextClick: MouseEventHandler = (evt) => {
        evt.preventDefault();
    };

    if (typeof window !== "undefined") {
        useEffect(() => {
            window.addEventListener("wheel", handleWheel, {
                passive: false,
            });
            return () => window.removeEventListener("wheel", handleWheel);
        });
    }

    return (<AutoSizer>{({ width, height }) => {
        return <svg width={width} height={height}
            style={{ cursor: "none" }}
            viewBox={[0, 0, drwWidth, drwHeight].join(" ")} preserveAspectRatio="xMidYMin meet" ref={(realSvg) => {
                if (realSvg) {
                    const px = 1 / realSvg.getScreenCTM().a;
                    onZoom(px);
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextClick}>
        </svg>;
    }}</AutoSizer>);
};

export default ViewPort;
