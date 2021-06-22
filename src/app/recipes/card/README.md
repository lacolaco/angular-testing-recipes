# Card component

- Component DOM Testing

## Testing projected text content

```ts
it('should show text content', async () => {
  const { getByText } = await render(`<app-card>TEXT</app-card>`, {
    declarations: [CardComponent],
  });

  const card = getByText('TEXT');
  expect(card).toBeInTheDocument();
});
```
