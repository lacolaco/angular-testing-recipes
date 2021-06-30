# Toast service and component

- Dynamic component loading
- Dependency injection
- Fake Async

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

## Testing with `fakeAsync`

Use fake timers to simulate time-based behaviors.

```ts
it('should dismiss a toast after 3s duration by default', fakeAsync(() => {
  const service = TestBed.inject(ToastService);
  service.show('TEXT');

  tick(2999);
  expect(screen.getByText('TEXT')).toBeVisible();
  tick(1);
  expect(screen.queryByText('TEXT')).not.toBeInTheDocument();
}));
```
