var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var scraper = require('./scripts/Scraper.js');
var app     = express();
blocked = false;
var maxReplies = 50;
app.get('/scrape', function(req, res){
    if (!blocked) {
        blocked = true;
        console.log("Scrape request received from: " + req.get("host") + " for " + req.query.size + " departments.")
        scraper.mine(req.query.size, sendJson);

        function sendJson(content) {
            if (req.query.size <= maxReplies) {
                res.json(content);
            }
            blocked = false;
        }

        if (req.query.size > maxReplies || req.query.size === undefined) {
            res.sendStatus("202");
        }
    }

});
var port = process.env.PORT || 8080;
app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;