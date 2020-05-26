import React from "react";

import OrderBy from "./OrderBy";
import SearchBox from "./SearchBox";

export default function FiltersBar(props) {
    const handleOnChangeOrder = React.useCallback(
        (event, orderOptions) => {
            const selected = event.currentTarget.value;

            const orderOption = orderOptions[selected];
            props.orderDeputies(
                props.shownDeputies.sort((left, right) => {
                    const { by, direction } = orderOption;
                    if (left[by] < right[by]) return direction ? -1 : 1;
                    if (left[by] > right[by]) return direction ? 1 : -1;
                    return 0;
                })
            );
        },
        [props.shownDeputies, props.orderDeputies]
    );

    const handleOnSearch = React.useCallback(
        (event) => {
            const str = event.target.value;

            props.searchDeputies(
                props.deputies.filter(
                    (d) =>
                        d.name.includes(str) ||
                        d.party.name.includes(str) ||
                        d.department.includes(str)
                )
            );
        },
        [props.deputies, props.searchDeputies]
    );

    return (
        <div className="py-2 flex flex-wrap">
            <div className="w-full md:w-2/3 px-3 mb-4 md:mb-0">
                <SearchBox handleOnSearch={handleOnSearch} />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                <OrderBy handleOnChange={handleOnChangeOrder} />
            </div>
        </div>
    );
}
