import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../app.component.css']
})
export class AddEditComponent implements OnInit {
  heading: string;
  buttons: object;
  newPet: FormGroup;
  nameExists:boolean = null;
  currentPet: any = [];
  allPets: any = [];
  globalId: any;
  

  searchVal: string = "";
  failedBackEnd: any = false;
  backEndErrors: any = {};
  
  constructor(private _route: ActivatedRoute, 
              private _http: HttpService, 
              private _router: Router) { }

  ngOnInit() {
    this.getPetFromUrl();
    this.getAllPets();
    this.buildReactiveForm();
  }

  getAllPets() {
    let ob = this._http.getAll();
    ob.subscribe(data => {
      console.log(data);
      this.allPets = data;
    })
  }

  checkName(event) {
    for (let pet of this.allPets) {
      if (pet.name.toLowerCase() == event.toLowerCase()) {
        console.log("Name exits")
        this.nameExists = true;
        console.log(this.nameExists);
      } else {
        this.nameExists = null;
      }

    }
  }

  
  buildReactiveForm() {
    this.newPet = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', 
                            [
                              Validators.required, 
                              Validators.minLength(3),
                              
                            ]),
      type: new FormControl('', 
                            [
                              Validators.required, 
                              Validators.minLength(3)
                            ]),
      description: new FormControl('', 
                            [ 
                              Validators.required,
                              Validators.minLength(3), 
                              Validators.maxLength(100)
                            ]),
      skill_1: new FormControl(''),
      skill_2: new FormControl(''),
      skill_3: new FormControl('')
      
      
    })
  }

  getPetFromUrl() {
    this._route.params.subscribe(pet_id => {
      
      this.globalId = pet_id;
      if (Object.keys(pet_id).length != 0) {
        let petData = this._http.getOne(pet_id.pet_id)
        petData.subscribe((data: any) => {
          console.log(data);
          if (data.name != "ValidationError") {
            this.newPet.setValue({
              _id: data['_id'],
              name: data['name'],
              type: data['type'],
              description: data['description'],
              skill_1: data['skill_1'],
              skill_2: data['skill_2'],
              skill_3: data['skill_3']
            }) 
            
          }
        })
        console.log(this.newPet);
      }

    })
    this._route.data.subscribe(data => {
      this.buttons = data.buttons;
      this.heading = data.title;
    })
  }

  serverValidator(data: any, route: any):void{
    if (data.name == "ValidationError") {
      this.backEndErrors = data.errors;
      this.failedBackEnd = true;
    } else {
      this._router.navigate([route]);
      // console.log(data);
    }
  }

  

  submitPet(): void {
    delete this.newPet.value._id;
    let ob = this._http.createPet(this.newPet.value);
    ob.subscribe((data: any) => {
      this.serverValidator(data, '/pets');
    })
  }

  editPet(): void {
    let ob = this._http.updatePet(this.newPet.value);
    ob.subscribe((data: any) => {
      this.serverValidator(data, `/pets/${this.newPet.value._id}`);
    })
  }

  

  
}
