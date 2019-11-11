import MemberCard from "./MemberCard";

export default class CongressGrid extends React.Component {
    render() {
        const { deputies } = this.props;
        return (
            <div className="container mx-auto">
                <div className="flex items-center justify-center flex-wrap mb-8">
                    {deputies.map((deputy, key) => (
                        <MemberCard key={key} deputy={deputy} index={key} />
                    ))}
                </div>
            </div>
        );
    }
}
