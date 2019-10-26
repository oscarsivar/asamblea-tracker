import MemberCard from "./MemberCard";

export default class CongressGrid extends React.Component {
    render() {
        const { members, profiles } = this.props;
        return (
            <div className="container mx-auto">
                <div className="flex items-center justify-center flex-wrap mb-8">
                    {members.map((member, key) => (
                        <MemberCard
                            key={key}
                            member={member}
                            profiles={profiles}
                            index={key}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
