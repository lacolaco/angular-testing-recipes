import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ColorpickerComponent } from './colorpicker.component';

describe('ColorpickerComponent', () => {
  it('should show a listbox for colors', async () => {
    const { getByRole } = await render(`<app-colorpicker />`, {
      imports: [ColorpickerComponent],
    });
    expect(getByRole('listbox')).not.toBeNull();
  });

  it('should show the color options', async () => {
    const colors = ['#fff', '#eee'];
    const { getAllByRole } = await render(`<app-colorpicker [colors]="colors" />`, {
      imports: [ColorpickerComponent],
      componentProperties: { colors },
    });
    expect(getAllByRole('option').map((el) => el.title)).toEqual(colors);
  });

  it('should set selected color empty by default', async () => {
    const { queryAllByRole, getByRole } = await render(`<app-colorpicker [colors]="colors"/>`, {
      imports: [ColorpickerComponent],
      componentProperties: { colors: ['#fff', '#eee'] },
    });
    expect(queryAllByRole('option', { selected: true }).length).toBe(0);
    expect(getByRole('listbox').hasAttribute('aria-activedescendant')).toBe(false);
  });

  it('should set selected color on click a color option', async () => {
    const { getByTitle, queryAllByRole, getByRole, detectChanges } = await render(
      `<app-colorpicker [colors]="colors"/>`,
      {
        imports: [ColorpickerComponent],
        componentProperties: { colors: ['#fff', '#eee'] },
      },
    );
    getByTitle('#fff').click();
    detectChanges();
    const selectedOptions = queryAllByRole('option', { selected: true });
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0].getAttribute('title')).toBe('#fff');
    expect(getByRole('listbox').getAttribute('aria-activedescendant')).toBe(selectedOptions[0].id);
  });

  it('should set selected color from [value] input', async () => {
    const colors = ['#fff', '#eee'];
    const { getByRole, rerender } = await render(`<app-colorpicker [colors]="colors" [value]="selectedValue"/>`, {
      imports: [ColorpickerComponent],
      componentProperties: {
        colors,
        selectedValue: '#eee',
      },
    });
    expect(getByRole('option', { selected: true }).getAttribute('title')).toBe('#eee');
    await rerender({ componentProperties: { colors, selectedValue: '#fff' } });
    expect(getByRole('option', { selected: true }).getAttribute('title')).toBe('#fff');
  });

  it('should emit (valueChange) event on click a color option', async () => {
    const onChange = jasmine.createSpy();
    const { getByTitle } = await render(`<app-colorpicker [colors]="colors" (valueChange)="onChange($event)"/>`, {
      imports: [ColorpickerComponent],
      componentProperties: { colors: ['#fff', '#eee'], onChange },
    });
    getByTitle('#fff').click();

    expect(onChange).toHaveBeenCalledWith('#fff');
  });

  describe('with Angular Forms', () => {
    it('should be set value from form control', async () => {
      const formControl = new FormControl('#eee');
      const { getByRole } = await render(`<app-colorpicker [colors]="colors" [formControl]="formControl"/>`, {
        imports: [ColorpickerComponent, ReactiveFormsModule],
        componentProperties: {
          colors: ['#fff', '#eee'],
          formControl,
        },
      });
      expect(getByRole('option', { selected: true }).getAttribute('title')).toBe('#eee');
    });

    it('should pass the clicked value to form control', async () => {
      const formControl = new FormControl('#eee');
      const { getByTitle } = await render(`<app-colorpicker [colors]="colors" [formControl]="formControl"/>`, {
        imports: [ColorpickerComponent, ReactiveFormsModule],
        componentProperties: {
          colors: ['#fff', '#eee'],
          formControl,
        },
      });
      await userEvent.click(getByTitle('#fff'));
      expect(formControl.value).toBe('#fff');
    });

    it('should pass the input value to form control', async () => {
      const formControl = new FormControl('#eee');
      const colors = ['#fff', '#eee'];
      const { rerender } = await render(
        `<app-colorpicker [colors]="colors" [value]="selectedColor" [formControl]="formControl"/>`,
        {
          imports: [ColorpickerComponent, ReactiveFormsModule],
          componentProperties: {
            colors,
            formControl,
            selectedColor: null as string | null,
          },
        },
      );
      await rerender({ componentProperties: { colors, formControl, selectedColor: '#fff' } });
      expect(formControl.value).toBe('#fff');
    });
  });
});
