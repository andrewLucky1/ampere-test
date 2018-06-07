const fs = require('fs');
const _ = require('lodash');

class AppServices {
    constructor(props) {
        this.logFilePath = props.path;
        this.dom = props.dom;
    }

    writeToLogFile(data) {
        var data = JSON.stringify(data);
        fs.writeFile(this.logFilePath, data, err => {
            console.log(`\x1b[36m ${ err } \x1b[0m`);
        });
    }

    getTitles() {
        var titles = [];
        this.dom.window.document.querySelectorAll('.well h5').forEach(el => {
            let title = el.textContent.replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
            if (title.length !== 0) titles.push(title);
        });
        return titles;
    }

    getDatesAndAuthors() {
        var datesAndAuthors = [];
        this.dom.window.document.querySelectorAll('.post-tile-strip').forEach(el => {
            if (typeof el === undefined) return;
            let author, date;
            date = el.querySelector('.pad-10').textContent
            date = date.substr(date.search(/\d/), 8).trim();
            author = el.querySelector('.pad-10 a b').textContent
            datesAndAuthors.push({ date, author });
        });
        return datesAndAuthors;
    }

    getPostsInfo() {
        var datesAndAuthors, titles, posts = [];
        datesAndAuthors = this.getDatesAndAuthors();
        titles = this.getTitles();
        datesAndAuthors.forEach((el, i) => {
            let postInfo = {
                date: el.date,
                author: el.author,
                title: titles[i]
            };
            posts.push(postInfo);
        });
        return posts;
    }
}

module.exports = AppServices;