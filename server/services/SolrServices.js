const request = require('request');
const constants = require('./constants');

exports.selectFromSolr = function (query) {
    return new Promise((resolve, reject) => {
        let options = {
            url: constants.SOLR_URI + '/select',
            qs: query
        };
        request(options, function (error, response, body) {
            var searchResult = '';
            if (error) {
                reject(new Error('Failed to load page, status code: ' + error.statusCode));
            } else if (response && body) {
                resolve(JSON.parse(body));
            }
        });
    })
}

exports.suggestFromSolr = function (query) {
    return new Promise((resolve, reject) => {
        let options = {
            url: constants.SOLR_URI + '/suggest',
            qs: query
        };
        request(options, function (error, response, body) {
            var searchResult = '';
            if (error) {
                reject(new Error('Failed to load page, status code: ' + error.statusCode));
            } else if (response && body) {
                resolve(JSON.parse(body));
            }
        });
    })
}

exports.suggestIngredient = function (query) {
    return new Promise((resolve, reject) => {
        let options = {
            url: constants.SOLR_URI + '/suggestIngredient',
            qs: query
        };
        request(options, function (error, response, body) {
            var searchResult = '';
            if (error) {
                reject(new Error('Failed to load page, status code: ' + error.statusCode));
            } else if (response && body) {
                resolve(JSON.parse(body));
            }
        });
    })
}

exports.selectFromLocation = function (queryparam) {
    // console.log(' query param from solr service ');
    // console.log(queryparam);
    return new Promise((resolve, reject) => {
        let lat = '18.15';
        let long = '83.85';
        let radius = '1000';
        let query = '&q=*:*&fq={!geofilt%20sfield=geo_location}&pt='+queryparam.lat+','+queryparam.lan+'&d='+queryparam.rad+'&wt=json'; 
        // let query = '&q=video_id:[* TO *]&fq={!geofilt%20sfield=geo_location}&pt='+queryparam.lat+','+queryparam.lan+'&d='+queryparam.rad+'&wt=json';
            
        let options = {
            url: constants.SOLR_LOC_URI + '/select?' + query,
            qs: query
        };
        request(options, function (error, response, body) {
            var searchResult = '';
            if (error) {
                reject(new Error('Failed to load page, status code: ' + error.statusCode));
            } else if (response && body) {
                resolve(JSON.parse(body));
            }
        });
    })
}