import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-title',
  template: `<h1>My Applciation</h1>`,
})
export class TitleComponent {}

describe('TitleComponent', () => {
  it('should render application title as <h1>', async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TitleComponent);
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('My Applciation');
  });
});
