import Ellipsis from "./Ellipsis";

const Vertical = ({ prompt = false }) => <i className="icon">
    <svg viewBox="0 0 24 24">
        <rect y="11" x="0" height="2" width="24" />
        {prompt ? <Ellipsis /> : null}
    </svg>
</i>;

export default Vertical;
