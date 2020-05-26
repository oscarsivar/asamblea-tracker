// const { models } = require("../../../models");
const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/build/pdf");
const stringSimilarity = require("string-similarity");

const {
    COMPARING: {
        AGENDA: {
            ATTENDANCE_MARK,
            ATTENDANCE_NOT_PRESENT,
            ATTENDANCE_PRESENT,
            HEADER_BORDER_WORD,
        },
    },
} = require("../config");

function agendaController() {
    this._takeAttendance = async function (scrapedAgenda) {
        const checkIsX = (str) =>
            str.toUpperCase() == ATTENDANCE_MARK ||
            str.toUpperCase() == ATTENDANCE_PRESENT ||
            str.toUpperCase() == ATTENDANCE_NOT_PRESENT;
        const checkIsName = (str) => isNaN(str) && !checkIsX(str);
        let presentX = 0;

        const attendances = scrapedAgenda
            .reduce((agenda, current) => {
                const len = agenda.length - 1;
                if (current.str.trim()) {
                    if (len < 0) agenda.push(current);
                    else {
                        const str = agenda[len].str.trim();

                        if (checkIsName(str) && checkIsName(current.str)) {
                            agenda[len].str += current.str;
                        } else {
                            if (current.str.toUpperCase() === ATTENDANCE_MARK) {
                                if (presentX === 0)
                                    presentX =
                                        current.transform[4] + current.width; // Edge case

                                current.str =
                                    current.transform[4] <= presentX
                                        ? ATTENDANCE_PRESENT
                                        : ATTENDANCE_NOT_PRESENT;
                            }
                            agenda.push(current);
                        }
                    }
                }
                return agenda;
            }, [])
            .reduce(
                (bag, current) => {
                    const { str } = current;

                    const isNumber = !isNaN(str);
                    const isName = checkIsName(str);
                    const isX = checkIsX(str);

                    if (isNumber && bag.cache[str] === undefined) {
                        bag.report.push({ i: str });
                        bag.cache[str] = bag.report.length;
                    }

                    const len = bag.report.length - 1;

                    if (isName) {
                        if (bag.report[len].owner === undefined)
                            bag.report[len].owner = str;
                        else bag.report[len].alternate = str;
                    }

                    if (isX) {
                        bag.report[len].present = str === ATTENDANCE_PRESENT;
                    }

                    return bag;
                },
                { report: [], cache: {} }
            );
        return attendances.report;
    };
}

agendaController.prototype.processAttendance = async function ({
    uri,
    deputies,
}) {
    const fileName = `./cli/scraper/docs/${uri.split("/").pop()}`;
    const isLocal = fs.existsSync(fileName);

    const pages = [];
    const doc = await pdfjsLib.getDocument(`${isLocal ? fileName : uri}`)
        .promise;

    if (!isLocal) fs.writeFileSync(`${fileName}`, await doc.getData());

    for (let pageIndex = 1; pageIndex <= doc.numPages; pageIndex++) {
        const page = await doc.getPage(pageIndex);
        const content = await page.getTextContent();

        const border =
            content.items.findIndex((item) =>
                item.str.includes(HEADER_BORDER_WORD)
            ) + 1;
        pages.push([...content.items].slice(border));
    }

    const attendances = await this._takeAttendance(pages.flat());

    // TODO: This is too expensive. Find a better way.
    return attendances.map((attendance) => ({
        ...attendance,
        deputy:
            deputies[
                stringSimilarity.findBestMatch(
                    attendance.owner.trim(),
                    deputies.map((d) => d.name.trim())
                ).bestMatchIndex
            ],
    }));
};

module.exports = new agendaController();
