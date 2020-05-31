import srv from "../../utils/service";

import MemberCard from "./MemberCard";
import FiltersBar from "../Filters/FiltersBar";

import congressScraper from "../../cli/scraper/models/congress.scraper.json";

export default function CongressGrid({ deputies }) {
    const [filteredDeputies, filteredDeputiesSet] = React.useState([]);
    const [attendances, attendancesSet] = React.useState([]);

    React.useEffect(() => {
        filteredDeputiesSet(deputies);
        Promise.all(
            deputies.map(
                async (card) =>
                    await srv.get(`api/deputies/${card.deputy._id}/attendance`)
            )
        )
            .then((awaited) => attendancesSet(awaited.map((a) => a.data)))
            .catch(() => attendancesSet([]));
    }, [deputies]);
    return (
        <div className="container mx-auto">
            <FiltersBar
                filteredDeputies={filteredDeputies}
                deputies={deputies}
                orderDeputies={(oDeputies) =>
                    filteredDeputiesSet([...oDeputies])
                }
                searchDeputies={(sDeputies) =>
                    filteredDeputiesSet([...sDeputies])
                }
            />
            <div className="w-full px-2">
                <div className="flex flex-wrap flex-row justify-start items-center">
                    {filteredDeputies.map((card, key) => {
                        console.log({ card, key });
                        return (
                            <MemberCard
                                key={key}
                                deputy={card.deputy}
                                attendance={attendances[card.index]}
                                asambleaBaseUrl={congressScraper.url}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
