import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { SpinnerComponent } from "../../main-app/layout/spinner/spinner.component";

@Injectable({ providedIn: "root" })
export class SpinnerService {
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  showSpinner(): void {
    if (this.overlayRef == null || !this.overlayRef.hasAttached()) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
      const injector = Injector.create({
        parent: this.parentInjector,
        providers: [],
      });
      const spinnerPortal = new ComponentPortal(
        SpinnerComponent,
        null,
        injector
      );
      this.overlayRef.attach(spinnerPortal);
    }
  }

  hideSpinner(): void {
    if (this.overlayRef != null && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }
}
