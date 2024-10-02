import { ComponentRef, inject, Injectable } from "@angular/core";
import { OverlayService } from "./overlay.service";
import { LoaderComponent } from "../components";

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _overlay = inject(OverlayService)
  private _loadersRefs = new Map<string, ComponentRef<LoaderComponent>>();

  /**
   * Shows a loader and saves it under a given ref name.
   *
   * @param value
   */
  public showLoader(refName: string): void {
    this._loadersRefs.set(refName, this._overlay.createComponent(LoaderComponent))
    this._overlay.setBackdrop(true);
  }

  /**
   * Hides and destroys a loader of a given ref.
   *
   * @param refName
   */
  public hideLoader(refName: string): void {
    this._overlay.setBackdrop(false)
    const ref = this._loadersRefs.get(refName);

    if(!ref) {
      throw new Error(`Could not close loader of refName ${refName}`);
    }

    ref.destroy();
    this._loadersRefs.delete(refName);
  }
}
