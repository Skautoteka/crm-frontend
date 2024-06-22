import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class InputViewService<K> {
  private _formGroup: FormGroup | null = null;

  get group(): FormGroup {
    if(!this._formGroup) {
      throw new Error('Form group was not set!');
    }

    return this._formGroup;
  }

  get value(): K {
    return this.group.value;
  }

  get isValid(): boolean {
    return this._formGroup?.valid || false;
  }

  public setFormGroup(group: FormGroup): void {
    this._formGroup = group;
  }
}
