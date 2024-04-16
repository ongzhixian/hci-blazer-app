import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { credentialsInterceptor } from './interceptors/credentials.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule
    , IonicModule.forRoot()
    , AppRoutingModule
    , HttpClientModule
    , IonicStorageModule.forRoot()
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , provideHttpClient(withInterceptors([credentialsInterceptor]))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
