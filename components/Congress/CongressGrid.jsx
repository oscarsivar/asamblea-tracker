import MemberCard from "./MemberCard";
import FiltersBar from "../Filters/FiltersBar";

import congressScraper from "../../cli/scraper/models/congress.scraper.json";

export default class CongressGrid extends React.Component {
    state = { deputies: [] };

    componentDidMount() {
        this.setState({ deputies: this.props.deputies });
    }

    orderDeputies(deputies) {
        this.setState({ deputies });
    }

    render() {
        return (
            <div className="container mx-auto">
                <FiltersBar
                    deputies={this.props.deputies}
                    orderDeputies={deputies => this.orderDeputies(deputies)}
                />
                <div className="w-full px-2">
                    <div className="flex flex-wrap flex-row justify-between items-center">
                        {this.state.deputies.map((deputy, key) => (
                            <MemberCard
                                key={key}
                                deputy={deputy}
                                asambleaBaseUrl={congressScraper.url}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
