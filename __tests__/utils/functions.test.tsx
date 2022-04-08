import React from 'react';
import {render, act} from '@testing-library/react-native';
import {notificationRef} from '../../src/utils/constants';
import * as Functions from '../../src/utils/functions';
import Notifications from '../../src/components/Notifications';
import {Linking} from 'react-native';
import {downloadFile, exists} from 'react-native-fs';
import Share, {Social} from 'react-native-share';
import {mockedPromise} from '../../jest.setup';

const URI_LABRADOR =
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg';
const URI_GOLDEN =
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg';
const URI_PYRENEES =
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg';

const LIST = {
  labrador: [],
  retriever: ['chesapeake', 'curly', 'flatcoated', 'golden'],
};

describe('flatTree', () => {
  let arr: string[];

  beforeEach(() => {
    arr = [];
  });

  it('returns empty array', () => {
    arr = Functions.flatTree({});

    expect(arr.length).toBe(0);
  });

  it('returns array with values from array', () => {
    arr = Functions.flatTree({
      foo: [],
      bar: ['bar'],
      baz: ['baz', 1, null, undefined, {}],
      zoo: undefined,
      o: {},
    });

    expect(arr.length).toBeGreaterThan(0);
    expect(arr).toMatchObject(['foo', 'bar-bar', 'baz-baz']);
  });
});

describe('findBreedInList', () => {
  let arr: string[];

  beforeAll(() => {
    arr = Functions.flatTree(LIST);
  });

  it('returns empty result if not found', () => {
    const empty = Functions.findBreedInList(arr, 'Pug');

    expect(empty).toMatchObject([]);
  });

  it('returns empty result if not found (two words)', () => {
    const empty = Functions.findBreedInList(arr, 'Standard Poodle');

    expect(empty).toMatchObject([]);
  });

  it('returns result', () => {
    const res = Functions.findBreedInList(arr, 'Labrador');

    expect(res).toBe('labrador');
  });

  it('returns result (two words)', () => {
    const res = Functions.findBreedInList(arr, 'Golden Retriever');

    expect(res).toBe('retriever-golden');
  });
});

describe('parseImage', () => {
  it('is not working with empty string', () => {
    const emptyString = Functions.parseImage('');
    expect(emptyString).toBe('');

    const emptyOther = Functions.parseImage(2);
    expect(emptyOther).toBe('');
  });

  it('works correctly', () => {
    const img = Functions.parseImage(URI_LABRADOR);

    expect(img).toBe('n02099712_5648.jpg');
  });
});

describe('getBreed', () => {
  it('is not working with empty string', () => {
    const emptyString = Functions.getBreed('');
    expect(emptyString).toBe('');

    const emptyOther = Functions.getBreed(2);
    expect(emptyOther).toBe('');
  });

  it('works correctly (with hyphen)', () => {
    const res = Functions.getBreed(URI_GOLDEN);

    expect(res).toBe('retrievers');
  });

  it('works correctly (without hyphen)', () => {
    const res = Functions.getBreed(URI_LABRADOR);
    expect(res).toBe('labradors');
  });

  it('works correctly (without hyphen)', () => {
    const res = Functions.getBreed(URI_LABRADOR);
    expect(res).toBe('labradors');
  });

  it('works correctly (with ees)', () => {
    const res = Functions.getBreed(URI_PYRENEES);
    expect(res).toBe('pyrenees');
  });
});

describe('parseDog', () => {
  it('is not transforming any other type but string', () => {
    const emptyString = Functions.parseDog('');
    expect(emptyString).toBe('');

    const emptyOther = Functions.parseDog(2);
    expect(emptyOther).toBe('');
  });

  it('transforms single word', () => {
    const dog = Functions.parseDog('labrador');
    expect(dog).toBe('Labrador');
  });

  it('transforms multiple words', () => {
    const dog = Functions.parseDog('golden-retriever');
    expect(dog).toBe('Golden Retriever');
  });
});

describe('shareImage', () => {
  it('is not working with any other type but string or emprty strings', async () => {
    const data = await Functions.shareImage('', '');
    expect(data).toBe(false);
  });

  it('breaks on default', async () => {
    const data = await Functions.shareImage('foo', '');
    expect(data).toBe(true);
  });

  it('works with CopyLink', async () => {
    render(<Notifications ref={notificationRef} />);
    const spy = jest.spyOn(notificationRef.current, 'show');

    await act(async () => {
      const data = await Functions.shareImage('foo', 'CopyLink');

      expect(spy).toHaveBeenCalled();
      expect(data).toBe(true);
    });
  });

  it('works with MsgApp', async () => {
    const data = await Functions.shareImage('foo', 'MsgApp');

    expect(data).toBe(true);
  });

  it('works with MsgApp (if uses rn-share)', async () => {
    Linking.canOpenURL.mockImplementationOnce(() => Promise.resolve(false));

    const data = await Functions.shareImage('foo', 'MsgApp');

    expect(data).toBe(true);
  });

  it('works with TelegramApp', async () => {
    Linking.openURL.mockImplementationOnce(() => Promise.resolve(true));

    const data = await Functions.shareImage('foo', 'TelegramApp');
    expect(data).toBe(true);
  });

  it('works with TelegramApp (failure case)', async () => {
    Linking.openURL.mockImplementationOnce(() => Promise.reject('error'));

    const data = await Functions.shareImage('foo', 'TelegramApp');
    expect(data).toBe(true);
  });

  it('works with MailApp', async () => {
    const data = await Functions.shareImage('foo', 'MailApp');

    expect(data).toBe(true);
  });

  it('works with FacebookApp', async () => {
    const data = await Functions.shareImage('foo', 'FacebookApp');

    expect(data).toBe(true);
  });

  it('works with Instagram', async () => {
    const data = await Functions.shareImage('foo', 'InstagramApp');

    expect(data).toBe(true);
  });

  it('throws an error if app is not supported/installed', async () => {
    Linking.canOpenURL.mockImplementationOnce(() => Promise.reject());
    const data = await Functions.shareImage('foo', 'InstagramApp').catch(err =>
      expect(err).toBe(err),
    );
  });
});

describe('checkImageCache', () => {
  it('works correctly if file exists', async () => {
    exists.mockImplementationOnce(() => Promise.resolve(true));

    const data = await Functions.checkImageCache('foo.jpg');
    expect(data).toBe('test_cache/ZNg1gt.jpg');
  });

  it('throws an error if something is wrong', async () => {
    await Functions.checkImageCache('foo.jpg').catch(err =>
      expect(typeof err).toBe('object'),
    );
  });
});
