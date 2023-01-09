import {Injectable} from '@angular/core';
import {SocketClientService} from "./socket-client.service";
import {first, Observable} from "rxjs";
import {RepeatResponse, SaveToRepeatRequest} from "./app.component.type";

@Injectable({
  providedIn: 'root'
})
export class RepeatableService {

  constructor(private socketClient: SocketClientService) {
  }

  getRepeatResponse(): Observable<RepeatResponse> {
    return this.socketClient
      .onMessage('/topic/repeat')
      .pipe(first());
  }

  save(request: SaveToRepeatRequest) {
    return this.socketClient.send('/count-app/save-word', request);
  }
}
