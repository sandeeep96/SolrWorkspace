import { Component, OnInit } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import {MyDataService} from '../mydata.service';
import {MyData} from '../mydata';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  winners: MyData[] = [];
  cols: any[];
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;

  BidVolumeFilter: number;

  BidVolumeTimeout: any;

  constructor(private winnerService: MyDataService) { }


  // ngOnInit() {
  //   this.winnerService.getWinners()
  //   .subscribe(
  //     (data) => {
  //       this.winners = data});
  // }

  ngOnInit() {
    this.winnerService.getWinners()
    .subscribe(
      (data) => {
        this.winners = data});
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


  onBidVolumeChange(event, dt) {
    console.log(event,dt)
    if (this.BidVolumeTimeout) {
        clearTimeout(this.BidVolumeTimeout);
    }

    this.BidVolumeTimeout = setTimeout(() => {
        dt.filter(event.value, 'BidVolume', 'gt');
    }, 250);
}
}
