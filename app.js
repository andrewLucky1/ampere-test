const argv = require('yargs');
const { JSDOM } = require('jsdom');
const path = require('path');
const AppServices = require('./acme/AppServices');

// comment about this yargs
argv.command(`parse-ampere`,
    `Retrieves all the posts from the page and ✏️ to the log file`, () => { }, argv => {
        var url = `https://www.ampereanalysis.com/`;
        // comment about jsdom
        JSDOM.fromURL(url, {
            runScripts: 'dangerously'
        }).then(dom => {
            var appServices, initialServicesParams;
            initialServicesParams = { path: path.join(__dirname, 'logs/app.json'), dom };
            appServices = new AppServices(initialServicesParams);
            // 📥 Gather all the necessary information about the posts
            var postsInfo = appServices.getPostsInfo();
            // 📝  Write posts data into a log file
            appServices.writeToLogFile(postsInfo);
        }, err => {
            console.log(`\x1b[35m ${err} \x1b[0m`);
        });
    })
    .help()
    .argv;