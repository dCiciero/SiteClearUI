import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPageComponent } from '../../content-page/content-page.component';
import { YardComponent } from '../../yard/yard.component';
import { AdminComponent } from '../../admin/admin.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AppComponent } from '../../app.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  { path: '', 
    component: ContentPageComponent, 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, data: { allowedRoles: ['super user','admin', 'user'] } , canActivate: [AuthGuard] },
      { path: 'yard', component: YardComponent,  data: { allowedRoles: ['super user','admin', 'user'] } , canActivate: [AuthGuard]  },
      { path: 'admin', component: AdminComponent,  data: { allowedRoles: ['super user','admin'] }, canActivate: [AuthGuard]  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
