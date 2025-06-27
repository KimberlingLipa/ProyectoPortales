import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkerComponent } from './pages/worker/worker.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { WorkerInactivesComponent } from './pages/worker-inactives/worker-inactives.component';
import { SalaryInactivesComponent } from './pages/salary-inactives/salary-inactives.component';
import { PaymentInactivesComponent } from './pages/payment-inactives/payment-inactives.component';
import { AddWorkerComponent } from './pages/modules/add-worker/add-worker.component';
import { AddSalaryComponent } from './pages/modules/add-salary/add-salary.component';
import { AddPaymentComponent } from './pages/modules/add-payment/add-payment.component';
import { UpdateWorkerComponent } from './pages/modules/update-worker/update-worker.component';
import { UpdateSalaryComponent } from './pages/modules/update-salary/update-salary.component';
import { UpdatePaymentComponent } from './pages/modules/update-payment/update-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkerComponent,
    SalaryComponent,
    PaymentComponent,
    WorkerInactivesComponent,
    SalaryInactivesComponent,
    PaymentInactivesComponent,
    AddWorkerComponent,
    AddSalaryComponent,
    AddPaymentComponent,
    UpdateWorkerComponent,
    UpdateSalaryComponent,
    UpdatePaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
