import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioPage } from './formulario.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioPageRoutingModule {}
