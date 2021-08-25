# API service

- Testing with HttpTestingController

## Verify no pending requests

`HttpTestingController#verify()` throws an error when pending requests are remaining.

```ts
afterEach(() => {
  httpController.verify();
});
```

## Testing request metadata

`TestRequest` object contains HTTP request metadata.

```ts
test('getRecipes() makes GET request to "/api/recipes"', () => {
  service.getRecipes();

  const req = httpController.expectOne('/api/recipes');
  expect(req.request.method).toBe('GET');
});
```

## Testing response processing

1. Set callback function to the async method.
   - DO NOT `await` at here. Because the promise will be resolved by `req.flush()` below, `await` never get back the control.
2. Flush the response.
3. Assert the callback.
   - `waitFor` from Testing Library is useful for expect async execution.

```ts
test('getRecipes() retrieves recipes from response json', async () => {
  const data = [
    { id: 1, name: 'recipe1' },
    { id: 2, name: 'recipe2' },
  ];
  const callback = jest.fn();

  service.getRecipes().then(callback);

  const req = httpController.expectOne('/api/recipes');
  req.flush({ data });

  await waitFor(() => expect(callback).toHaveBeenCalledWith(data));
});
```
