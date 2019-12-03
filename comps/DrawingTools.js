import { Button, Popup } from "semantic-ui-react";

const DrawingTools = () => (<>
    <Button.Group floated="right">
        <Popup
            content='Tool for selecting existing elements'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button active icon={{ className: 'CAD-Icons SelectTool' }} />} />
        <Popup
            content='Tool for drawing a fixed point'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon="anchor" />} />
        <Popup
            content='Tool for drawing a line segment'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon={{ className: 'CAD-Icons LineTool' }} />} />
        <Popup
            content='Tool for drawing a circle'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon={{ className: 'CAD-Icons CircleTool' }} />} />
        <Popup
            content='Tool for drawing the segement of a circle'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon={{ className: 'CAD-Icons ArcTool' }} />} />
        <Popup
            content='Tool for putting down the shape of existing component'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon={{ className: 'CAD-Icons CloneTool' }} />} />
    </Button.Group>
    <Button.Group floated="right">
        <Popup
            content='Tool for putting down the shape of existing component'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button active icon={{ className: 'CAD-Icons CutMode' }} />} />
        <Popup
            content='Tool for putting down the shape of existing component'
            position='bottom right'
            mouseEnterDelay={3000}
            on={['hover']}
            trigger={<Button icon={{ className: 'CAD-Icons RefMode' }} />} />

    </Button.Group>
    <style jsx global>{`
@font-face {
    font-family: CAD-Icons;
    src: url('/CAD-icons-Regular.woff2');
}
i.icon.CAD-Icons {
    font-family: CAD-Icons
}
i.icon.SelectTool:before {
    content: '\e000';
}
i.icon.LineTool:before {
    content: '\e001';
}
i.icon.CircleTool:before {
    content: '\e002';
}
i.icon.ArcTool:before {
    content: '\e003';
}
i.icon.CloneTool:before {
    content: '\e004';
}
i.icon.CutMode:before {
    content: '\e201';
}
i.icon.RefMode:before {
    content: '\e202';
}
    `}</style>
</>);
export default DrawingTools;
