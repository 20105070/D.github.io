/*app.module.ts - Daniel Syrén (20105070)*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { HttpClientModule } from '@angular/common/http';
import { CloudComponent } from './cloud/cloud.component';

const appRoute: Routes = [
  { path: '', component: CountryComponent },
  { path: 'Country', component: CountryComponent },
  { path: 'City', component: CityComponent },
  { path: 'Cloud', component: CloudComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CountryComponent,
    CloudComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }