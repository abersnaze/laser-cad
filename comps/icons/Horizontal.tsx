import Ellipsis from "./Ellipsis";

const Horizontal = ({ prompt = false }) => <i className="icon">
    <svg viewBox="0 0 24 24">
        <rect x="11" y="0" width="2" height="24" />
        {prompt ? <Ellipsis /> : null}
    </svg>
</i>;

export default Horizontal;
