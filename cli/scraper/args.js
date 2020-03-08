const { VALID_ARGS } = require("./config");

const DEFAULT_ARG = {
    name: VALID_ARGS.DEFAULT,
    params: [],
    report: {
        onSuccess: () => `Scraped succesfully completed! @ ${new Date()}`,
        onError: err =>
            `Scraped could not be completed due '${err}' @ ${new Date()}`
    }
};

function ArgsInterpreter() {
    this.stdErr = msg => {
        process.stderr.write(msg);
        process.exit(1);
    };

    this.args = [...process.argv];
    this.args.splice(0, 2);

    const _args = {
        [VALID_ARGS.DEFAULT]: { ...DEFAULT_ARG },
        [VALID_ARGS.AGENDA]: {
            ...DEFAULT_ARG
        }
    };

    this.validateArgs = () => {
        if (!Array.isArray(this.args))
            this.stdErr(`Invalid Argument Collection`);

        if (this.args.length === 0) return _args.default;

        if (_args.hasOwnProperty(this.args[0]))
            return {
                ..._args[this.args[0]],
                params: this.args.filter((v, i) => i > 0),
                name: this.args[0]
            };

        this.stdErr(`'${this.args[0]}' is not a valid argument`);
    };
}

ArgsInterpreter.prototype.interpret = function() {
    return this.validateArgs();
};

module.exports = new ArgsInterpreter();
