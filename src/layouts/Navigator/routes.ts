export type RootStackParamList = {
  CatalogTabs: {
    search?: string;
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
};
