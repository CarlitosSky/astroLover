import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full'

      },
      {
        path: 'meet-up',
        loadComponent: () => import('./pages/meet-up/meet-up.page').then( m => m.MeetUpPage)
      },
      {
        path: 'guides',
        loadComponent: () => import('./pages/guides/guides.page').then( m => m.GuidesPage)
      },
      {
        path: 'personal',
        loadComponent: () => import('./pages/personal/personal.page').then( m => m.PersonalPage)
      },
      {
        path: 'weather',
        loadComponent: () => import('./pages/weather/news.page').then(m => m.NewsPage)
      },
      {
        path: 'pollution',
        loadComponent: () => import('./pages/pollution/pollution.page').then( m => m.PollutionPage)
      },
      {
        path: 'camera',
        loadComponent: () => import('./pages/camera/camera.page').then( m => m.CameraPage)
      },
    ]
  },
  {
    path: 'details-weather/:CODPROV',
    loadComponent: () => import('./pages/details-weather/details-weather.page').then( m => m.DetailsWeatherPage)
  },
];
