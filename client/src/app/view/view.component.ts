import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['../app.component.css']
})
export class ViewComponent implements OnInit {
  currentPet: any = {};
  likeClick: boolean;
  failedBackEnd: any = false;
  backEndErrors: any = {};
  constructor( private _http: HttpService, 
               private _router: Router, 
               private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPetFromUrl();
    this.likeClick = false;
  }

  getPetFromUrl() {
    this._route.params.subscribe(pet_id => {
      if (Object.keys(pet_id).length != 0) {
        let petData = this._http.getOne(pet_id.pet_id)
        petData.subscribe((data: any) => {
          console.log(data);
          if (data.name != "ValidationError") {
            this.currentPet = {
              _id: data['_id'],
              name: data['name'],
              type: data['type'],
              description: data['description'],
              likes: data['likes'],
              skill_1: data['skill_1'],
              skill_2: data['skill_2'],
              skill_3: data['skill_3']
            }
            
          }
        })
        
      }

    })
  }


  serverValidator(data: any):void{
    if (data.name == "ValidationError") {
      this.backEndErrors = data.errors;
      this.failedBackEnd = true;
    } else {
      // this._router.navigate(['/pets']);
      console.log(data);
    }
  }

  likePet() {
    this.currentPet.likes ++;
    this.likeClick = true;
    console.log(this.currentPet);
    let ob = this._http.updatePet(this.currentPet)
    ob.subscribe((data: any) => {
      this.serverValidator(data);
    })
  }

  adoptPet() {
    let ob = this._http.adoptPet(this.currentPet._id)
    ob.subscribe((data: any) => {
      this.serverValidator(data);
    })
  }

  

}
