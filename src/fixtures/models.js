// Expected responses for Models API endpoints

export const expectedGetModelsResponse = {
  status: "ok",
  data: [
    {
      id: 1,
      carBrandId: 1,
      title: "TT"
    },
    {
      id: 2,
      carBrandId: 1,
      title: "R8"
    },
    {
      id: 3,
      carBrandId: 1,
      title: "Q7"
    },
    {
      id: 4,
      carBrandId: 2,
      title: "3 Series"
    },
    {
      id: 5,
      carBrandId: 2,
      title: "5 Series"
    },
    {
      id: 6,
      carBrandId: 2,
      title: "X5"
    },
    {
      id: 7,
      carBrandId: 2,
      title: "X6"
    },
    {
      id: 8,
      carBrandId: 3,
      title: "Fiesta"
    },
    {
      id: 9,
      carBrandId: 3,
      title: "Focus"
    },
    {
      id: 10,
      carBrandId: 3,
      title: "Fusion"
    },
    {
      id: 11,
      carBrandId: 3,
      title: "Mondeo"
    },
    {
      id: 12,
      carBrandId: 3,
      title: "Sierra"
    },
    {
      id: 13,
      carBrandId: 4,
      title: "911"
    },
    {
      id: 14,
      carBrandId: 4,
      title: "Cayenne"
    },
    {
      id: 15,
      carBrandId: 4,
      title: "Panamera"
    },
    {
      id: 16,
      carBrandId: 5,
      title: "Palio"
    },
    {
      id: 17,
      carBrandId: 5,
      title: "Ducato"
    },
    {
      id: 18,
      carBrandId: 5,
      title: "Panda"
    },
    {
      id: 19,
      carBrandId: 5,
      title: "Punto"
    },
    {
      id: 20,
      carBrandId: 5,
      title: "Scudo"
    }
  ]
};

// Expected response for GET /models/:id (example for TT)
export const expectedGetModelByIdResponse = {
  status: "ok",
  data: {
    id: 1,
    carBrandId: 1,
    title: "TT"
  }
};

// Schema for validating any model object structure
export const modelSchema = {
  id: expect.any(Number),
  carBrandId: expect.any(Number),
  title: expect.any(String)
};

