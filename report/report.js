
const fs = require('fs')
const path = require('path');
const homeFolderPath = process.env.HOME;
const fileName = 'report.csv';

exports.logReport = function logReport(input) {
    const natureContratTitle = 'Nature des contrats';
    const natureContrats = findNbOfProperty(input, 'typeContrat');
    console.log(natureContratTitle, natureContrats);

    const entreprisesTitle = 'Noms des entreprises';
    const entreprises = findNbOfProperty(input, 'entreprise', 'nom');
    console.log(entreprisesTitle, entreprises);

    const lieuxTravailTitle = 'Lieux de Travail';
    const lieuxTravail = findNbOfProperty(input, 'lieuTravail', 'libelle');
    console.log(lieuxTravailTitle, lieuxTravail);

    let csv = natureContratTitle + '\n';
    csv += JsonToCsv(natureContrats, 'typeContrat', 'occurrence');
    csv += entreprisesTitle + '\n';
    csv += JsonToCsv(entreprises, 'entreprise', 'occurrence');
    csv += lieuxTravailTitle + '\n';
    csv += JsonToCsv(lieuxTravail, 'lieuTravail', 'occurrence');

    writeToFile(csv)
}

// write the report to server 
function writeToFile(text) {
    const filePath = path.join(homeFolderPath, fileName);
    console.log('filePath ', filePath)
    fs.writeFile(filePath, text, err => {
        if (err) {
            console.error('error writing in file ', err)
            return
        }
    })
}

// rearrange the object to return csv format
function JsonToCsv(JsonArray, title, result) {
    let addedLines = '';
    JsonArray.forEach(element => {
        if (!element[title]) {
            eltTitle = title + ' not found';
        } else {
            eltTitle = element[title];
        }
        eltResult = element[result];


        addedLines += eltTitle + ';' + eltResult + '\n';
    })
    return addedLines;
}

// get the number of occurence in an array of property propertyName or in subProperty propertyName.secondLevelPropertyName
function findNbOfProperty(input, propertyName, secondPropertyName) {
    let result = [];

    input.forEach((obj) => {
        let resultContainsObj
        // Checking if there is already desired property in result
        if (secondPropertyName) {
            resultContainsObj = result.some((val) => { return val[propertyName] == obj[propertyName][secondPropertyName] })
        } else {
            resultContainsObj = result.some((val) => { return val[propertyName] == obj[propertyName] })
        }

        if (resultContainsObj) {
            result.forEach((res) => {
                if (secondPropertyName) {
                    if (res[propertyName] === obj[propertyName][secondPropertyName]) {
                        res['occurrence']++
                    }
                } else {
                    if (res[propertyName] === obj[propertyName]) {
                        res['occurrence']++
                    }
                }
            })
        } else {
            // Create a new value in array with the name propertyName
            let value = {}

            if (secondPropertyName) {
                value[propertyName] = obj[propertyName][secondPropertyName]
            } else {
                value[propertyName] = obj[propertyName]
            }
            value['occurrence'] = 1
            result.push(value);
        }
    })

    return result
}
