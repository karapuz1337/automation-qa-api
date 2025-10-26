// Expected responses for Brands API endpoints

export const expectedGetBrandsResponse = {
  status: "ok",
  data: [
    {
      id: 1,
      title: "Audi",
      logoFilename: "audi.png"
    },
    {
      id: 2,
      title: "BMW",
      logoFilename: "bmw.png"
    },
    {
      id: 3,
      title: "Ford",
      logoFilename: "ford.png"
    },
    {
      id: 4,
      title: "Porsche",
      logoFilename: "porsche.png"
    },
    {
      id: 5,
      title: "Fiat",
      logoFilename: "fiat.png"
    }
  ]
};

// Expected response for GET /brands/:id (example for BMW)
export const expectedGetBrandByIdResponse = {
  status: "ok",
  data: {
    id: 2,
    title: "BMW",
    logoFilename: "bmw.png"
  }
};

// Schema for validating any brand object structure
export const brandSchema = {
  id: expect.any(Number),
  title: expect.any(String),
  logoFilename: expect.any(String)
};

