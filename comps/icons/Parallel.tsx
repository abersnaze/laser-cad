import Ellipsis from "./Ellipsis";

const Parallel = ({ prompt = false }) => <i className="icon">
    <svg viewBox="0 0 24 24">
        <path d="M26.8874954,5.3839746 L27.8874954,7.1160254 L-5.88749537,26.6160254 L-6.88749537,24.8839746 L26.8874954,5.3839746 Z M25.7749907,-1 L26.7749907,0.732050808 L-7,20.2320508 L-8,18.5 L25.7749907,-1 Z" />
        {prompt ? <Ellipsis /> : null}
    </svg>
</i>;

export default Parallel;
