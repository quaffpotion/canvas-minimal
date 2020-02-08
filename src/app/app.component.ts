import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("myChart", { static: false }) child: ChartComponent;
  private items = Array.from({ length: 50 });
  private count = 0;

  addOne() {
    this.count = this.count + 1;
  }
}
