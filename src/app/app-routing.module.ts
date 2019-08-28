import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RoleGuard } from './services/guards/role-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DraftComponent } from './components/draft/draft.component';


const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
{ path:'register', component: RegistrationComponent, canActivate: [AuthGuard]},

{ path: 'admin', component: AdminComponent, data: {role: `1`}, canActivate:[RoleGuard]},
// { path: '**', redirectTo: '/login'}
];

const dashboardRoutes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'draft', component: DraftComponent,
      },     
    ],
    data: {role: `2`},
    canActivate:[RoleGuard]
  },
  { path: '**', redirectTo: '/login'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(dashboardRoutes)],
  
  providers: [AuthGuard, RoleGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
