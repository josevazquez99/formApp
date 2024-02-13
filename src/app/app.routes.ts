import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { jwtGuard } from './shared/guardians/jwt.guard';


export const routes: Routes = [
    { 
        path: 'template',
        loadChildren: () => import("./template/routes").then(mod => mod.router),
        canMatch: [jwtGuard]
      },
      { 
        path: 'reactive',
        loadChildren: () => import("./reactive/routes").then(mod => mod.routerR)
        
      },
      {
        path: 'auth',
        loadChildren: () => import("./auth/routes").then(mod => mod.routerA)
      },
      {
        path:'countries',
        loadComponent: () => import("./countries/countries.component").then(mod => mod.CountriesComponent)
      },
      {
        path:'users',
        loadChildren: () => import("./auth/usuarios/routes").then(mod => mod.routerU),
        canMatch: [jwtGuard]
      },
      {
        path: '',
        redirectTo: 'template/basicos',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
];
