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
                <p className="text-xs text-gray-600 uppercase flex items-center">
                    <svg
                        className="fill-current text-gray-500 w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                    {deputy.department.trim()}
                </p>
                <div className="text-gray-900 font-semibold text-lg mb-0 leading-tight truncate">
                    {deputy.name}
                </div>
            </div>
            <div className="flex flex-row justify-start">
                <div className="flex-1">
                    <img
                        className="h-5 w-7"
                        src={`${congressScrapper.url}${deputy.party.flagEndpoint}`}
                        alt={deputy.name}
                    />
                </div>
                {/* <div className="flex-1">
                    <p className="text-gray-600 flex-1">{index}</p>
                </div> */}
            </div>
        </div>
    </div>
);
