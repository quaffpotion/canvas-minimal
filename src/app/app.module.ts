import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ChartComponent, SomeChild } from "./chart/chart.component";

@NgModule({
  declarations: [AppComponent, ChartComponent, SomeChild],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
