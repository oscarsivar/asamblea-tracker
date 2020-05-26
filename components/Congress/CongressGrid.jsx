import srv from "../../utils/service";

import MemberCard from "./MemberCard";
import FiltersBar from "../Filters/FiltersBar";

import congressScraper from "../../cli/scraper/models/congress.scraper.json";

export default function CongressGrid(props) {
    const [deputies, deputiesSet] = React.useState([]);
    const [attendances, attendancesSet] = React.useState([]);

    React.useEffect(() => {
        deputiesSet(props.deputies);
        Promise.all(
            props.deputies.map(
                async (deputy) =>
                    await srv.get(`api/deputies/${deputy._id}/attendance`)
            )
        )
            .then((awaited) => attendancesSet(awaited.map((a) => a.data)))
            .catch(() => attendancesSet([]));
    }, [props.deputies]);
    return (
        <div className="container mx-auto">
            <FiltersBar
                shownDeputies={deputies}
                deputies={props.deputies}
                orderDeputies={(oDeputies) => deputiesSet([...oDeputies])}
                searchDeputies={(sDeputies) => deputiesSet([...sDeputies])}
            />
            <div className="w-full px-2">
                <div className="flex flex-wrap flex-row justify-start items-center">
                    {deputies.map((deputy, key) => (
                        <MemberCard
                            key={key}
                            deputy={deputy}
                            attendance={attendances[key]}
                            asambleaBaseUrl={congressScraper.url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
