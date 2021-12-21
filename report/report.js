
const fs = require('fs')
const path = require('path');
const homeFolderPath = process.env.HOME;
const fileName = 'report.txt';

exports.logReport = function logReport(input) {
    const natureContrats = findNbOfProperty(input, "typeContrat");
    console.log("Nature des contrats", natureContrats);

    const entreprises = findNbOfProperty(input, "entreprise", "nom");
    console.log("Noms des entreprises", entreprises);

    const lieuxTravail = findNbOfProperty(input, "lieuTravail", "commune");
    console.log("lieux de Travail", lieuxTravail);

    let result = {}
    result["natureContrats"] = natureContrats
    result["entreprises"] =entreprises
    result["lieuxTravail"] =lieuxTravail
    
    writeToFile(JSON.stringify(result))
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
                        res["occurrence"]++
                    }
                } else {
                    if (res[propertyName] === obj[propertyName]) {
                        res["occurrence"]++
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
            value["occurrence"] = 1
            result.push(value);
        }
    })

    return result
}
