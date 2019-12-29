import { Button } from "semantic-ui-react";

const ConstraintTools = () => (<>
    <Button icon={{ className: "CAD-Icons TangentCons" }} />
    <Button icon={{ className: "CAD-Icons ParallelCons" }} />
    <Button icon={{ className: "CAD-Icons HorizontalCons" }} />
    <Button icon={{ className: "CAD-Icons VerticalCons" }} />
    <Button icon={{ className: "CAD-Icons DistanceCons" }} />
    <Button icon={{ className: "CAD-Icons RadiusCons" }} />
    <style jsx global>{`
@font-face {
    font-family: CAD-Icons;
    src: url('/CAD-icons-Regular.woff2');
}
i.icon.CAD-Icons {
    font-family: CAD-Icons
}
i.icon.TangentCons:before {
    content: '\e101';
}
i.icon.ParallelCons:before {
    content: '\e102';
}
i.icon.HorizontalCons:before {
    content: '\e103';
}
i.icon.VerticalCons:before {
    content: '\e104';
}
i.icon.DistanceCons:before {
    content: '\e105';
}
i.icon.RadiusCons:before {
    content: '\e106';
}
    `}</style>
</>);
export default ConstraintTools;
