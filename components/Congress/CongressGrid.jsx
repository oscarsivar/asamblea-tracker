import MemberCard from "./MemberCard";

export default class CongressGrid extends React.Component {
    render() {
        const { deputies } = this.props;
        return (
            <div className="container mx-auto">
                <div className="w-full p-2">
                    <div className="flex flex-wrap flex-row justify-between items-center">
                        {deputies.map((deputy, key) => (
                            <MemberCard key={key} deputy={deputy} index={key} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
