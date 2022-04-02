import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import DogImageListItem from '../../../src/components/lists/DogImageListItem';
import {mockedNavigate} from '../../../jest.setup';
import {shallow} from 'enzyme';
import * as Functions from '../../../src/utils/functions';

const resolved = 'file://test_cache/some_img.jpg';

jest.mock('../../../src/utils/functions');

describe('DogImageListItem', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({bookmarks: []});
  });

  it('matches snapshot', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const tree = create(<DogImageListItem uri={'foo'} idx={1} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  it('renders nothing when uri is empty', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const {toJSON} = render(<DogImageListItem />);
      expect(toJSON()).toBe(null);
    });
  });

  it('navigates to gallery when pressing on a specified button', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const {getByTestId} = render(<DogImageListItem uri={'foo'} idx={1} />);
      const btn = getByTestId('DogImageListItem_GalleryBtn');

      fireEvent(btn, 'onPress');
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it('renders two images with different top style', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const {toJSON} = render(
        <>
          <DogImageListItem uri={'foo'} idx={1} />
          <DogImageListItem uri={'bar'} idx={2} />
        </>,
      );

      expect(toJSON()[0].props.style.top).toBe(28);
      expect(toJSON()[1].props.style.top).toBe(0);
    });
  });

  it('renders component with empty box', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const wrapper = shallow(<DogImageListItem uri={'foo'} idx={1} />);
      const view = wrapper.find({testID: 'DogImageListItem_EmptyView'});

      expect(view.exists()).toBe(true);
    });
  });
});
