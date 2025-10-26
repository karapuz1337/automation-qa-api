import { BRAND_IDS } from "./brands.js";

// Model IDs
export const MODEL_IDS = {
  // Audi models
  AUDI_TT: 1,
  AUDI_R8: 2,
  AUDI_Q7: 3,
  AUDI_A6: 4,
  AUDI_A8: 5,

  // BMW models
  BMW_3: 6,
  BMW_5: 7,
  BMW_X5: 8,
  BMW_X6: 9,
  BMW_Z3: 10,

  // Ford models
  FORD_FIESTA: 11,
  FORD_FOCUS: 12,
  FORD_FUSION: 13,
  FORD_MONDEO: 14,
  FORD_SIERRA: 15,

  // Porsche models
  PORSCHE_911: 16,
  PORSCHE_CAYENNE: 17,
  PORSCHE_PANAMERA: 18,

  // Fiat models
  FIAT_PALIO: 19,
  FIAT_DUCATO: 20,
  FIAT_PANDA: 21,
  FIAT_PUNTO: 22,
  FIAT_SCUDO: 23
};

// Individual model objects
export const MODELS = {
  // Audi models
  AUDI_TT: { id: MODEL_IDS.AUDI_TT, carBrandId: BRAND_IDS.AUDI, title: "TT" },
  AUDI_R8: { id: MODEL_IDS.AUDI_R8, carBrandId: BRAND_IDS.AUDI, title: "R8" },
  AUDI_Q7: { id: MODEL_IDS.AUDI_Q7, carBrandId: BRAND_IDS.AUDI, title: "Q7" },
  AUDI_A6: { id: MODEL_IDS.AUDI_A6, carBrandId: BRAND_IDS.AUDI, title: "A6" },
  AUDI_A8: { id: MODEL_IDS.AUDI_A8, carBrandId: BRAND_IDS.AUDI, title: "A8" },

  // BMW models
  BMW_3:  { id: MODEL_IDS.BMW_3,  carBrandId: BRAND_IDS.BMW, title: "3" },
  BMW_5:  { id: MODEL_IDS.BMW_5,  carBrandId: BRAND_IDS.BMW, title: "5" },
  BMW_X5: { id: MODEL_IDS.BMW_X5, carBrandId: BRAND_IDS.BMW, title: "X5" },
  BMW_X6: { id: MODEL_IDS.BMW_X6, carBrandId: BRAND_IDS.BMW, title: "X6" },
  BMW_Z3: { id: MODEL_IDS.BMW_Z3, carBrandId: BRAND_IDS.BMW, title: "Z3" },

  // Ford models
  FORD_FIESTA: { id: MODEL_IDS.FORD_FIESTA, carBrandId: BRAND_IDS.FORD, title: "Fiesta" },
  FORD_FOCUS:  { id: MODEL_IDS.FORD_FOCUS,  carBrandId: BRAND_IDS.FORD, title: "Focus" },
  FORD_FUSION: { id: MODEL_IDS.FORD_FUSION, carBrandId: BRAND_IDS.FORD, title: "Fusion" },
  FORD_MONDEO: { id: MODEL_IDS.FORD_MONDEO, carBrandId: BRAND_IDS.FORD, title: "Mondeo" },
  FORD_SIERRA: { id: MODEL_IDS.FORD_SIERRA, carBrandId: BRAND_IDS.FORD, title: "Sierra" },

  // Porsche models
  PORSCHE_911:     { id: MODEL_IDS.PORSCHE_911,     carBrandId: BRAND_IDS.PORSCHE, title: "911" },
  PORSCHE_CAYENNE: { id: MODEL_IDS.PORSCHE_CAYENNE, carBrandId: BRAND_IDS.PORSCHE, title: "Cayenne" },
  PORSCHE_PANAMERA:{ id: MODEL_IDS.PORSCHE_PANAMERA,carBrandId: BRAND_IDS.PORSCHE, title: "Panamera" },

  // Fiat models
  FIAT_PALIO:  { id: MODEL_IDS.FIAT_PALIO,  carBrandId: BRAND_IDS.FIAT, title: "Palio" },
  FIAT_DUCATO: { id: MODEL_IDS.FIAT_DUCATO, carBrandId: BRAND_IDS.FIAT, title: "Ducato" },
  FIAT_PANDA:  { id: MODEL_IDS.FIAT_PANDA,  carBrandId: BRAND_IDS.FIAT, title: "Panda" },
  FIAT_PUNTO:  { id: MODEL_IDS.FIAT_PUNTO,  carBrandId: BRAND_IDS.FIAT, title: "Punto" },
  FIAT_SCUDO:  { id: MODEL_IDS.FIAT_SCUDO,  carBrandId: BRAND_IDS.FIAT, title: "Scudo" }
};

// Models grouped by brand (useful for testing)
export const MODELS_BY_BRAND = {
  AUDI: [
    MODELS.AUDI_TT,
    MODELS.AUDI_R8,
    MODELS.AUDI_Q7,
    MODELS.AUDI_A6,
    MODELS.AUDI_A8
  ],
  BMW: [
    MODELS.BMW_3,
    MODELS.BMW_5,
    MODELS.BMW_X5,
    MODELS.BMW_X6,
    MODELS.BMW_Z3
  ],
  FORD: [
    MODELS.FORD_FIESTA,
    MODELS.FORD_FOCUS,
    MODELS.FORD_FUSION,
    MODELS.FORD_MONDEO,
    MODELS.FORD_SIERRA
  ],
  PORSCHE: [
    MODELS.PORSCHE_911,
    MODELS.PORSCHE_CAYENNE,
    MODELS.PORSCHE_PANAMERA
  ],
  FIAT: [
    MODELS.FIAT_PALIO,
    MODELS.FIAT_DUCATO,
    MODELS.FIAT_PANDA,
    MODELS.FIAT_PUNTO,
    MODELS.FIAT_SCUDO
  ]
};

// Expected response for GET /models
export const expectedGetModelsResponse = {
  status: "ok",
  data: [
    ...MODELS_BY_BRAND.AUDI,
    ...MODELS_BY_BRAND.BMW,
    ...MODELS_BY_BRAND.FORD,
    ...MODELS_BY_BRAND.PORSCHE,
    ...MODELS_BY_BRAND.FIAT
  ]
};