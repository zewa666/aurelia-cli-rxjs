import { Observable } from 'rxjs/Observable';

export interface IAsyncBindingBehaviorOptions {
  property: string;
  error: (res: any) => void;
  completed: () => void;
}

export class asyncBindingBehavior {

  getPropByPath(obj, keyPath) {
    return keyPath
      .split(".")
      .reduce((prev, curr) => prev[curr], obj);
  }

  bind(binding, source, options: IAsyncBindingBehaviorOptions) {
    binding.originalupdateTarget = binding.updateTarget;
    binding.updateTarget = (a) => {
      if (typeof a.then === 'function') {
        a.then(d => { binding.originalupdateTarget(d); });
      } else if (a instanceof Observable) {
        binding._subscription = a.subscribe(
          (res) => {
            binding.originalupdateTarget(options && options.property ? this.getPropByPath(res, options.property) : res);
          },
          options ? options.error : undefined,
          options ? options.completed : undefined
        );
      }
      else
        binding.originalupdateTarget(a);
    };
  }

  unbind(binding) {
    binding.updateTarget = binding.originalupdateTarget;
    binding.originalupdateTarget = null;

    if (binding._subscription &&
      typeof binding._subscription.unsubscribe === 'function') {
      binding._subscription.unsubscribe();
    }
  }
}
