import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RoleGuard } from './services/guards/role-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DraftComponent } from './components/draft/draft.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AccountGuard } from './services/guards/account.guard';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
{ path:'register', component: RegistrationComponent, canActivate: [AuthGuard]},
// 

];

const dashboardRoutes = [{ 
    path: 'dashboard', 
    component: DashboardComponent,
    
    children: [
      {
        path: 'home', component: HomeComponent,data: {role: `2`}, canActivate:[RoleGuard]
      },
      {
        path: 'draft', component: DraftComponent,data: {role: `2`}, canActivate:[RoleGuard]
      },
      {
        path: 'blogs', component: BlogsComponent,data: {role: `1`}, canActivate:[RoleGuard]
      },
      {
        path: 'profile', component: ProfileComponent, canActivate:[AccountGuard]
      },

    ],  
    canActivate:[AccountGuard],
  },
  { path: '**', redirectTo: '/dashboard'} 
]




@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(dashboardRoutes)],
  
  providers: [AuthGuard, RoleGuard,AccountGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
