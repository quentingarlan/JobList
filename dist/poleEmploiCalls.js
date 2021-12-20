const https = require('https');
exports.getPoleEmploiOffers = function getPoleEmploiOffers(callback) {
    GetAccessToken(function (token) {
        // Request offers
        const poleEmploiUrl = 'api.emploi-store.fr';
        const inseeZipCodes = '35238'; // Rennes 35238, bordeaux 33063, Paris,75101
        const pathOffers = '/partenaire/offresdemploi/v2/offres/search?qualification=0&motsCles=informatique&commune=' + inseeZipCodes + '&range=0-10&origineOffre=2&publieeDepuis=3';
        const options = {
            hostname: poleEmploiUrl,
            port: 443,
            path: pathOffers,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        };
        const req = https.request(options, res => {
            console.log(`statusCode getPoleEmploiOffers: ${res.statusCode}`);
            let offersInParts = [];
            // lots of data to process so we get it in parts
            res.on("data", function (offersInParts) {
                // console.log(`data: ${JSON.parse(offersInParts)}`)
                console.log(`data`, offersInParts);
                offersInParts.push(offersInParts);
            });
            res.on('end', offers => {
                console.log(`end`);
                var body = Buffer.concat(offersInParts);
                var result = JSON.parse(body.toString());
                console.log(`result: result`);
                callback(result);
            });
        });
        req.on('error', error => {
            console.error(error);
        });
        req.end();
    });
};
// Get acces token 
function GetAccessToken(callback) {
    const clientSecret = 'fffde14ad84f52e34f11ffc327a667ca1ef19af34a608179da055da9a14c26c2';
    const client_id = 'PAR_joblist_419553018e720122d38770feba3d5c9cfd227a530c2a4ef02df9976a2dba6048';
    const data = "grant_type=client_credentials"
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
    };
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', data => {
            // process.stdout.write(d)
            console.log(`data: ${data}`);
            // return token
            callback(JSON.parse(data));
        });
    });
    req.on('error', error => {
        console.error(error);
    });
    req.write(data);
    req.end();
}
//# sourceMappingURL=poleEmploiCalls.js.map