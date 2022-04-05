export type RootStackParamList = {
  CatalogTabs: {
    search?: string;
  };
  Search: {
    search?: string;
  };
  Gallery: {
    uri: string;
    img: string;
    size: {
      w: number;
      h: number;
    };
    search?: string;
  };
};
