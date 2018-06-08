const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;
var app = express();

// app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    // tree=  treeParsing();
    res.render('index.hbs', {
        pageTitle: 'Ampere test',
        tree: treeParsing()
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});

function treeParsing() {
    var pathLogFile = `${__dirname}/logs/app.json`;
    fs.readFile(pathLogFile, (err, resp) => {
        // 🔧 parse here data from log file and pass it to render functio about in the file
        var parsedData = `<ul>`;
        resp.forEach(el => {
            parsedData += `<ul><li>${el.title}</li><li>${el.author}<li>${el.date}</li></ul>`;
        })
        parsedData += `</ul>`
    });
    return parsedData;
}