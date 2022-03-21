export type RootStackParamList = {
  CatalogTabs: {
    screen: string;
    params?: {
      search?: string;
    };
  };
  Gallery: {
    uri: string;
    search?: string;
  };
};
