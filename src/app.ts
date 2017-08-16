import { autoinject } from 'aurelia-dependency-injection';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

import {
  Wss,
  CALL_TYPE,
  WSS_ACTION
} from './data/wss';

@autoinject()
export class App {
  message = 'Hello World!';

  public simpleData: string = "";
  public complexData = {
    firstName: "",
    lastName: "",
  };
  public socketResponse: string = "";
  public wssSubscription: Subscription;

  constructor(private wss: Wss) {}

  attached() {
    Observable.of(3 * 7)
      .map((value) => value * 2)
      .subscribe(
        (result) => this.message = result.toString()
      );

    // Subscribe to websocket service and render outputs
    this.wss.start("wss://echo.websocket.org");
    this.wssSubscription = this.wss.socket.subscribe(
      (res: CALL_TYPE) => { 
        switch(res.action) {
          case WSS_ACTION.simple: 
            this.socketResponse = res.payload;
            break;
          case WSS_ACTION.complex:
            this.socketResponse = Object.values(res.payload).join(" ");
        }
      },
      (err) => { console.log(err); }
    )
  }

  detached() {
    this.wssSubscription.unsubscribe();
  }

  public sendSimple() {
    this.wss.send({
      action: WSS_ACTION.simple,
      payload: this.simpleData
    });
    this.simpleData = "";
  }

  public sendComplex() {
    this.wss.send({
      action: WSS_ACTION.complex,
      payload: { 
        ...this.complexData,
        birthday: (() => {
          return new Date(Math.ceil(Math.random() * 10000000000000));
        })()
    }
    });
    this.complexData.firstName = "";
    this.complexData.lastName = "";
  }
}
