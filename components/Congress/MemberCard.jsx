export default ({ deputy, asambleaBaseUrl }) => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const firstPeriodOn = deputy.firstPeriodOn.split("-")[0];
    const seniorityInYears = currentYear - firstPeriodOn;

    return (
        <div className="h-48 w-full bg-gray-300 sm:w-6/12 lg:w-4/12 xl:w-3/12 p-2 bg-white flex-grow-0 flex-flex-shrink-0 flex ">
            {/* Member picture */}
            <div
                className="w-5/12 bg-cover bg-top"
                style={{
                    backgroundImage: `url('${asambleaBaseUrl}${deputy.pictureEndpoint}')`
                }}
                title={deputy.name}
            />

            {/* Member details */}
            <div className="w-7/12 p-3 bg-white flex content-between flex-wrap">
                {/* Member name */}
                <div className="w-full" title={"Nombre completo"}>
                    <div className="text-gray-900 font-medium text-xl leading-tight">
                        {renderName(deputy.name).map((name, key) => (
                            <p className="truncate" key={key}>
                                {name}
                            </p>
                        ))}
                    </div>
                    <a
                        href={`${asambleaBaseUrl}/${deputy.profileEndpoint}`}
                        target="_blank"
                        className="text-xs underline text-blue-500 font-hairline"
                    >
                        Ver en asamblea.gob.sv
                    </a>
                </div>

                {/* Member props */}
                <div className="w-full" title="Años de servicio">
                    {/* Member seniority */}
                    <div className="text-sm text-gray-600 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg
                                className="fill-current text-gray-600 w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                            </svg>
                            <span className="ml-2">
                                {seniorityInYears > 0
                                    ? `${firstPeriodOn} (${seniorityInYears} año${
                                          seniorityInYears > 1 ? "s" : ""
                                      })`
                                    : "Empezó este año"}
                            </span>
                        </div>
                    </div>

                    {/* Member party affiliation */}
                    <div
                        className="text-sm text-gray-600 flex items-center justify-between"
                        title="Partido político"
                    >
                        <div className="flex items-center">
                            <svg
                                className="fill-current text-gray-600 w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                            </svg>

                            <div className="ml-2 flex items-center">
                                <div
                                    className="h-3 w-5 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${asambleaBaseUrl}${deputy.party.flagEndpoint}')`
                                    }}
                                    title={deputy.name}
                                />
                                <span className="ml-1">
                                    {deputy.party.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Member department */}
                    <div
                        className="text-sm text-gray-600 flex items-center justify-between"
                        title="Departamento que representa"
                    >
                        <div className="flex items-center">
                            <svg
                                className="fill-current text-gray-600 w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                            </svg>
                            <span className="ml-2">
                                {deputy.department.trim()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function renderName(name) {
    const split = name.split(" ");
    switch (split.length) {
        case 2:
            return split;
        case 3:
            const last = split.pop();
            return [split.join(" "), last];

        case 4:
        case 5:
        case 6:
            const one = split.slice(0, 2);
            const two = split.slice(2, split.length);

            return [one.join(" "), two.join(" ")];

        default:
            return split;
    }
}
