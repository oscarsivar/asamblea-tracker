require("dotenv").config();

const { VALID_ARGS } = require("./config");
const args = require("./args");
const option = args.interpret();

const populateCongress = require("./actions/populateCongress");
const populateAgenda = require("./actions/populateAgenda");

const { connectDatabase } = require("../../models");

connectDatabase()
    .then(async function(conn) {
        switch (option.name) {
            case VALID_ARGS.DEFAULT:
                await populateCongress(conn);
                break;

            case VALID_ARGS.AGENDA:
                await populateAgenda(conn, { option });
                break;

            default:
                throw new Error(`Command "${option.name}" not implemented`);
        }

        console.info(option.report.onSuccess());
        process.exit(0);
    })
    .catch(function(err) {
        console.error(option.report.onError(err));
        process.exit(1);
    });
