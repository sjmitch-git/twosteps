import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GetlocationComponent } from './components/getlocation/getlocation.component';
import { ListComponent } from './list/list.component';
import { ResultsComponent } from './list/results/results.component';
import { SortbyPipe } from './pipes/sortby.pipe';
import { VenueComponent } from './list/venue/venue.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MapComponent } from './components/map/map.component';
import { FindcategoryComponent } from './components/findcategory/findcategory.component';
import { ShareComponent } from './components/share/share.component';
import { BacktotopComponent } from './components/backtotop/backtotop.component';
import { GeonamesComponent } from './components/geonames/geonames.component';
import { GetnearbyComponent } from './components/getnearby/getnearby.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    GetlocationComponent,
    ListComponent,
    ResultsComponent,
    SortbyPipe,
    VenueComponent,
    LoadingComponent,
    ErrorsComponent,
    FilterPipe,
    MapComponent,
    FindcategoryComponent,
    ShareComponent,
    BacktotopComponent,
    GeonamesComponent,
    GetnearbyComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxTwitterTimelineModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
