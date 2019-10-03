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
            <div>
                <ul>
                    {congressMembers.map((member, i) => (
                        <li key={i}>
                            <div>{member.props.memberName.value}</div>
                            <img
                                src={`${diputadosScrapper.url}${member.props.memberImage.attrs.src}`}
                                alt={member.props.memberImage.attrs.alt}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
