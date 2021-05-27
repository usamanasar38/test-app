import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Added routes with lazy-loading.
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
