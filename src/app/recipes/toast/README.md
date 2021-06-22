# Toast service and component

- Dynamic component loading
- Dependency injection
- Fake timers

## Testing dynamic loaded components

Find a dynamic loaded element with `screen` from Testing Library.

```ts
it('should show toast component in screen', () => {
  const service = TestBed.inject(ToastService);
  service.show('TEXT');
  expect(screen.getByText('TEXT')).toBeInTheDocument();
  discardPeriodicTasks(); // discard duration timer
});
```

## Testing with timeout

Use fake timers to simulate time-based behaviors.

```ts
it('should dismiss a toast after 3s duration by default', () => {
  const service = TestBed.inject(ToastService);
  service.show('TEXT');

  tick(2999);
  expect(screen.getByText('TEXT')).toBeVisible();
  tick(1);
  expect(screen.queryByText('TEXT')).not.toBeInTheDocument();
});
```

### Integrate `fakeAsync` APIs with jest fake timers

`jest-preset-angular` now doesn't support Angular's fake async integration in jest fake timers.

See [\[Discussion\]Support jest\.useFakeTimers and fakeAsync\(\) · Issue \#520 · thymikee/jest\-preset\-angular](https://github.com/thymikee/jest-preset-angular/issues/520)

**Workaround**

- [angular\-testing\-recipes/jest\.config\.js](https://github.com/lacolaco/angular-testing-recipes/blob/main/jest.config.js)
- [angular\-testing\-recipes/jest\-zone\.js](https://github.com/lacolaco/angular-testing-recipes/blob/main/jest/jest-zone.js)
- [angular\-testing\-recipes/zone\-jsdom\-environment\.js](https://github.com/lacolaco/angular-testing-recipes/blob/main/jest/zone-jsdom-environment.js)
