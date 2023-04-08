# Colorpicker component

- Component DOM Testing
- Click event handling
- WAI-ARIA attributes
- Angular Forms integration

## Testing with Angular Forms

```ts
it('should be set value from form control', async () => {
  const formControl = new FormControl('#eee');
  const { getByRole } = await render(
    `<app-colorpicker [colors]="colors" [formControl]="formControl"></app-colorpicker>`,
    {
      imports: [ColorpickerComponent, ReactiveFormsModule],
      componentProperties: {
        colors: ['#fff', '#eee'],
        formControl,
      },
    },
  );
  expect(getByRole('option', { selected: true })).toHaveAttribute(
    'title',
    '#eee',
  );
});

it('should pass the clicked value to form control', async () => {
  const formControl = new FormControl('#eee');
  const { getByTitle } = await render(
    `<app-colorpicker [colors]="colors" [formControl]="formControl"></app-colorpicker>`,
    {
      imports: [ColorpickerComponent, ReactiveFormsModule],
      componentProperties: {
        colors: ['#fff', '#eee'],
        formControl,
      },
    },
  );
  getByTitle('#fff').click();
  expect(formControl.value).toBe('#fff');
});
```
