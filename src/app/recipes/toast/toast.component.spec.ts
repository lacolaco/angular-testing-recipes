import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { render } from '@testing-library/angular';
import { ToastComponent, ToastContext } from './toast.component';

describe('ToastComponent', () => {
  it('should render given message from context', async () => {
    const { container } = await render(ToastComponent, {
      imports: [NoopAnimationsModule],
      providers: [{ provide: ToastContext, useValue: new ToastContext('TEXT') }],
    });

    expect(container).toHaveTextContent('TEXT');
  });
});
