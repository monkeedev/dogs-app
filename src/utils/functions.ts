export const flatTree = (o: any): string[] => {
  const _o = Object.assign({}, o);
  const keys = Object.keys(_o);

  for (let k in _o) {
    if (_o[k].length > 0) {
      let a = _o[k].map((i: string) => `${i}-${k}`);
      let idx = keys.indexOf(k);

      keys.splice(idx, 1, ...a);
    }
  }

  return keys;
};
