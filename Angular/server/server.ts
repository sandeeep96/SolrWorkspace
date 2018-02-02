//
// Important instructions on how to run the file
//
// run "tsc server" and then run "node server"

// Required Imports
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as solrnode from 'solr-node';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as path from 'path';
import * as util from 'util';

// Set up express environment
const app = express();
dotenv.load({ path: '.env' });
const port = (process.env.port || 3000);
app.set('port', port);

// Parsers
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// Location to serve the static pages from
app.use(express.static(path.join(__dirname, 'dist')));

// Solr Details
const SolrIp = '172.24.213.57';
// const ip = '172.31.100.55';
const SolrPort = '8085';
const SolrCore = 'report';
const SolrProtocol = 'http';

// Solr Setup
const client = new solrnode({
    host: SolrIp,
    port: SolrPort,
    core: SolrCore,
    protocol: SolrProtocol
});


// Hold data and numRows
let numRowsLatest, numRowsPrev;
let latestData = {}, completeData = {};

// Solr query to get all records
const solrGetAllQuery = client.query().q('*:*').start(0).rows(1000);

/*
 * API to get all the data - localhost:3000/records
 *
*/
app.get('/records', (req, res) => {
    function solrData() {
        client.search(solrGetAllQuery, (err, result) => {
            if (err) {
                console.log('Error in fetching data: ' + err.msg + ' Code: ' + err.code);
            } else {
                if (result !== undefined) {
                    const numberOfRows = result.response.numFound;
                    numRowsPrev = parseInt(numberOfRows, 10);
                    console.log('All Data Rows: ' + numRowsPrev);
                    completeData = result.response.docs.map((item) => {
                        return item;
                    });
                    res.json(completeData);
                } else {
                    console.log('No All data..!!');
                    res.json(null);
                }
            }
        });
    }
    solrData();
});

/*
 * Query for getting the latest 100 rows of data.
 *
*/
// const solrGetLatest10uery = client.query().q('modified_time:[2018-01-30T16:00:00Z TO *]').sort({'modified_time':'desc'}).start(0).rows(10);
// const solrGetLatest10uery = client.query().q('*:*').sort({'modified_time':'desc'});
const solrGetLatest10uery = client.query().q('*:*').sort({ 'id': 'desc' }).rows(100);

/*
 * API to get only latest top 100 data - localhost:3000/recordsTop10
 *
 * Compares the old number of rows with the new total number of rows fetched and if the latest fetch has more rows,
 * it sends only the new additions to the frontend.
 *
*/
app.get('/recordsTop100', (req, res) => {
    function solrData() {
        client.search(solrGetLatest10uery, (err, result) => {
            if (err) {
                console.log('Error in fetching data: ' + err.msg + ' Code: ' + err.code);
            } else {
                if (result !== undefined) {
                    numRowsLatest = parseInt(result.response.numFound, 10);
                    console.log('All New Data Rows: ' + numRowsLatest);
                    if (numRowsLatest > numRowsPrev) {
                        // if (numRowsLatest === numRowsPrev) {
                        latestData = result.response.docs.filter((item) => {
                            item.id = parseInt(item.id, 10);
                            // return item.id <= numRowsPrev;
                            return item.id > numRowsPrev;
                        });

                        numRowsPrev = numRowsLatest;
                        res.json(latestData);
                    } else {
                        res.json(null);
                    }
                } else {
                    res.json(null);
                }
            }
        });
    }
    solrData();

});

// Start the server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
