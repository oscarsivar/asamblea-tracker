import "../../assets/style.css";

import Header from "./Header";

export default (props) => (
    <div className="bg-gray-300 min-h-screen">
        <div className="border-t-8 border-blue-900 py-6">
            <Header />
            <div>{props.children}</div>
        </div>
    </div>
);
