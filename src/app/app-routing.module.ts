import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListComponent } from './list/list.component';
import { VenueComponent } from './list/venue/venue.component';
import { NotconnectedComponent } from './notconnected/notconnected.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: ListComponent
  },
  {
    path: 'trending',
    component: ListComponent
  },
  {
    path: 'food',
    component: ListComponent
  },
  {
    path: 'drinks',
    component: ListComponent
  },
  {
    path: 'arts',
    component: ListComponent
  },
  {
    path: 'coffee',
    component: ListComponent
  },
  {
    path: 'outdoors',
    component: ListComponent
  },
  {
    path: 'shops',
    component: ListComponent
  },
  {
    path: 'venue',
    component: VenueComponent
  },
  {
    path: 'notconnected',
    component: NotconnectedComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
