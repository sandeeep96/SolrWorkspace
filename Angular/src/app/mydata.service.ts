import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {MyData} from './mydata';

/** Service to fetch the data from End-point URL */
@Injectable()
export class MyDataService {

    constructor(private http: Http) { }

    // private endpointURL = 'http://localhost:3000/winners';  // URL to web api
    // private endpointURL = 'http://172.24.214.51:8085/solr/report/select?q=*:*&rows=1000&start=1  ';
    // private endpointURL = 'http://172.24.213.57:8085/solr/report/select?q=*:*&rows=1000&start=1 ';
    private endpointURL = 'http://172.24.145.47:3000/records ';
    // private endpointURL = 'http://172.31.100.48:8085/solr/report/select?q=*:*&rows=1000&start=1 ';
    
    private updatedEndpointURL = 'http://172.24.145.47:3000/recordsTop100 ';

    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});

    private options = new RequestOptions({ headers: this.headers });

    getWinners(): Observable<MyData[]> {
        return this.http.get(this.endpointURL)
                   .map(response => {
                     console.log("inside service")
                     console.log(response);
                    //  console.log(response.json().response.docs);
                    //  return response.json().response.docs as MyData[]})
                    console.log(response.json());
                     return response.json() as MyData[]})
                   .catch(this.handleError);
      }
       
      getWinners1(): Observable<MyData[]> {
        return this.http.get(this.updatedEndpointURL)
                   .map(response => {
                     console.log(response);
                    //  console.log(response.json().response.docs);
                    //  return response.json().response.docs as MyData[]})
                    // console.log(response.json().docs);
                    //  return response.json().docs as MyData[]})
                     console.log(response.json());
                     return response.json() as MyData[]})
                   .catch(this.handleError);
      }

      private handleError(error: any): Observable<any> {
        return Observable.throw(error.json().error || 'Server error');
      }

}