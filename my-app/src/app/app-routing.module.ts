import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //defualt route
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  { path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)}, //canActivate: [AuthGaurd],
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}