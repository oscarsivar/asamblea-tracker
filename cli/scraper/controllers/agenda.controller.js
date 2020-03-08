const { models } = require("../../../models");

function agendaController() {}

agendaController.prototype.makeSense = async function(scrapedAgenda) {
    const checkIsX = str =>
        str.toUpperCase() == `X` ||
        str.toUpperCase() == `LX` ||
        str.toUpperCase() == `RX`;
    const checkIsName = str => isNaN(str) && !checkIsX(str);
    let presentX = 0;

    const attendances = scrapedAgenda
        .filter(f => f.str.trim())
        .reduce((agenda, current) => {
            const len = agenda.length - 1;

            if (len < 0) agenda.push(current);
            else {
                const str = agenda[len].str.trim();

                if (checkIsName(str) && checkIsName(current.str)) {
                    agenda[len].str += current.str;
                } else {
                    if (current.str.toUpperCase() === `X`) {
                        if (presentX === 0)
                            presentX = current.transform[4] + current.width; // Edge case

                        current.str =
                            current.transform[4] <= presentX ? `LX` : `RX`;
                    }
                    agenda.push(current);
                }
            }
            return agenda;
        }, [])
        .reduce((report, current) => {
            const { str } = current;

            const isNumber = !isNaN(str);
            const isName = checkIsName(str);
            const isX = checkIsX(str);

            if (isNumber) report.push({ i: str });

            const len = report.length - 1;

            if (isName) {
                if (report[len].owner === undefined) report[len].owner = str;
                else report[len].alternate = str;
            }

            if (isX) {
                report[len].present = str === `LX`;
            }

            return report;
        }, []);

    // const deputies = (await models.Deputy.find()).map(d => ({
    //     deputy: d
    // }));

    // TODO: This is expensive, find another way
    // const foundInAgenda = deputies.map(d => {
    //     for (const j in attendances)
    //         if (attendances[j].str.trim() == d.name)
    //             return { ...d, present: true };
    //     return { ...d, present: false };
    // });
    console.log({ attendances });
    debugger;
};

module.exports = new agendaController();
