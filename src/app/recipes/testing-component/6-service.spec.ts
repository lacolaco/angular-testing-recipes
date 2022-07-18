import { Component, Injectable } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  signIn() {}
}

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>My Application</h1>
      <button (click)="signIn()">Sign in</button>
    </header>
  `,
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  signIn() {
    this.authService.signIn();
  }
}

describe('HeaderComponent', () => {
  it('should render application title', async () => {
    await render(`<app-header></app-header>`, {
      declarations: [HeaderComponent],
    });

    expect(screen.getByRole('heading').textContent).toContain('My Application');
  });

  it('should call AuthService.signIn() on "Sign in" button click', async () => {
    const { debugElement } = await render(`<app-header></app-header>`, {
      declarations: [HeaderComponent],
    });
    const authService = debugElement.injector.get(AuthService);
    spyOn(authService, 'signIn');

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(authService.signIn).toHaveBeenCalled();
  });

  it('should call AuthService.signIn() on "Sign in" button click', async () => {
    const signIn = jasmine.createSpy();
    await render(`<app-header></app-header>`, {
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { signIn },
        },
      ],
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(signIn).toHaveBeenCalled();
  });
});
