## Ampere test task
** Requirements **
1. Write a parser which obtains data, author and title information from the given url: https://www.ampereanalysis.com/
2. Render the given information in a view

** Execution **
* Copy the repository to your local machine
* Set up node environment if it's not installed
* The first item executes during in one of two ways:
    * Run "yarn/npm gather-posts" command in your terminal;
    * Run "node app.js parse-ampere" command.

In the app used the next packages:
* yargs - Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface;
* jsdom - emulating of a subset of a web browser.

During execution one of the commands described up above, all the posts information will be received in /logs/app.json file.

Then in order to view the reached information you have to launch node web server: "node server.js". It will cause server execution on 3000 port.
In order to get the view, run "http://localhost:3000" on your browser.