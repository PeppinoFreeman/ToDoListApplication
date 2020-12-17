import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

export class DOMHelper<ComponentType> {
  private fixture: ComponentFixture<ComponentType>;
  constructor(fixture: ComponentFixture<ComponentType>) {
    this.fixture = fixture;
  }
  getText(tag: string): string {
    const tagText = this.fixture.debugElement.query(By.css(tag));
    return tagText.nativeElement.textContent;
  }
  count(tag: string): number {
    const tagNumber = this.fixture.debugElement.queryAll(By.css(tag));
    return tagNumber.length;
  }

  navigateTo(tag: string): string {
    const href = this.fixture.debugElement.query(By.css(tag));
    const routerLinkInstance = href.injector.get(RouterLinkWithHref);
    this.fixture.detectChanges();
    return routerLinkInstance['commands'];
  }
}
