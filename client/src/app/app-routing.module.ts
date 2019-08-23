import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component'
import { ViewComponent } from './view/view.component'


const routes: Routes = [
  { path: "", component: HomeComponent },
  
  { path: "pets", component: ListComponent },

  { 
    path: "pets/new", 
    component: AddEditComponent, 
    data: { 
      title: "Add Pet",
      buttons: {create: true}
    } 
  },

  { 
    path: "pets/:pet_id", 
    component: ViewComponent,  
  },
  
  { 
    path: "pets/:pet_id/edit", 
    component: AddEditComponent, 
    data: { 
      title: "Edit Pet",
      buttons: {update: true}
    } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
