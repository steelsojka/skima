// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type ValidationError from '../../ValidationError';
import type { TypeSubClass } from '../../Type';

export default class AnyTypeCheck extends Condition {
  constructor() {
    super();

    this.priority = 100;
  }

  typeCheck(): boolean {
    return true;
  }

  castFailError(value: any, type: string, state: ValidationState): ValidationError {
    return this.reject(`Can not cast value ${value} to type`, state);
  }

  validate(value: any, state: ValidationState, type: TypeSubClass): Error|void {
    if (type.isEmptyValue(value, state)) {
      return;
    }

    if (!this.typeCheck(value, state)) {
      return this.reject(`Value must be a ${this.typeName}.`, state);
    }
  }
};
