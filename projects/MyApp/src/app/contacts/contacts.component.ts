import { Component, OnInit, Input, ViewEncapsulation, ElementRef } from '@angular/core';
import fetchDataHelper from './fetchDataHelper.js';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ContactsComponent implements OnInit {

  _title: string
  data: Array<Object>

  constructor(private eleRef: ElementRef) { }

  @Input()
  set title(title: string) {
    this._title = title;

  }
  get title(): string { return this._title; }

  //called when the refresh button is clicked
  refresh() {
    this.getData();
  }

  rowClicked(event) {
    this.eleRef.nativeElement.dispatchEvent(
        new CustomEvent('contactrowclicked', {
            detail: event.target.innerHTML,
            bubbles: true,
            composed: true
        })
    );
}

  async getData() {
    const data = await fetchDataHelper({ amountOfRecords: 10 });
    this.data = data;
    console.log(data);
  }


  ngOnInit(): void {
    this.getData();
  }

}
