import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YardComponent } from './yard/yard.component';
import { AdminComponent } from './admin/admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SignedOffItemComponent } from './signed-off-item/signed-off-item.component';
import { UnsignedOffItemComponent } from './unsigned-off-item/unsigned-off-item.component';
import { NewjobComponent } from './newjob/newjob.component';
import { JobQuantityWeightComponent } from './job-quantity-weight/job-quantity-weight.component';
import { ProcessingBayComponent } from './processing-bay/processing-bay.component';
import { ToastComponent } from './toast/toast.component';
import { ViewWeightDetailsComponent } from './view-weight-details/view-weight-details.component';
import { OutbayComponent } from './outbay/outbay.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { authInterceptor } from './auth.interceptor';
import { ProcessingBayUsersComponent } from './processing-bay-users/processing-bay-users.component';
import { RepackagingComponent } from './components/repackaging/repackaging.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from './services/confirmation.service';
import { ProcessBayOutJobsComponent } from './components/process-bay-out-jobs/process-bay-out-jobs.component';
import { ProcessBayInJobsComponent } from './components/process-bay-in-jobs/process-bay-in-jobs.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BigchangeReconciliationComponent } from './components/bigchange-reconciliation/bigchange-reconciliation.component';
import { PendingConfirmedJobsComponent } from './components/pending-confirmed-jobs/pending-confirmed-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    ContentPageComponent,
    LoginComponent,
    DashboardComponent,
    YardComponent,
    AdminComponent,
    JobDetailComponent,
    LoadingSpinnerComponent,
    SignedOffItemComponent,
    UnsignedOffItemComponent,
    NewjobComponent,
    JobQuantityWeightComponent,
    ProcessingBayComponent,
    ToastComponent,
    ViewWeightDetailsComponent,
    OutbayComponent,
    UserManagementComponent,
    ProcessingBayUsersComponent,
    RepackagingComponent,
    ConfirmationDialogComponent,
    ProcessBayOutJobsComponent,
    ProcessBayInJobsComponent,
    PaginatorComponent,
    BigchangeReconciliationComponent,
    PendingConfirmedJobsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
