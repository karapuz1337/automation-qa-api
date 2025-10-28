import BaseController from "./BaseController.js";

export default class CarsController extends BaseController {
  getBrands() {
    return this.client.get("/api/cars/brands");
  }

  getBrandById(id) {
    return this.client.get(`/api/cars/brands/${id}`);
  }

  getModels() {
    return this.client.get("/api/cars/models");
  }

  getModelById(id) {
    return this.client.get(`/api/cars/models/${id}`);
  }

  getCars() {
    return this.client.get("/api/cars");
  }

  getCarById(id) {
    return this.client.get(`/api/cars/${id}`);
  }

  postCar(carData) {
    return this.client.post("/api/cars", carData);
  }

  putCar(id, carData) {
    return this.client.put(`/api/cars/${id}`, carData);
  }

  deleteCar(id) {
    return this.client.delete(`/api/cars/${id}`);
  }
}