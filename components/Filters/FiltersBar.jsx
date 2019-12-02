import React from "react";

import OrderBy from "./OrderBy";

export default class FiltersBar extends React.Component {
    state = {
        orderBy: 0,
        orderOptions: [
            {
                by: "name",
                label: "Alfabéticamente",
                direction: true
            },
            {
                by: "firstPeriodOn",
                label: "Mayor tiempo como congresista",
                direction: true
            },
            {
                by: "firstPeriodOn",
                label: "Menor tiempo como congresista",
                direction: false
            }
        ]
    };

    handleOnChangeOrder(event) {
        const selected = event.currentTarget.value;

        const orderOption = this.state.orderOptions[selected];
        const deputies = this.props.deputies.sort((left, right) => {
            const { by, direction } = orderOption;
            if (left[by] < right[by]) return direction ? -1 : 1;
            if (left[by] > right[by]) return direction ? 1 : -1;
            return 0;
        });

        this.setState({ orderBy: selected });
        this.props.orderDeputies(deputies);
    }

    render() {
        return (
            <div className="py-2">
                <OrderBy
                    selected={this.state.orderBy}
                    options={this.state.orderOptions}
                    handleOnChange={event => this.handleOnChangeOrder(event)}
                />
            </div>
        );
    }
}
