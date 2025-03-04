import {Routes} from '@angular/router';

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
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full'

      },
      {
        path: 'meet-up',
        loadComponent: () => import('./pages/meet-up/meet-up.page').then(m => m.MeetUpPage)
      },
      {
        path: 'guides',
        loadComponent: () => import('./pages/guides/guides.page').then(m => m.GuidesPage)
      },
      {
        path: 'personal',
        loadComponent: () => import('./pages/personal/personal.page').then(m => m.PersonalPage)
      },
      {
        path: 'weather',
        loadComponent: () => import('./pages/weather/news.page').then(m => m.NewsPage)
      },
      {
        path: 'camera',
        loadComponent: () => import('./pages/camera/camera.page').then(m => m.CameraPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: 'details-weather/:CODPROV',
        loadComponent: () => import('./pages/details-weather/details-weather.page').then(m => m.DetailsWeatherPage)
      },
      {
        path: 'configuration',
        loadComponent: () => import('./pages/configuration/configuration.page').then(m => m.ConfigurationPage)
      },
      {
        path: 'solar',
        loadComponent: () => import('./pages/solar/solar.page').then( m => m.SolarPage)
      },
      {
        path: 'galaxies',
        loadComponent: () => import('./pages/galaxies/galaxies.page').then( m => m.GalaxiesPage)
      },
      {
        path: 'cultures',
        loadComponent: () => import('./pages/cultures/cultures.page').then( m => m.CulturesPage)
      },
      {
        path: 'apod',
        loadComponent: () => import('./pages/apod/apod.page').then( m => m.ApodPage)
      },
      {
        path: 'rover',
        loadComponent: () => import('./pages/rover/rover.page').then( m => m.RoverPage)
      },
      {
        path: 'todolist',
        loadComponent: () => import('./pages/todolist/todolist.page').then( m => m.TodolistPage)
      },
      {
        path: 'log-book',
        loadComponent: () => import('./pages/log-book/log-book.page').then( m => m.LogBookPage)
      },
      {
        path: 'acknow',
        loadComponent: () => import('./pages/acknow/acknow.page').then( m => m.AcknowPage)
      },
      {
        path: 'curiosity',
        loadComponent: () => import('./pages/curiosity/curiosity.page').then( m => m.CuriosityPage)
      },
      {
        path: 'calcule-weight',
        loadComponent: () => import('./pages/calcule-weight/calcule-weight.page').then( m => m.CalculeWeightPage)
      },
    ]
  },

];
