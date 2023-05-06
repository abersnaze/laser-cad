import React from "react";
import { Accordion } from "semantic-ui-react";
import { useTypedSelector } from "../ducks";
import Num from "./Num";
import { NO_TREE } from "../ducks/tools/select";

const InfoPanel = () => {
    const [expanded, setExpanded] = React.useState(new Set());
    const handleClick = (e, { index, active }) => {
        const newExpanded = new Set(expanded);
        if (active) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpanded(newExpanded);
    };

    const [drawing, showInfo, cursor, transform, select] = useTypedSelector((state) => [
        state.drawing.present,
        state.app.showInfo,
        state.app.cursor,
        state.drawing.present.transform,
        state.select,
    ]);

    if (showInfo === false) {
        return null;
    }

    return <div style={{ width: "200px" }}>
        <Accordion styled fluid>
            <Accordion.Title
                index={0}
                onClick={handleClick}
                active={expanded.has(0)}
                icon="dropdown"
                content="Constraints"
            />
            <Accordion.Content active={expanded.has(0)}>
                asdf
                </Accordion.Content>
            <Accordion.Title
                index={1}
                onClick={handleClick}
                active={expanded.has(1)}
                icon="dropdown"
                content="Variables"
            />
            <Accordion.Content active={expanded.has(1)}>
                qwer
                </Accordion.Content>
            <Accordion.Title
                index={2}
                onClick={handleClick}
                active={expanded.has(2)}
                icon="dropdown"
                content="Debug"
            />
            <Accordion.Content active={expanded.has(2)}>
                <dl>
                    <dt>Cursor</dt>
                    <dd>{
                        cursor === undefined
                            ? "NA"
                            : <>
                                <Num x={cursor.x} /> <Num x={cursor.y} />
                            </>
                    }</dd>
                    <dt>Pixel</dt>
                    <dd><Num x={drawing.px} /></dd>
                    <dt>Zoom</dt>
                    <dd><Num x={transform.a} /></dd>
                    <dt>Pan</dt>
                    <dd>
                        <Num x={-transform.e / transform.a} />
                        <Num x={-transform.f / transform.a} />
                    </dd>
                    <dt>Material</dt>
                    <dd>
                        <Num x={drawing.material.width} />
                        <Num x={drawing.material.height} />
                    </dd>
                    <dt>Select State</dt>
                    <dd>{select.value}</dd>
                    <dd>{select.makeTree === NO_TREE ? "no () => tree" : "() => tree"}</dd>
                    <dd>{select.tree === undefined ? "no tree" : "tree"}</dd>
                </dl>
            </Accordion.Content>
        </Accordion>
    </div>;
};
export default InfoPanel;
