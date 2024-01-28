import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'EventCanvas',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'map',
    title: 'EventCanvas | Map',
    loadComponent: () => import('./components/map/map.component'),
  },
  {
    path: 'calendar',
    title: 'EventCanvas | Calendar',
    loadComponent: () => import('./components/calendar/calendar.component'),
  },
  {
    path: 'chart',
    title: 'EventCanvas | Chart',
    loadComponent: () => import('./components/chart/chart.component'),
  },

  //

  {
    path: 'add-user',
    loadComponent: () => import('./components/users/add/add.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/users/edit/edit.component'),
  },

  ////




  {
    path: '404',
    title: 'EventCanvas | 404',
    loadComponent: () => import('./components/error404/error404.component'),
  },
  /*   {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    }, */
  {
    path: '**',
    redirectTo: '404',
  },
];
