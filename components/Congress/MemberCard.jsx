// Use Redux
import congressScrapper from "../../cli/scrapper/models/congress.scrapper.json";

export default ({ deputy, index }) => (
    <div className="sm:h-48 h-56 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full max-w-full w-full flex p-2">
        <div
            className="h-1/2 w-1/3 flex-none bg-cover bg-right-top rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
                backgroundImage: `url('${congressScrapper.url}${deputy.pictureEndpoint}')`
            }}
            title={deputy.name}
        ></div>
        <div className="h-1/2 w-2/3 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-0">
                <p className="text-xs text-gray-600 flex items-center">
                    {deputy.department.trim()}
                </p>
                <div className="text-gray-900 font-bold text-lg mb-0 ">
                    {deputy.name}
                </div>
            </div>
            <div className="flex flex-row justify-start">
                <div className="flex-1">
                    {/* <img
                        className="h-6 w-8 "
                        src={`${congressScrapper.url}${member.props.memberParty.attrs.src}`}
                        alt={member.props.memberParty.attrs.alt}
                    /> */}
                </div>
                <div className="flex-1">
                    <p className="text-gray-600 flex-1">{index}</p>
                </div>
            </div>
        </div>
    </div>
);
