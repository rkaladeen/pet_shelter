import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get("/pets");
  }

  getOne(pet_id: any) {
    return this._http.get(`/pets/${pet_id}`);
  }

  createPet(data: object) {
    return this._http.post("/pets", data);
  }

  updatePet(data: object) {
    return this._http.put(`/pets/${data['_id']}`, data);
  }

  adoptPet(pet_id: string) {
    return this._http.delete(`/pets/${pet_id}`);
  }
  checkName(name: any) {
    return this._http.post('/pets/checkNameNotTaken', name);
  }
}
