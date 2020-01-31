import { MouseEventHandler, useEffect } from "react";
import { AutoSizer } from "react-virtualized";

function modified(evt) {
    return evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey;
}

const Svg = ({
    drwWidth, drwHeight, svgWidth, svgHeight, scale,
    onMove, onDown, onUp, onZoom, onPan, onScale,
    children,
}) => {
    const handleMouseMove = (evt) => {
        if (evt.target.getScreenCTM !== undefined) {
            const CTM = evt.target.getScreenCTM();
            const loc = { x: (evt.clientX - CTM.e) / CTM.a, y: (evt.clientY - CTM.f) / CTM.d };
            onMove(loc);
        }
    };
    const handleWheel = (evt) => {
        evt.preventDefault();
        if (evt.ctrlKey) {
            onZoom(1 - (evt.deltaY / 100));
        } else {
            onPan(evt.deltaX, evt.deltaY);
        }
        handleMouseMove(evt);
    };
    const handleMouseLeave = (evt) => {
        onMove(undefined);
    };
    const handleMouseDown = (evt) => {
        if (evt.target.getScreenCTM !== undefined) {
            const CTM = evt.target.getScreenCTM();
            const loc = { x: (evt.clientX - CTM.e) / CTM.a, y: (evt.clientY - CTM.f) / CTM.d };
            onDown(loc, modified(evt));
        } else {
            onDown(undefined, modified(evt));
        }
    };
    const handleMouseUp = (evt) => {
        onUp();
    };
    const handleContextClick = (evt) => {
        evt.preventDefault();
    };

    if (typeof window !== "undefined") {
        useEffect(() => {
            window.addEventListener("wheel", handleWheel, { passive: false });
            return () => window.removeEventListener("wheel", handleWheel);
        });
    }

    return <svg width={svgWidth} height={svgHeight}
        style={{ cursor: "none" }}
        viewBox={[0, 0, drwWidth, drwHeight].join(" ")}
        preserveAspectRatio="xMidYMid meet"
        ref={(realSvg) => {
            if (realSvg) {
                const px = 1 / realSvg.getScreenCTM().a;
                // prevent loops
                if (scale !== px) {
                    onScale(px);
                }
            }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextClick}
    >
        {children}
    </svg>;
};

const ViewPort = ({
    width: drwWidth, height: drwHeight, scale,
    onMove, onDown, onUp, onZoom, onPan, onScale,
    children,
}) =>
    <AutoSizer>{({ width: svgWidth, height: svgHeight }) =>
        <Svg
            drwWidth={drwWidth}
            drwHeight={drwHeight}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            onMove={onMove}
            onDown={onDown}
            onUp={onUp}
            onZoom={onZoom}
            onPan={onPan}
            scale={scale}
            onScale={onScale}
            children={children} />
    }</AutoSizer>;

export default ViewPort;
