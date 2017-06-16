/*jslint node: true */
"use strict";

var express = require('express');
var request = require('request');
var xmlToJson = require('xml2js').parseString;
var router = express.Router();

module.exports = function (server, config) {

    router.post('/ssoLogin', function (req, res) {
        console.log('/ssoLogin....');
        var url = config.ssoUrl + '/thdLogin';
        var data = req.body;

        data.j_password = new Buffer(data.j_password, 'base64').toString('utf8');
        request.post(url, function (error, response, body) {
            var jsonBody, jsonRaw;
            xmlToJson(body, { explicitArray: false, ignoreAttrs: true }, function (err, jsonResult) {
                jsonRaw = jsonResult;
                jsonBody = JSON.stringify(jsonResult);
            });
            res.statusCode = response.statusCode;
            res.statusMessage = response.statusMessage;
            if (response.statusCode === 200) {
                res.setHeader('Set-Cookie', response.headers['set-cookie']);
            } else {
                jsonBody = JSON.stringify(jsonRaw.THDLogin.Error);
            }
            res.end(jsonBody);
        }).form(data);
    });

    router.get('/getUserProfile', function (req, res) {
        console.log('/getUserProfile....');
        var url = config.dapperUrl + req.query.username;

        request.get(url, function (error, response, body) {
            res.end(body);
        });
    });

    router.get('/isSessionValid', function (req, res) {
        console.log('/isSessionValid....');
        var url = config.ssoUrl + '/isSessionValid?callingProgram=' + config.projectInfo.appName;
        var options = {
            url: url,
            headers: {
                'Cookie': req.headers['cookie']
            }
        };

        request.get(options, function (error, response, body) {
            var jsonBody, jsonRaw;
            xmlToJson(body, { explicitArray: false, ignoreAttrs: true }, function (err, jsonResult) {
                jsonRaw = jsonResult;
                jsonBody = JSON.stringify(jsonResult);
            });
            res.statusCode = response.statusCode;
            res.statusMessage = response.statusMessage;
            if (response.statusCode === 200) {
                jsonBody = JSON.stringify(jsonRaw.IsSessionValid);
            }
            res.end(jsonBody);
        });
    });

    server.use(router);

};
