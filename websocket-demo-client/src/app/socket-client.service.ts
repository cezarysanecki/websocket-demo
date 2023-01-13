import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, filter, first, Observable, switchMap} from "rxjs";
import {SocketClientState} from "./app.connection-state-enum";
import * as SockJS from "sockjs-client";
import {Message} from "stompjs";
import {CompatClient, Stomp, StompSubscription} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy {

  private readonly client: CompatClient;
  private state: BehaviorSubject<SocketClientState>;

  constructor() {
    this.client = Stomp.over(new SockJS('http://localhost:8080/websocket'));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    })
  }

  static textHandler(message: Message): string {
    return message.body;
  }

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

  onPlainMessage(topic: string): Observable<string> {
    return this.onMessage(topic, SocketClientService.textHandler);
  }

  onMessage(topic: string, handler = SocketClientService.jsonHandler): Observable<any> {
    return this.connect().pipe(switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = client.subscribe(topic, message => {
          observer.next(handler(message));
        });
        return () => client.unsubscribe(subscription.id);
      });
    }));
  }

  send(topic: string, payload: any): void {
    this.connect()
      .subscribe(client => client.send(topic, {}, JSON.stringify(payload)));
  }

  private connect(): Observable<CompatClient> {
    return new Observable<CompatClient>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    }).pipe(first());
  }

  ngOnDestroy(): void {
    this.connect().subscribe(client => client.disconnect(() => null));
  }
}
