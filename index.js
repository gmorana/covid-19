const puppeteer = require("puppeteer");
const $ = require("cheerio");
let results = [];
const checkAppointment = async() => {
    results = [];
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(
            "https://mychart.sleh.com/prd/signupandschedule/embeddedschedule?vt=323&dept=1020250018"
        );

        const html = await page.content();
        $("div.errormessage", html).each(function() {
            results.push($(this).text());
            console.log(results);
        });
        if (results.length === 0) {
            console.log("I found an appointment");
        }
        setInterval(async() => {
            await browser.close();
        }, 2000);
    } catch (error) {
        console.log("Nodejs Error", error);
    }
};

const intervalObj = setInterval(() => {
    checkAppointment();
    if (results.length === 0) {
        clearImmediate(intervalObj);
    }
}, 20000);