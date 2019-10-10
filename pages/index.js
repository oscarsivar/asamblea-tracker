import "../assets/style.css";

import diputadosScrapper from "../defaults/diputados.scrapper.json";
import scrappity from "scrappity";

export default class Index extends React.Component {
    static async getInitialProps() {
        const scrapped = await scrappity(diputadosScrapper);

        return { scrapped };
    }

    render() {
        const congressMembers = this.props.scrapped[0][0];
        return (
            <div className={["container", "mx-auto", "bg-gray-400"].join(" ")}>
                <div className="flex items-center justify-center flex-wrap mb-8">
                    {congressMembers.map((member, i) => (
                        <div
                            key={i}
                            className="sm:h-48 h-56 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full max-w-full w-full flex p-2"
                        >
                            <div
                                className="h-1/2 w-1/3 flex-none bg-cover bg-right-top rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                                style={{
                                    backgroundImage: `url('${diputadosScrapper.url}${member.props.memberImage.attrs.src}')`
                                }}
                                title={member.props.memberProfile.value}
                            ></div>
                            <div className=" h-1/2 w-2/3 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-0">
                                    <p className="text-xs text-gray-600 flex items-center">
                                        San Salvador
                                    </p>
                                    <div className="text-gray-900 font-bold text-lg mb-0 ">
                                        {member.props.memberProfile.value}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-sm">
                                        <p className="text-gray-600 leading-none">
                                            :party-flag:
                                        </p>
                                        {/* <p className="text-gray-600">Aug 18</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
