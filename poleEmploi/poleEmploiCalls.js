const https = require('https')

exports.getPoleEmploiOffers = function getPoleEmploiOffers(page, callback) {
    GetAccessToken(function (token) {
        // Request offers
        const poleEmploiUrl = 'api.emploi-store.fr'
        const inseeZipCodes = '35238,33063,75101' // Rennes 35238, bordeaux 33063, Paris,75101

        // limit is 150 offers returned by request, range limit is 1000
        let range = getRangeFromPage(page);
        console.log('range', range);
        // sort=1 -> Tri par date de création décroissant, pertinence décroissante, distance croissante
        const pathOffers = '/partenaire/offresdemploi/v2/offres/search?commune=' + inseeZipCodes + range + '&sort=1';
        const options = {
            hostname: poleEmploiUrl,
            port: 443,
            path: pathOffers,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        }
        const req = https.request(options, res => {
            console.log(`getPoleEmploiOffers statusCode: ${res.statusCode}`)

            // lots of data to process so we get it in parts
            let offersInParts = [];

            res.on('data', data => {
                offersInParts.push(data);
            });

            res.on('end', endOfRequest => {
                // reconstruct data from buffer at the response of request
                const body = Buffer.concat(offersInParts);
                const result = JSON.parse(body);
                callback(result);
            })
        })
        req.on('error', error => {
            console.error(error);
        })
        req.end();
    });
}

// range in pole emploi api is like range=0-149
function getRangeFromPage(page) {
    let pageAsInt = parseInt(page)
    if (!pageAsInt || pageAsInt === 1 || pageAsInt ===0) {
        return '';
    }
    let rangeMultiplicator = 150
    minRange = page * rangeMultiplicator - rangeMultiplicator
    maxRange = page * rangeMultiplicator - 1
    return `&range=${minRange}-${maxRange}`;
}

// Get acces token from pole emploi 
function GetAccessToken(callback) {
    const clientSecret = 'fffde14ad84f52e34f11ffc327a667ca1ef19af34a608179da055da9a14c26c2';
    const client_id = 'PAR_joblist_419553018e720122d38770feba3d5c9cfd227a530c2a4ef02df9976a2dba6048';

    const bodySent = "grant_type=client_credentials"
        + "&client_id=" + client_id
        + "&client_secret=" + clientSecret
        + "&scope=application_" + client_id + " api_offresdemploiv2" + " o2dsoffre";

    const acessTokenPoleEmploiUrl = 'entreprise.pole-emploi.fr';
    const options = {
        hostname: acessTokenPoleEmploiUrl,
        port: 443,
        path: '/connexion/oauth2/access_token?realm=%2Fpartenaire',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const req = https.request(options, res => {
        // console.log(`statusCode GetAccessToken: ${res.statusCode}`);

        res.on('data', token => {
            // console.log(`token: ${data}`);
            // return token
            callback(JSON.parse(token));
        })
    })
    req.on('error', error => {
        console.error(error);
    })
    req.write(bodySent);
    req.end();
}
