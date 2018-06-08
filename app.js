const argv = require('yargs');
const { JSDOM } = require('jsdom');
const path = require('path');
const AppServices = require('./acme/AppServices');

// comment about this yargs
argv.command(`parse-ampere`,
    `Retrieves all the posts from the page and ✏️ to the log file`, {
        url: {
            alias: 'u',
            default: `https://www.ampereanalysis.com/`
        }
    }, argv => {
        console.log(`\x1b[36m ${argv.url} \x1b[0m`);
        // Using jsdom package to parse received dom
        JSDOM.fromURL(url, {
            runScripts: 'dangerously'
        }).then(dom => {
            var appServices, initialServicesParams;
            initialServicesParams = { path: path.join(__dirname, 'logs/app.json'), dom };
            //  ↩️ guarantee sequence execution of posts information receiving and writing it into log file
            sequenceExecution(initialServicesParams);
        }, err => {
            console.log(`\x1b[35m ${err} \x1b[0m`);
        });
    })
    .help()
    .argv;

async function sequenceExecution(initialServicesParams) {
    appServices = new AppServices(initialServicesParams);
    // 📥 Gather all the necessary information about the posts
    var postsInfo = await appServices.getPostsInfo();
    // 📝  Write posts data into a log file
    await appServices.writeToLogFile(postsInfo);
}