import scrappity from "scrappity";
import trae from "trae";

import Layout from "../components/Layout/Layout";
import CongressGrid from "../components/Congress/CongressGrid";

import congressScrapper from "../cli/scrapper/models/congress.scrapper.json";
import profileScrapper from "../cli/scrapper/models/profile.scrapper.json";

export default class Index extends React.Component {
    render() {
        const { members, profiles } = this.props;
        return (
            <Layout>
                <CongressGrid members={members} profiles={profiles} />
            </Layout>
        );
    }
}

Index.getInitialProps = async () => {
    const scrapped = await scrappity(congressScrapper);
    const members = scrapped[0][0];

    const indexAndUris = members.map((member, index) => ({
        index,
        uri: member.props.memberProfile.attrs.href.substring(1)
    }));

    const profiles = await Promise.all(
        indexAndUris.map((profile, index) => {
            const currentScrapper = { ...profileScrapper };
            currentScrapper.queryObjects[0].endpoint = profile.uri;

            return scrappity(currentScrapper);
        })
    );

    // await trae.get("http://localhost:3000/api/sample");

    return { members, profiles: profiles.map(p => p[0][0][0]) };
};
