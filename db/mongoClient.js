const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/jobListDb";

exports.AddOffers = function addOffersToDb(offers) {
    MongoClient.connect(url, function (err, db) {
        const jobListDb = db.db("jobListDb");
        const dbOffers = jobListDb.collection('offers');

        try {
            //For every offer from pole Emploi update in db
            const offersToUpdate = offers.map(offer => ({
                updateOne:
                {
                    filter: { id: offer.id },
                    update: { $set: offer },
                    upsert: true
                }
            }
            ));
            // Max update with bulkWrite is 100000
            dbOffers.bulkWrite(
                offersToUpdate,
                { ordered: false }
            );
            // db.close();
        } catch (err) {
            console.log(err);
        }
    })
}

exports.GetOffers = function getOffersFromDb(callback) {
    MongoClient.connect(url, function (err, db) {
        console.log(err);
        const jobListDb = db.db("jobListDb");
        const dbOffers = jobListDb.collection('offers');

        try {
            dbOffers.find({}).toArray(function (err, result) {
                if (err) throw err;
                // console.log("result", result)
                callback(result)
                db.close();
            });
        } catch (err) {
            console.log(err);
        }
    })
}
