const express = require('express');
const router = express.Router();
const solr = require('../services/SolrServices');
const mongo = require('../services/mongo');
const MongoClient = require('mongodb').MongoClient;


/* GET api listing. */
router.get('/apitest', (req, res ,next) => {
    res.send('api works');
});

router.get('/videoincircle', (req, res ,next) => {
    // console.log(req.query);
    solr.selectFromLocation(req.query)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(500).send(error);
        });
});
/* GET api listing. */
router.get('/select', (req, res,next) => {
    solr.selectFromSolr(req.query)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(500).send(error);
        });
});

/* GET api listing. */
router.get('/suggest', (req, res,next) => {
    solr.suggestFromSolr(req.query)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;