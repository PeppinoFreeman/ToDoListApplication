import { Config } from './models/config';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title: string;
  constructor() {
    this.title = Config.TITLE;
  }
}
