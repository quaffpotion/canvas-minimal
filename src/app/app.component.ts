import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("myChart", { static: false }) child: ChartComponent;
  private items = [1, 2, 3, 4, 5];
}
