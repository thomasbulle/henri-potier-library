export default {
  app: {
    locales: ["fr", "en"],
    responsiveSizes: {
      xs: 375,
      s: 840,
      m: 1200
    }
  },
  cartItemsTable: {
    columns: {
      desktop: ["name", "price", "quantity", "actions"],
      mobile: ["description"]
    }
  }
};
