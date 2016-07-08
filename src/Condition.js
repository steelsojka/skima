// @flow

import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';

import type Type from './Type';
import type ValidationState from './ValidationState';

export type ConditionSubClass = Class<$Subtype<Condition>>;

export default class Condition {
  priority: number;
  multiples: boolean;

  constructor() {
    defaults(this, {
      priority: 0,
      multiples: false
    });
  }

  validate(value: any, state: ValidationState): boolean {
    return true;
  }

  sanitize(value: any, state: ValidationState): any {
    return value;
  }

  install(name: string, initType: Type): void {
    initType.conditions.set(name, this);
  }

  getReturnValue(type: Type): any {
    return type;
  }

  resolveValue(value: any, ...args: any[]) {
    if (isFunction(value)) {
      return value(...args);
    }

    return value;
  }

  modifyState() {}
}
