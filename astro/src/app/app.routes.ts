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
      {
        path: 'survived',
        loadComponent: () => import('./pages/survived/survived.page').then( m => m.SurvivedPage)
      },
      {
        path: 'survived-detail/:id',
        loadComponent: () => import('./pages/survived-detail/survived-detail.page').then( m => m.SurvivedDetailPage)
      },
      {
        path: 'astronauts',
        loadComponent: () => import('./pages/astronauts/astronauts.page').then( m => m.AstronautsPage)
      },
      {
        path: 'astronomers',
        loadComponent: () => import('./pages/astronomers/astronomers.page').then( m => m.AstronomersPage)
      },
      {
        path: 'astronomer-detail/:id',
        loadComponent: () => import('./pages/astronomer-detail/astronomer-detail.page').then( m => m.AstronomerDetailPage)
      },
      {
        path: 'solar-detail/:id',
        loadComponent: () => import('./pages/solar-detail/solar-detail.page').then( m => m.SolarDetailPage)
      },
      {
        path: 'galaxie-detail/:id',
        loadComponent: () => import('./pages/galaxie-detail/galaxie-detail.page').then( m => m.GalaxieDetailPage)
      },
      {
        path: 'culture-detail/:id',
        loadComponent: () => import('./pages/culture-detail/culture-detail.page').then( m => m.CultureDetailPage)
      },
      {
        path: 'articles',
        loadComponent: () => import('./pages/articles/articles.page').then( m => m.ArticlesPage)
      },
      {
        path: 'telescopes',
        loadComponent: () => import('./pages/telescopes/telescopes.page').then( m => m.TelescopesPage)
      },

      {
        path: 'accesories',
        loadComponent: () => import('./pages/accesories/accesories.page').then( m => m.AccesoriesPage)
      },
      {
        path: 'mounts',
        loadComponent: () => import('./pages/mounts/mounts.page').then( m => m.MountsPage)
      },
      {
        path: 'acce-detail/:id',
        loadComponent: () => import('./pages/acce-detail/acce-detail.page').then( m => m.AcceDetailPage)
      },
      {
        path: 'mount-detail/:id',
        loadComponent: () => import('./pages/mount-detail/mount-detail.page').then( m => m.MountDetailPage)
      },
      {
        path: 'camera-detail/:id',
        loadComponent: () => import('./pages/camera-detail/camera-detail.page').then( m => m.CameraDetailPage)
      },
      {
        path: 'tele-detail/:id',
        loadComponent: () => import('./pages/tele-detail/tele-detail.page').then( m => m.TeleDetailPage)
      },
    ]
  },
];
