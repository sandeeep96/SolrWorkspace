import { Component, OnInit } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import {MyDataService} from '../mydata.service';
import {MyData} from '../mydata';

@Component({
  selector: 'app-updated-table-component',
  templateUrl: './updated-table-component.component.html',
  styleUrls: ['./updated-table-component.component.css']
})
export class UpdatedTableComponentComponent implements OnInit {

  winners: MyData[] = [];
  cols: any[];
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;

  yearFilter: number;

  yearTimeout: any;
  year1Filter: number;

  year1Timeout: any;

  constructor(private winnerService: MyDataService) { }


  // ngOnInit() {
  //   this.winnerService.getWinners()
  //   .subscribe(
  //     (data) => {
  //       this.winners = data});
  // }

  ngOnInit() {
    this.winnerService.getWinners1()
    .subscribe(
      (data) => {
        this.winners = data;
      }, function (error) {
        console.log(error);
      },
      function () {
        console.log("completed");
      });
    // console.log("ng init");
    // this.refreshData();
        this.cols = [
          { field: 'id', header: 'Id' },
          { field: 'stock', header: 'Stock' },
          { field: 'price', header: 'Price' },
          { field: 'OfferPrice', header: 'OfferPrice' },
          { field: 'OfferVolume', header: 'OfferVolume' },
          { field: 'BidPrice', header: 'BidPrice' },
          { field: 'BidVolume', header: 'BidVolume' },
          { field: 'TradedVolume', header: 'TradedVolume' }
      ];
  }

  public ngOnDestroy(): void {
    console.log("ng destroy");
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

    // ngOnInit() {
  //   console.log("ng init");
  //   this.refreshData();
  // }

  private refreshData(): void {
    this.postsSubscription = this.winnerService.getWinners().subscribe(
      (data) => {
        this.winners = data;
        this.subscribeToData();
      },
      function (error) {
        console.log(error);
      },
      function () {
        console.log("completed");
      }
    );
  }

  private subscribeToData(): void {

    this.timerSubscription = Observable.timer(10000)
      .subscribe(() => this.refreshData());
  }


  onYearChange(event, dt) {
    if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, 'OfferPrice', 'gt');
    }, 250);
}
onYear1Change(event, dt) {
  if (this.year1Timeout) {
      clearTimeout(this.year1Timeout);
  }

  this.year1Timeout = setTimeout(() => {
      dt.filter(event.value, 'price', 'gt');
  }, 250);
}
}
