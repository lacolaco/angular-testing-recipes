import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { ColorpickerModule } from './colorpicker.module';

describe('ColorpickerComponent', () => {
  it('should show a listbox for colors', async () => {
    const { getByRole } = await render(`<app-colorpicker></app-colorpicker>`, {
      imports: [ColorpickerModule],
    });
    expect(getByRole('listbox')).toBeInTheDocument();
  });

  it('should show the color options', async () => {
    const colors = ['#fff', '#eee'];
    const { getAllByRole } = await render(
      `<app-colorpicker [colors]="colors"></app-colorpicker>`,
      {
        imports: [ColorpickerModule],
        componentProperties: { colors },
      },
    );
    expect(getAllByRole('option').map((el) => el.title)).toEqual(colors);
  });

  it('should set selected color empty by default', async () => {
    const { queryAllByRole, getByRole } = await render(
      `<app-colorpicker [colors]="colors"></app-colorpicker>`,
      {
        imports: [ColorpickerModule],
        componentProperties: { colors: ['#fff', '#eee'] },
      },
    );
    expect(queryAllByRole('option', { selected: true }).length).toBe(0);
    expect(getByRole('listbox')).not.toHaveAttribute('aria-activedescendant');
  });

  it('should set selected color on click a color option', async () => {
    const { getByTitle, queryAllByRole, getByRole, detectChanges } =
      await render(`<app-colorpicker [colors]="colors"></app-colorpicker>`, {
        imports: [ColorpickerModule],
        componentProperties: { colors: ['#fff', '#eee'] },
      });
    getByTitle('#fff').click();
    detectChanges();
    const selectedOptions = queryAllByRole('option', { selected: true });
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0]).toHaveAttribute('title', '#fff');
    expect(getByRole('listbox')).toHaveAttribute(
      'aria-activedescendant',
      selectedOptions[0].id,
    );
  });

  it('should set selected color from [value] input', async () => {
    const { getByRole, change } = await render(
      `<app-colorpicker [colors]="colors" [value]="selectedValue"></app-colorpicker>`,
      {
        imports: [ColorpickerModule],
        componentProperties: {
          colors: ['#fff', '#eee'],
          selectedValue: '#eee',
        },
      },
    );
    expect(getByRole('option', { selected: true })).toHaveAttribute(
      'title',
      '#eee',
    );
    change({ selectedValue: '#fff' });
    expect(getByRole('option', { selected: true })).toHaveAttribute(
      'title',
      '#fff',
    );
  });

  it('should emit (valueChange) event on click a color option', async () => {
    const onChange = jasmine.createSpy();
    const { getByTitle } = await render(
      `<app-colorpicker [colors]="colors" (valueChange)="onChange($event)"></app-colorpicker>`,
      {
        imports: [ColorpickerModule],
        componentProperties: { colors: ['#fff', '#eee'], onChange },
      },
    );
    getByTitle('#fff').click();

    expect(onChange).toHaveBeenCalledWith('#fff');
  });

  describe('with Angular Forms', () => {
    it('should be set value from form control', async () => {
      const formControl = new FormControl('#eee');
      const { getByRole } = await render(
        `<app-colorpicker [colors]="colors" [formControl]="formControl"></app-colorpicker>`,
        {
          imports: [ColorpickerModule, ReactiveFormsModule],
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
          imports: [ColorpickerModule, ReactiveFormsModule],
          componentProperties: {
            colors: ['#fff', '#eee'],
            formControl,
          },
        },
      );
      getByTitle('#fff').click();
      expect(formControl.value).toBe('#fff');
    });

    it('should pass the input value to form control', async () => {
      const formControl = new FormControl('#eee');
      const { change } = await render(
        `<app-colorpicker [colors]="colors" [value]="selectedColor" [formControl]="formControl"></app-colorpicker>`,
        {
          imports: [ColorpickerModule, ReactiveFormsModule],
          componentProperties: {
            colors: ['#fff', '#eee'],
            selectedColor: null as string | null,
            formControl,
          },
        },
      );
      change({ selectedColor: '#fff' });
      expect(formControl.value).toBe('#fff');
    });
  });
});
