import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.css']
})
export class NavComponent {
  title = 'Pet Shelter';
  tabs: any = [
    { name: "Project Description", route: "" },
    { name: "See All Pets", route: "pets"},
    { name: "Send Us a Pet", route: "pets/new"}
  ] 
}

