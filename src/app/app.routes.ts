import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'case-studies/:id',
    loadComponent: () => import('./features/case-studies/case-study-detail.component').then(m => m.CaseStudyDetailComponent)
  },
  {
    path: 'case-studies',
    redirectTo: 'case-studies/1',
    pathMatch: 'full'
  },
  {
    path: 'log',
    loadComponent: () => import('./features/log/log.component').then(m => m.LogComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'design-system',
    loadComponent: () => import('./features/design-system/design-system.component').then(m => m.DesignSystemComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
