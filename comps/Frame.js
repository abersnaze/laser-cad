import Boarder from "./Boarder";
import ConstraintTools from "./ConstraintTools";
import DocumentTools from "./DocumentTools";
import Cursor from "./draw/Cursor";
import Doodle from "./draw/Doodle";
import Halos from "./draw/Halos";
import Shapes from "./draw/Shapes";
import DrawingTools from "./DrawingTools";
import InfoPanel from "./InfoPanel";
import Aligns from "./draw/Aligns";

const Frame = () => (<>
    <div className="parent">
        <div className="top"><DocumentTools /><DrawingTools /></div>
        <div className="left"><ConstraintTools /></div>
        <div className="right"><InfoPanel /></div>
        <div className="content">
            <Doodle >
                <Boarder />
                <Shapes />
                <Cursor />
                <Aligns />
                <Halos />
            </Doodle>
        </div>
    </div>
    <style jsx>{`
        .parent {
            padding: .5rem;
            display: grid;
            grid-template-columns: 0fr 1fr 0fr;
            grid-template-rows: 0fr 1fr;
            grid-column-gap: .5rem;
            grid-row-gap: .5rem;
            height: 100vh;
            width: 100vw;
        }
        .top { grid-area: 1 / 1 / 2 / 4; }
        .right { grid-area: 2 / 1 / 3 / 2; }
        .left { grid-area: 2 / 3 / 3 / 4; }
        .content { grid-area: 2 / 2 / 3 / 3; }
    `} </style>
</>);

export default Frame;
