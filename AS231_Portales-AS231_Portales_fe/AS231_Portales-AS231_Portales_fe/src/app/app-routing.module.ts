import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workers', component: WorkerComponent },
  { path: 'salaries', component: SalaryComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'workers/inactives', component: WorkerInactivesComponent },
  { path: 'salaries/inactives', component: SalaryInactivesComponent },
  { path: 'payments/inactives', component: PaymentInactivesComponent },
  { path: 'workers/new', component: AddWorkerComponent },
  { path: 'salaries/new', component: AddSalaryComponent },
  { path: 'payments/new', component: AddPaymentComponent },
  { path: 'workers/update/:id', component: UpdateWorkerComponent },
  { path: 'salaries/update/:id', component: UpdateSalaryComponent },
  { path: 'payments/update/:id', component: UpdatePaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
