export default class Index extends React.Component {
    render() {
        return (
            <button
                onClick={() => {
                    const a = 4;
                    return alert("HolaMundo");
                }}
            >
                Click me!
            </button>
        );
    }
}
