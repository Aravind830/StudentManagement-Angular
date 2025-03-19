import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentsCardComponent } from './students.card/students-card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'student', component:StudentsCardComponent},
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { path:'curd',component:AppComponent},
  { path:'home',component:HomeComponent},
  { path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
