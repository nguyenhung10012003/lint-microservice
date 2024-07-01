export function TransformToArray() {
  return function (target: any, key: string) {
    let value = target[key];

    // Getter function to retrieve the transformed array
    const getter = function () {
      if (!value) return value;
      return Array.isArray(value) ? value : [value];
    };

    // Setter function to set the value ensuring it's always an array
    const setter = function (newValue: any) {
      value = Array.isArray(newValue) || !newValue ? newValue : [newValue];
    };

    // Define the property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
