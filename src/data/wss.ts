import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

export class Wss {
  public socket: WebSocketSubject<CALL_TYPE | string>;

  public start(url: string) {
    if (!this.socket || this.socket.closed || this.socket.isStopped) {
      this.socket = new WebSocketSubject(url);
    }
  }

  public send(data: CALL_TYPE) {
    this.socket.next(JSON.stringify(data));
  }
}


export enum WSS_ACTION {
  simple = "CallSimple",
  complex = "CallComplex"
} 

export interface IRequestResponse {
  action: WSS_ACTION;
}

export interface ComplexPayload {
  firstName: string;
  lastName: string;
  birthday: Date;
}


/* Request/Response types */
export interface WsSimple extends IRequestResponse {
  action: WSS_ACTION.simple;
  payload: string;
}

export interface WsComplex extends IRequestResponse {
  action: WSS_ACTION.complex;
  payload: ComplexPayload;
}

export type CALL_TYPE = WsSimple | WsComplex;
