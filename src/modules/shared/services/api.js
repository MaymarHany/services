import axios from "axios";
import apiModel from "../model/apiModel";
import store from "../../../store/index";

axios.defaults.baseURL = "https://admin.saudiblood.org/api/";
require("./interceptors");

export class ApiService {
  constructor() {
    this.apiModel = apiModel.apiModel;
  }

  get(Url) {
    return axios
      .get(`${Url}`)
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {
        // console.log(err);
        this.serverResponse(err);
      });
  }
  getFilter(Url, data) {
    return axios
      .get(`${Url}/${data}`)
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {
        
        // console.log(err);
        this.serverResponse(err);
      });
  }
  post(Url, data) {
    return axios
      .post(Url, data)
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {
        this.serverResponse(err);
      });
  }

  update(id, Url, data) {
    return axios
      .put(`${Url}/` + id, data, {})
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {

        this.serverResponse(err);
      });
  }

  delete(id, Url) {
    return axios.delete(`${Url}/` + id);
  }

  dataStats(data) {
    // console.log("status", data.status)
    this.apiModel = data.data;

    switch (data.status) {
      case 200:
        return this.apiModel ? this.apiModel : true;
      case 201:
        store.commit("setApiMessage", this.apiModel.data.message);
        store.commit("UPDATE_DIALOG", true);
        setTimeout(() => store.commit("UPDATE_DIALOG", false), 3000);
        return this.apiModel ? this.apiModel : true;
      case 404:
        return false;
      default:
        return false;
    }
  }

  serverResponse(err) {
    let message = err.errors;
    if (message) {
      store.commit("setApiMessage", message);
      store.commit("UPDATE_DIALOG", true);
    }
  }
}
