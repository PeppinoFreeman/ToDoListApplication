import { Config } from './models/config';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      a:hover {
        text-decoration: underline;
      }
      a:active {
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent {
  public title: string;
  public isCollapsed: boolean;

  constructor() {
    this.title = Config.TITLE;
    this.isCollapsed = true;
  }
}
