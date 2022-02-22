import {Icon} from 'react-native-vector-icons/Icon';
import BookmarksScreen from '../Catalog/BookmarksScreen';
import CatalogScreen from '../Catalog/CatalogScreen';

export const tabs = [
  {
    name: 'Catalog',
    component: CatalogScreen,
    icon: {
      activeName: 'image',
      defaultName: 'image-outline',
      type: 'ionicon',
      size: 28,
    },
  },
  {
    name: 'Bookmarks',
    component: BookmarksScreen,
    icon: {
      activeName: 'bookmarks',
      defaultName: 'bookmarks-outline',
      type: 'ionicon',
      size: 21,
    },
  },
  // {
  //   name: 'Bookmarks-2',
  //   component: CatalogScreen,
  //   icon: {
  //     activeName: 'bookmarks',
  //     defaultName: 'bookmarks-outline',
  //     type: 'ionicon',
  //     size: 21,
  //   },
  // },
  // {
  //   name: 'Bookmarks-3',
  //   component: CatalogScreen,
  //   icon: {
  //     activeName: 'bookmarks',
  //     defaultName: 'bookmarks-outline',
  //     type: 'ionicon',
  //     size: 21,
  //   },
  // },
];
