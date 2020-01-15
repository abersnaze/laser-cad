import React from "react";
import { useSelector } from "react-redux";
import { Accordion } from "semantic-ui-react";
import Num from "./Num";

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

    const [drawing, showInfo, cursor] = useSelector((state) => {
        return [state.drawing.present, state.app.showInfo, state.app.cursor];
    });

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
                    <dd><Num x={drawing.transform.a} /></dd>
                    <dt>Pan</dt>
                    <dd>
                        <Num x={-drawing.transform.e / drawing.transform.a} />
                        <Num x={-drawing.transform.f / drawing.transform.a} />
                    </dd>
                    <dt>Material</dt>
                    <dd>
                        <Num x={drawing.material.width} />
                        <Num x={drawing.material.height} />
                    </dd>
                </dl>
            </Accordion.Content>
        </Accordion>
    </div>;
};
export default InfoPanel;
