import {
  AfterViewInit,
  ViewChild,
  HostListener,
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit
} from "@angular/core";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush // When uncommented Angular uses the default change strategy so when the count property is reassigned Angular will check for changes on the whole tree of components. When commented, Angular won't get around to the child component unless something makes it check the parent
})
export class ChartComponent implements OnInit, AfterViewInit {
  private yScale: number = 100;
  private data: number[] = Array.from(
    { length: Math.max(5, Math.floor(Math.random() ** 2 * 1000)) },
    () => Math.floor(Math.random() * this.yScale)
  );
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private barWidth: number;
  constructor(private elRef: ElementRef) {}

  @ViewChild("myCanvas", { static: false }) set canvasRef(
    canvasRef: ElementRef
  ) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = canvasRef.nativeElement.getContext("2d");
  }
  ngOnInit() {
    // This is where you would subscribe to any observables from injected services
  }

  // We need to wait until this are initialized before trying to resize and draw.
  ngAfterViewInit() {
    this.onResize();
  }

  // Whenever Angular has changes we need to recalculate values that depend on the data and then
  // resize and redraw.
  ngOnChanges() {
    this.barWidth = this.width / this.data.length;
    this.draw();
  }

  // Whenever a resize event occurs we reset the width manually and redraw
  @HostListener("window:resize")
  onResize() {
    //Get the height of the app-chart component and force canvas to match it
    //canvas.width is used to calculate what to draw
    //canvas.style.width is really just scaling
    this.width = this.elRef.nativeElement.offsetWidth;
    this.height = this.elRef.nativeElement.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    //Recalculate derived values that depend on the data
    this.barWidth = this.width / this.data.length;

    //Finally, redraw the canvas
    this.draw();
  }

  private draw() {
    //These lines set the origin to be in the lower left corner with positive values pointing up and to the right.
    this.ctx.translate(0, this.height);
    this.ctx.scale(1, -1);

    //We erase everything before drawing
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "#FF30D2";
    this.data.forEach((value, index) => {
      this.ctx.fillRect(
        index * this.barWidth,
        0,
        this.barWidth,
        (value / this.yScale) * this.height
      );
    });
  }
}
