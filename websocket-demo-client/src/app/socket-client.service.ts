import {Injectable, OnDestroy} from '@angular/core';
import {Client, StompSubscription} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {BehaviorSubject, filter, first} from "rxjs";
import {SocketClientState} from "./app.connection-state-enum";

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy {

  private currentSubscription: StompSubscription | undefined = undefined;

  private connectionState: BehaviorSubject<SocketClientState>;
  private client: Client | null = null;

  constructor() {
    this.connectionState = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client = new Client({webSocketFactory: () => new SockJS('http://localhost:8080/websocket')});
    this.client.onConnect = () => {
      this.connectionState.next(SocketClientState.CONNECTED);
    };
    this.client.onDisconnect = () => {
      this.connectionState.next(SocketClientState.ATTEMPTING);
    }
  }

  connect(): void {
    this.client?.activate();
  }

  disconnect(): void {
    this.currentSubscription?.unsubscribe();
    this.currentSubscription = undefined;
    this.client?.deactivate();
  }

  send(topic: string, payload: any): void {
    this.client?.publish({
      destination: topic,
      body: payload
    })
  }

  onMessage(topic: string): void {
    const callback = (message: any) => {
      if (message.body) {
        console.log("got message with body " + message.body)
      } else {
        console.log("got empty message");
      }
    };

    if (this.currentSubscription) {
      return;
    }
    this.connectionState.pipe(filter(state => state === SocketClientState.CONNECTED))
      .pipe(first())
      .subscribe(() => this.currentSubscription = this.client?.subscribe(topic, callback));
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
