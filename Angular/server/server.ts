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

const app = express();
dotenv.load({ path: '.env' });
const port = (process.env.port || 3000);
// app.set('host', '172.24.145.47');
app.set('port', port);

// Parsers
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// Location to serve the static pages from
app.use(express.static(path.join(__dirname, 'dist')));

// Solr Setup
const client = new solrnode({
    host: '172.24.213.57',
    port: '8085',
    core: 'report',
    protocol: 'http'
});


// Hold latest data and numRows
let numRowsLatest, numRowsPrev;
let latestData = {};

// Solr query to get all records
const solrGetAllQuery = client.query().q('*:*').start(0).rows(1000);

// API to get all the data - localhost:3000/records
app.get('/records', (req, res) => {
    function solrData() {
        client.search(solrGetAllQuery, (err, result) => {
            if (err) {
                console.log('Error in fetching data: ' + err.msg + ' Code: ' + err.code);
            } else {
                numRowsPrev = parseInt(result.response.numFound);
                console.log('All Data Rows: ' + numRowsPrev);
                // const newResponse = result.response.docs.map((item) => {
                //     item.id = parseInt(item.id);
                // });
                res.json(result.response.numFound);
                // res.json(newResponse);
            }
        });
    }
    // setInterval(solrData, 2000);
    solrData();
});

// const solrGetLatest10uery = client.query().q('modified_time:[2018-01-30T16:00:00Z TO *]').sort({'modified_time':'desc'}).start(0).rows(10);
// const solrGetLatest10uery = client.query().q('*:*').sort({'modified_time':'desc'});
const solrGetLatest10uery = client.query().q('*:*').sort({'id':'desc'}).rows(10);


// API to get only latest top 10 data - localhost:3000/recordsTop10
app.get('/recordsTop10', (req, res) => {
    function solrData() {
        client.search(solrGetLatest10uery, (err, result) => {
            if (err) {
                console.log('Error in fetching data: ' + err.msg + ' Code: ' + err.code);
            } else {
                numRowsLatest = parseInt(result.response.numFound);
                // numRowsLatest = 606;                
                console.log('All Data Rows New: ' + numRowsLatest);
                if(numRowsLatest === numRowsPrev) {
                    latestData = result.response.docs.filter((item) => {
                        item.id = parseInt(item.id);
                        return item.id > numRowsPrev;
                    });
                    
                    numRowsPrev = numRowsLatest;
                    res.json(latestData);
                }
                // res.json(result.response);
            }
        });
    }
    // setInterval(solrData, 3000);
    solrData();
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});