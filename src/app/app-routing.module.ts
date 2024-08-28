import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YardComponent } from './yard/yard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ContentPageComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component')
  //     .then((m)=> m.DashboardComponent), canActivate: [authGuard]
  //  },
  { path: 'dashboard', component: DashboardComponent}, //, canActivate: [AuthGuard] },
  { path: 'yard', component: YardComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'login',  component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
