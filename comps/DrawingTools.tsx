import { useDispatch, useSelector } from "react-redux";
import { Button, Popup } from "semantic-ui-react";
import { setDefaultEdgeStyle, setDefaultFillStyle, setTool } from "../ducks/app";
import { setLayout } from "../ducks/drawing";
import Arc from "./icons/Arc";
import Circle from "./icons/Circle";
import Clone from "./icons/Clone";
import Cut from "./icons/Cut";
import Etch from "./icons/Etch";
import Line from "./icons/Line";
import Reference from "./icons/Reference";
import Select from "./icons/Select";
import Solid from "./icons/Solid";

const tooltipDelay = 1000;
const DrawingTools = () => {
    const [layout, tool, defaultEdgeStyle, defaultFillStyle, shapes] = useSelector((state) => [
        state.drawing.present.layout,
        state.app.tool,
        state.app.defaultEdgeStyle,
        state.app.defaultFillStyle,
        state.drawing.present.shapes,
    ]);
    const dispatch = useDispatch();

    return <>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <div className="space">
                <Button.Group>
                    <Button
                        active={layout === "free"}
                        onClick={() => dispatch(setLayout("free"))}
                    >Free</Button>
                    <Button
                        active={layout === "array"}
                        onClick={() => dispatch(setLayout("array"))}
                    >Array</Button>
                    <Button
                        active={layout === "radial"}
                        onClick={() => dispatch(setLayout("radial"))}
                    >Radial</Button>
                </Button.Group>
            </div>
            <div className="space">
                <Button.Group>
                    <Popup
                        content="Edge is cut"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultEdgeStyle === "cut"}
                            onClick={() => dispatch(setDefaultEdgeStyle("cut"))}
                            className="icon"><Cut /></Button>} />
                    <Popup
                        content="Edge is etched"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultEdgeStyle === "etch"}
                            onClick={() => dispatch(setDefaultEdgeStyle("etch"))}
                            className="icon"><Etch /></Button>} />
                    <Popup
                        content="Edge is a reference for other shapes"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultEdgeStyle === "ref"}
                            onClick={() => dispatch(setDefaultEdgeStyle("ref"))}
                            className="icon"><Reference /></Button>} />
                </Button.Group>
            </div>
            <div className="space">
                <Button.Group>
                    <Popup
                        content="Area is not used"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultFillStyle === "cut"}
                            onClick={() => dispatch(setDefaultFillStyle("cut"))}
                            className="icon"><Cut /></Button>} />
                    <Popup
                        content="Area is etch"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultFillStyle === "etch"}
                            onClick={() => dispatch(setDefaultFillStyle("etch"))}
                            className="icon"><Etch /></Button>} />
                    <Popup
                        content="Area is left untouched"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={defaultFillStyle === "solid"}
                            onClick={() => dispatch(setDefaultFillStyle("solid"))}
                            className="icon"><Solid /></Button>} />
                </Button.Group>
            </div>
            <div className="space">
                <Button.Group>
                    <Popup
                        content="Tool for selecting existing elements"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "select"}
                            onClick={() => dispatch(setTool("select"))}
                            className="icon"><Select /></Button>} />
                    <Popup
                        content="Tool for drawing a fixed point"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "anchor"}
                            onClick={() => dispatch(setTool("anchor"))}
                            icon="anchor" />} />
                    <Popup
                        content="Tool for drawing a line segment"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "line"}
                            onClick={() => dispatch(setTool("line"))}
                            className="icon"><Line /></Button>} />
                    <Popup
                        content="Tool for drawing a circle"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "circle"}
                            onClick={() => dispatch(setTool("circle"))}
                            className="icon"><Circle /></Button>} />
                    <Popup
                        content="Tool for drawing the segement of a circle"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "arc"}
                            onClick={() => dispatch(setTool("arc"))}
                            className="icon"><Arc /></Button>} />
                    <Popup
                        content="Tool for putting down the shape of existing component"
                        position="bottom right"
                        mouseEnterDelay={tooltipDelay}
                        on={["hover"]}
                        trigger={<Button
                            active={tool.type === "shape"}
                            onClick={() => dispatch(setTool("shape"))}
                            className="icon"><Clone /></Button>} />
                </Button.Group>
            </div>
        </div>
        <style jsx>{`
        .space {
            margin-right: 0.25em;
         }
         `}</style>
    </>;
};
export default DrawingTools;
