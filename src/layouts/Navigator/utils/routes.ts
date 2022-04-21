export type RootStackParamList = {
  CatalogTabs: {
    search?: string;
    refresh?: boolean;
  };
  Search: {
    search?: string;
  };
  User: {};
  Gallery: {
    uri: string;
    img: string;
    size: {
      w: number;
      h: number;
    };
    isConnected?: string;
    search?: string;
  };
  Login: {};
};
