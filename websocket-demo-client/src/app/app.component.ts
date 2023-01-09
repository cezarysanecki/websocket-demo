import {Component, OnInit} from '@angular/core';
import {RepeatableService} from "./repeatable.service";
import {RepeatResponse, SaveToRepeatRequest} from "./app.component.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  newRequest: SaveToRepeatRequest = {value: ''};

  repeatResponses: RepeatResponse[] = [];

  constructor(private service: RepeatableService) {
  }

  ngOnInit(): void {
    this.service.getRepeatResponse()
      .subscribe(repeatResponse => this.repeatResponses.push(repeatResponse));
  }

  createRequest(request: SaveToRepeatRequest): void {
    this.service.save(request);
  }
}
