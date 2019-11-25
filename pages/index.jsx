import trae from "trae";

import Layout from "../components/Layout/Layout";
import CongressGrid from "../components/Congress/CongressGrid";

export default class Index extends React.Component {
    render() {
        const { deputies } = this.props;
        return (
            <Layout>
                <CongressGrid deputies={deputies} />
            </Layout>
        );
    }
}

Index.getInitialProps = async () => {
    const deputies = (await trae.get("http://localhost:3000/api/deputies"))
        .data;
    return { deputies };
};
