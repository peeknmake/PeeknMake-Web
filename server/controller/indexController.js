

exports.getLocFromMongo =  function(req, res){
    var url = 'mongodb://10.0.0.106:27017';
    var query = {
        $and: [
            { lat: { $gt: "17" } }, { lat: { $lt: "25" } }, { lon: { $gt: "88" } }, { lon: { $lt: "90" } }
        ]
    };
    MongoClient.connect(url)
        .then((client) => client.db('peeknmake'))
        .then((db) => db.collection('indianCities'))
        .then((cities) => {
            return cities.find(query).toArray();
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            cres.status(500).send(error)
        })
};



