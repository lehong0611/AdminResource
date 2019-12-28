import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app.routing';
// import { ComponentsModule } from './components/components.module';
// import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { GeocoderService } from './services/geocoder.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NotfoundComponent } from './notfound/notfound.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    // MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBg3nDKzFPiRaZXMgFhN63qSWWZK1vVTc'
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  providers: [
    HttpClient,
    // GeocoderService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
