import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';

import { HttpClientModule }     from '@angular/common/http';
import { FormsModule }          from '@angular/forms';


import { AppComponent }         from './app.component';
import { ActualComponent }      from './actual/actual.component';
import { HourlyComponent }      from './hourly/hourly.component';
import { ForecastComponent }    from './forecast/forecast.component';

@NgModule({
  declarations: [
      AppComponent,
      ActualComponent,
      HourlyComponent,
      ForecastComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
