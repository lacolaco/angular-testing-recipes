import { ChangeDetectionStrategy, Component, computed, effect, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Color = string;

let nextUniqueId = 0;

@Component({
  selector: 'app-colorpicker',
  template: `
    <div role="listbox" [attr.aria-activedescendant]="selectedOptionId() ?? null">
      @for (color of colors(); track color; let index = $index) {
        <div
          #option
          role="option"
          style="border-radius: 4px; height: 16px; width: 16px"
          [style.background-color]="color"
          [attr.tab-index]="0"
          [attr.id]="getOptionId(index)"
          [title]="color"
          (click)="onSelect(color)"
          [attr.aria-selected]="color === value() ? 'true' : 'false'"
        ></div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ColorpickerComponent, multi: true }],
})
export class ColorpickerComponent implements ControlValueAccessor {
  readonly colors = input<Color[]>([]);

  readonly value = model<Color | null>(null);

  get id(): string {
    return this._uid;
  }
  private _uid = `app-colorpicker-${nextUniqueId++}`;

  readonly selectedOptionId = computed(() => {
    const selectedColorIndex = this.colors().findIndex((color) => color === this.value());
    return selectedColorIndex < 0 ? null : this.getOptionId(selectedColorIndex);
  });

  constructor() {
    effect(() => {
      this.onControlChange(this.value());
    });
  }

  getOptionId(index: number) {
    return `${this.id}-option-${index}`;
  }

  onSelect(color: Color) {
    this.value.set(color);
    this.onControlTouched();
  }

  // CVA implementation
  private onControlChange: (value: Color | null) => void = () => {};
  private onControlTouched: () => void = () => {};

  writeValue(value: Color | null) {
    this.value.set(value);
  }

  registerOnChange(fn: (value: Color | null) => void) {
    this.onControlChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onControlTouched = fn;
  }
}
