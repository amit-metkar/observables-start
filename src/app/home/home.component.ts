import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numberSubscription: Subscription;
  customSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    const myNumbers = Observable.interval(1000).map(
      (data: number) => { return data * 2; }
    );
    this.numberSubscription = myNumbers.subscribe((number: number) => {
      console.log(number);
    });

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first Package');
      }, 2000);
      setTimeout(() => {
        observer.next('second Package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('third Package');
      }, 6000);
    });

    this.customSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy(): void {
   this.numberSubscription.unsubscribe();
   this.customSubscription.unsubscribe();
  }
}
