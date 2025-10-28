// Brand IDs
export const BRAND_IDS = {
  AUDI: 1,
  BMW: 2,
  FORD: 3,
  PORSCHE: 4,
  FIAT: 5
};

// Individual brand objects
export const BRANDS = {
  AUDI: {
    id: BRAND_IDS.AUDI,
    title: "Audi",
    logoFilename: "audi.png"
  },
  BMW: {
    id: BRAND_IDS.BMW,
    title: "BMW",
    logoFilename: "bmw.png"
  },
  FORD: {
    id: BRAND_IDS.FORD,
    title: "Ford",
    logoFilename: "ford.png"
  },
  PORSCHE: {
    id: BRAND_IDS.PORSCHE,
    title: "Porsche",
    logoFilename: "porsche.png"
  },
  FIAT: {
    id: BRAND_IDS.FIAT,
    title: "Fiat",
    logoFilename: "fiat.png"
  }
};

// Expected responses for Brands API endpoints
export const expectedGetBrandsResponse = {
  status: "ok",
  data: [
    BRANDS.AUDI,
    BRANDS.BMW,
    BRANDS.FORD,
    BRANDS.PORSCHE,
    BRANDS.FIAT
  ]
};
