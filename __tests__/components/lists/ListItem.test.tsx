import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import DogImageListItem from '../../../src/components/lists/ListItem';
import {useNavigation} from '@react-navigation/native';
import {mockedNavigate} from '../../../jest.setup';
import {checkImageCache} from '../../../src/utils/functions';
import {shallow} from 'enzyme';

describe('ListItem', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({bookmarks: []});
  });

  it('matches snapshot', () => {
    const tree = create(<DogImageListItem uri={'foo'} idx={1} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders nothing when uri is empty', () => {
    // useSelector.mockReturnValueOnce({bookmarks: []});

    const {toJSON} = render(<DogImageListItem />);
    expect(toJSON()).toBe(null);
  });

  it('navigates to gallery when pressing on a specified button', () => {
    // useSelector.mockReturnValueOnce({bookmarks: []});

    const {getByTestId} = render(<DogImageListItem uri={'foo'} idx={1} />);
    const btn = getByTestId('DogImageListItem_GalleryBtn');

    fireEvent(btn, 'onPress');
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  it('renders two images with different top style', () => {
    const {toJSON} = render(
      <>
        <DogImageListItem uri={'foo'} idx={1} />
        <DogImageListItem uri={'bar'} idx={2} />
      </>,
    );

    expect(toJSON()[0].props.style.top).toBe(28);
    expect(toJSON()[1].props.style.top).toBe(0);
  });

  it('renders component with empty box', () => {
    const wrapper = shallow(<DogImageListItem uri={'foo'} idx={1} />);
    const view = wrapper.find({testID: 'DogImageListItem_EmptyView'});

    expect(view.exists()).toBe(true);
  });
});
