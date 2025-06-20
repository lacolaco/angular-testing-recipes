import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type Color = string;

let nextUniqueId = 0;

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ColorpickerComponent implements ControlValueAccessor {
  private readonly cdRef = inject(ChangeDetectorRef);

  @Input()
  colors: Color[] = [];

  @Input()
  set value(newValue: Color | null) {
    this._value = newValue ?? null;

    this.onControlChange(this.value);
    this.cdRef.markForCheck();
  }

  get value(): Color | null {
    return this._value;
  }
  private _value: Color | null = null;

  @Output()
  valueChange = new EventEmitter<Color | null>();

  get id(): string {
    return this._uid;
  }

  get selectedOptionId(): string | null {
    const selectedColorIndex = this.colors.findIndex((color) => color === this.value);
    return selectedColorIndex < 0 ? null : this.getOptionId(selectedColorIndex);
  }

  private _uid = `app-colorpicker-${nextUniqueId++}`;

  constructor() {
    const ngControl = inject(NgControl, { optional: true });

    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  getOptionId(index: number) {
    return `${this.id}-option-${index}`;
  }

  onSelect(color: Color) {
    this.value = color;

    this.valueChange.emit(this.value);
    this.onControlTouched();
  }

  // CVA implementation
  private onControlChange: (value: Color | null) => void = () => {};
  private onControlTouched: () => void = () => {};

  writeValue(value: Color | null) {
    this.value = value;
  }

  registerOnChange(fn: (value: Color | null) => void) {
    this.onControlChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onControlTouched = fn;
  }
}
