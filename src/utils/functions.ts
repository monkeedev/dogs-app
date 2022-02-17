export const flatTree = (o: any): string[] => {
  const _o = Object.assign({}, o);
  const keys = Object.keys(_o);

  for (let k in _o) {
    if (_o[k].length > 0) {
      let a = _o[k].map((i: string) => `${k}-${i}`);

      let idx = keys.indexOf(k);

      keys.splice(idx, 1, ...a);
    }
  }

  return keys;
};

export const findBreedInList = (list: string[], breed: string) => {
  const _arr = JSON.parse(JSON.stringify(list));
  const splitted = breed.toLowerCase().split(' ');

  if (
    _arr.indexOf(splitted.join('-')) !== -1 ||
    _arr.indexOf(splitted.reverse().join('-')) !== -1
  ) {
    const normal = _arr.indexOf(splitted.join('-'));
    const reversed = _arr.indexOf(splitted.reverse().join('-'));

    return normal !== -1 ? _arr[normal] : _arr[reversed];
  } else {
    const res = _arr.filter(w => {
      return splitted.filter(i => w.match(i)).length > 0;
    });

    return res.length === 0 ? [] : res.length === 1 ? res[0] : breed;
  }
};

export const parseImage = (s: string) => {
  const fromBreed = s.slice(s.indexOf('breeds'));
  const arr = fromBreed.split('/');

  return `${arr[1]}-${arr[2]}`;
};
