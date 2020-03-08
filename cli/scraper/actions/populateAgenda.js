const mongoose = require("mongoose");
const pdfjsLib = require("pdfjs-dist/build/pdf");
const scrappity = require("scrappity");

const attendanceScraper = require("./../models/agenda.scraper.json");
const attendanceQuery = attendanceScraper.queryObjects[0];

const { agendaController } = require("./../controllers");

function columnifyAgenda() {}

module.exports = async function(conn, { option }) {
    attendanceQuery.endpoint = attendanceQuery.endpoint
        .replace(`:session`, `85`)
        .replace(`:congress-period`, `2018-2021`);

    const scrapedAttendance = (await scrappity(attendanceScraper))[0][0];
    const uri = `${attendanceScraper.url}${scrapedAttendance[0].props.fileUrls[3].attrs.href}`;

    const doc = await pdfjsLib.getDocument(`${uri}`).promise;
    const meta = await doc.getMetadata();

    const pages = [];

    for (let pageIndex = 1; pageIndex <= doc.numPages; pageIndex++) {
        const page = await doc.getPage(pageIndex);
        const content = await page.getTextContent();

        const border =
            content.items.findIndex(item => item.str.includes("SUSTITUCIÓN")) +
            1;
        pages.push([...content.items].slice(border));
    }

    await agendaController.makeSense(pages.flat());

    console.log({ pages: pages.flat() });
    debugger;
};
