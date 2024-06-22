import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class InputViewService {
  private _formGroup: FormGroup | null = null;

  get group(): FormGroup {
    if(!this._formGroup) {
      throw new Error('Form group was not set!');
    }

    return this._formGroup;
  }

  public setFormGroup(group: FormGroup): void {
    this._formGroup = group;
  }
}
