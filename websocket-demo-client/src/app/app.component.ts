import {Component} from '@angular/core';
import {RepeatableService} from "./repeatable.service";
import {RepeatResponse, SaveToRepeatRequest} from "./app.component.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newRequest: SaveToRepeatRequest = {value: ''};

  repeatResponses: RepeatResponse[] = [];

  constructor(private service: RepeatableService) {
  }

  connect(): void {
    this.service.connect();
    this.service.getRepeatResponse()
      .subscribe(repeatResponse => this.repeatResponses.push(repeatResponse));
  }

  disconnect(): void {
    this.service.disconnect();
  }

  createRequest(request: SaveToRepeatRequest): void {
    this.service.save(request);
  }
}
