import "../../assets/style.css";

import Header from "./Header";

export default props => (
    <div className="bg-gray-300">
        <div className="">
            <Header />
            <div>{props.children}</div>
        </div>
    </div>
);
