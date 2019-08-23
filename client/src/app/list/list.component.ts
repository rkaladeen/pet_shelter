import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../app.component.css']
})
export class ListComponent implements OnInit {
  title: string = "These pets are looking for a home!"
  allPets: any = [];
  filter: any = [];
  searchVal: string = "";

  constructor(private _http: HttpService) { }

  ngOnInit() {
    let ob = this._http.getAll();
    ob.subscribe(data => {
      // console.log(data);
      this.allPets = data;
      this.filter = data;
    })
  }

  search(event) {
    let temp = [];
    for (let pet of this.allPets) {
      if (pet.name.toLowerCase().includes(event.toLowerCase())) {
        temp.push(pet)
      }
    }
    this.filter = temp;
  }

}
