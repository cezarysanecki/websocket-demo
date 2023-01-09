import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SaveToRepeatRequest} from "../app.component.type";

@Component({
  selector: 'app-save-word-to-repeat',
  templateUrl: './save-word-to-repeat.component.html',
  styleUrls: ['./save-word-to-repeat.component.css']
})
export class SaveWordToRepeatComponent implements OnChanges {

  form: FormGroup = this.formBuilder.group({
    value: ['', Validators.required]
  });

  @Input()
  request: SaveToRepeatRequest | null = null;
  @Output()
  onRequest: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(): void {
    this.form.controls['value'].setValue(this.request?.value);
  }

  onSubmit(): void {
    this.onRequest.emit({value: this.form.controls['value'].value});
  }

}
