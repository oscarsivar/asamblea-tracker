import React from "react";

import OrderBy from "./OrderBy";
import SearchBox from "./SearchBox";

export default function FiltersBar({
    deputies,
    filteredDeputies,
    orderDeputies,
    searchDeputies,
}) {
    const handleOnChangeOrder = React.useCallback(
        (event, orderOptions) => {
            const selected = event.currentTarget.value;

            const orderOption = orderOptions[selected];
            orderDeputies(
                filteredDeputies.sort((left, right) => {
                    const { by, direction } = orderOption;
                    if (left.deputy[by] < right.deputy[by])
                        return direction ? -1 : 1;
                    if (left.deputy[by] > right.deputy[by])
                        return direction ? 1 : -1;
                    return 0;
                })
            );
        },
        [filteredDeputies, orderDeputies]
    );

    const handleOnSearch = React.useCallback(
        (event) => {
            const str = event.target.value;

            searchDeputies(
                deputies.filter(
                    // TODO: Find a systematic way
                    (d) =>
                        checkIsIncluded(d.deputy.name, str) ||
                        checkIsIncluded(d.deputy.party.name, str) ||
                        checkIsIncluded(d.deputy.department, str)
                )
            );
        },
        [deputies, searchDeputies]
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

// TODO: Centralize it in a utils file
function checkIsIncluded(
    str1,
    str2,
    mapped = [
        [`á`, `a`],
        [`é`, `e`],
        [`í`, `i`],
        [`ó`, `o`],
        [`ú`, `u`],
        [`ü`, `u`],
        [`ñ`, `n`],
    ]
) {
    const reducer = (cleaned, chars) =>
        cleaned.replace(new RegExp(`${chars[0]}`), chars[1]);
    return mapped
        .reduce(reducer, str1.toLowerCase())
        .includes(mapped.reduce(reducer, str2.toLowerCase()));
}
