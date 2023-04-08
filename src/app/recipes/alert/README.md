# Alert component

- User interaction (click)
- Component output

## Testing with click event

Get a button reference and call `userEvent.click()`.
Wait for disappearing the element.

```ts
import userEvent from '@testing-library/user-event';

it('should dismiss after close button click', async () => {
  const { getByRole, queryByRole } = await render(
    `<app-alert dismissible>TEXT</app-alert>`,
    { imports: [AlertComponent] },
  );
  await userEvent.click(getByRole('button', { name: /Close/i }));

  await waitFor(() => {
    expect(queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});
```

## Testing component outputs

Listen the output with spied function from `jest.fn()`.

```ts
it('should emit (closed) event', async () => {
  const onClosed = jest.fn();
  const { getByRole } = await render(
    `<app-alert dismissible (closed)="onClosed($event)">TEXT</app-alert>`,
    {
      imports: [AlertComponent],
      componentProperties: { onClosed },
    },
  );
  await userEvent.click(getByRole('button', { name: /Close/i }));

  expect(onClosed).toHaveBeenCalled();
});
```
