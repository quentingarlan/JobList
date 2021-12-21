# JobList
A server to list job offers from pole emploi

# Install
install mongodb https://docs.mongodb.com/manual/installation/
install node.js
npm install -g npm

# Config
- Check url in mongoClient.js if you already had a mongoDb you may have to add user/password
also check the port (default is 27017) then it would be mongodb://admin:password@localhost:27017/jobListDb

# Launch 
from this current folder:
- npm start
- Insert jobs in db with url http://localhost:3000/job/insert
For now we can only insert offers by page from poleEmploi limited to 150 offers if you want to insert more offers try http://localhost:3000/job/insert?page=2 it will insert
pole emploi offers from 150 to 299

- Retrieve statistics report with http://localhost:3000/job/report this should log reports in console
and redirect to a file written on server http://localhost:3000/folder/report.csv

# TODO
- Create a docker image for install (tested with docker compose insert in db does not work)
- Change to typescript and create an offer class
- Test poleEmploi returned object (minimum check that properties used in update function did not change name)
- Move client secret / id to a config file (find equivalent to .net appsettings in node.js)
- Do a mass import that retrieve all offers from pole emploi
- Arrange the report in a csv file or something more readable
- Simplify findNbOfProperty function it works only for 2 levels in object and dealing with second level in object is not done properly, also we could probably get all properties in one loop
- Could not find how to download report from browser withouth using a client for now just redirect to report folder on get report url
- Check db close on bulk insert 
- test file writing on other systems than windows


# Things that took time
- Did not understand that I needed to add ?realm=%2Fpartenaire to the url when requesting the auth token, should have read the manual, the error message was useful
- Realize that pole emploi uses 'insee zip codes' instead of postal zip codes (never heard of insee zip codes before)
- Realize that filter in mongoDb updateOne is mandatory obvious when re reading the doc
- Trying to use typescript in node, i will renounce for now

# Used technos:
node.js
express
mongodb