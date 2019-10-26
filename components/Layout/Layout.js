import "../../assets/style.css";

import Header from "./Header";

export default props => (
    <div className="bg-gray-200">
        <div className="px-4">
            <Header />
            <div>{props.children}</div>
        </div>
    </div>
);
