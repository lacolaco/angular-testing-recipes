import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastComponent, NoopAnimationsModule],
    });
  });

  describe('.show()', () => {
    it('should show toast component in screen', fakeAsync(() => {
      const service = TestBed.inject(ToastService);
      service.show('TEXT');
      expect(screen.getByText('TEXT')).toBeInTheDocument();
      discardPeriodicTasks(); // discard duration timer
    }));

    it('should dismiss a toast after 3s duration by default', fakeAsync(() => {
      const service = TestBed.inject(ToastService);
      service.show('TEXT');

      tick(2999);
      expect(screen.getByText('TEXT')).toBeVisible();
      tick(1);
      expect(screen.queryByText('TEXT')).not.toBeInTheDocument();
    }));

    it('should use given duration time', fakeAsync(() => {
      const service = TestBed.inject(ToastService);
      service.show('TEXT', { durationMs: 5000 });
      expect(screen.getByText('TEXT')).toBeInTheDocument();

      tick(4999);
      expect(screen.getByText('TEXT')).toBeInTheDocument();
      tick(1);
      expect(screen.queryByText('TEXT')).not.toBeInTheDocument();
    }));
  });

  describe('.hide()', () => {
    it('should do nothing if no toast open', async () => {
      const service = TestBed.inject(ToastService);
      expect(() => service.hide()).not.toThrow();
    });

    it('should dismiss opened toast immediately', async () => {
      const service = TestBed.inject(ToastService);
      service.show('TEXT');
      expect(screen.getByText('TEXT')).toBeInTheDocument();
      service.hide();
      expect(screen.queryByText('TEXT')).not.toBeInTheDocument();
    });
  });
});
