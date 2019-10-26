import scrappity from "scrappity";

import Layout from "../components/Layout/Layout";
import CongressGrid from "../components/Congress/CongressGrid";

import congressScrapper from "../scrappers/congress.scrapper.json";
import profileScrapper from "../scrappers/profile.scrapper.json";

export default class Index extends React.Component {
    static async getInitialProps() {
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

        return { members, profiles: profiles.map(p => p[0][0][0]) };
    }

    render() {
        const { members, profiles } = this.props;
        return (
            <Layout>
                <CongressGrid members={members} profiles={profiles} />
            </Layout>
        );
    }
}
