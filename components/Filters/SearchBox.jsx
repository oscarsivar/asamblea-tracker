export default function SearchBox(props) {
    const [text, textSet] = React.useState("");
    return (
        <>
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 pl-1"
                htmlFor="grid-state"
            >
                Buscar
            </label>
            <div className="inline-block relative w-full">
                <input
                    type="text"
                    value={text}
                    placeholder="¿A quién buscas?"
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(event) => {
                        textSet(event.target.value);
                        props.handleOnSearch(event);
                    }}
                />
            </div>
        </>
    );
}
