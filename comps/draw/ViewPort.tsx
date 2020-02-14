import { useEffect } from "react";
import { AutoSizer } from "react-virtualized";
import { compose } from "transformation-matrix";

function modified(evt) {
    return evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey;
}

const Svg = ({
    drwWidth, drwHeight, svgWidth, svgHeight, scale, transform,
    onMove, onDown, onUp, onZoom, onPan, onScale,
    children,
}) => {
    const handleMouseMove = (evt) => {
        evt.preventDefault();
        const screen = compose(scale, transform);
        const loc = { x: (evt.clientX - screen.e) / screen.a, y: (evt.clientY - screen.f) / screen.d };
        onMove(loc);
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
        // onMove(undefined);
    };
    const handleMouseDown = (evt) => {
        const screen = compose(scale, transform);
        const loc = { x: (evt.clientX - screen.e) / screen.a, y: (evt.clientY - screen.f) / screen.d };
        onDown(loc, modified(evt));
    };
    const handleMouseUp = (evt) => {
        onUp();
    };
    const handleContextClick = (evt) => {
        evt.preventDefault();
    };

    if (typeof window !== "undefined") {
        useEffect(() => {
            window.addEventListener("mousemove", handleMouseMove, {});
            window.addEventListener("mouseup", handleMouseUp, {});
            window.addEventListener("wheel", handleWheel, { passive: false });
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                window.removeEventListener("wheel", handleWheel);
            };
        });
    }

    return <svg width={svgWidth} height={svgHeight}
        style={{ cursor: "none" }}
        viewBox={[0, 0, drwWidth, drwHeight].join(" ")}
        preserveAspectRatio="xMidYMid meet"
        ref={(realSvg) => {
            if (realSvg) {
                const ctm = realSvg.getScreenCTM();
                // prevent loops
                if (scale.a !== ctm.a) {
                    onScale(ctm);
                }
            }
        }}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextClick}
    >
        {children}
    </svg>;
};

const ViewPort = ({
    width: drwWidth, height: drwHeight, scale, transform,
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
            transform={transform}
            onScale={onScale}
            children={children} />
    }</AutoSizer>;

export default ViewPort;
