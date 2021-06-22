# Button component

- Attribute selector component
- Query by ARIA role
- Dynamic classes

## Testing with ARIA roles

Find the button by using ARIA role query.

```ts
it('should render a button with content', async () => {
  const { getByRole } = await render(`<button app-button>TEXT</button>`, {
    declarations: [ButtonComponent],
  });

  expect(getByRole('button', { name: 'TEXT' })).toBeInTheDocument();
});
```

## Testing dynamic classes

Use `toHaveClass` matcher to assert classes on the element.

```ts
it('should render a stroked button', async () => {
  const { getByRole } = await render(
    `<button app-button appearance="stroked">TEXT</button>`,
    { declarations: [ButtonComponent] },
  );

  expect(getByRole('button', { name: 'TEXT' })).toHaveClass(
    'app-button-stroked',
  );
});
```
