import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'*',
    component:AppComponent
  },
{
  path:'userForm',
  component:UserFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
