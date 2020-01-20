import {
  OnChanges,
  ViewChild,
  HostListener,
  Component,
  OnInit,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width;
  private height;

  constructor(private elRef: ElementRef) {}

  @ViewChild("myCanvas", { static: false }) set canvasRef(
    canvasRef: ElementRef
  ) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = canvasRef.nativeElement.getContext("2d");
  }

  // Set initial dimensions on init.
  ngOnInit() {
    this.width = 500;
    this.height = 50;
    this.onResize();
  }

  // Draw the curve again whenever changes occur
  ngOnChanges() {
    this.draw();
  }

  // When the window is resized, recalculate our canvas dimensions and redraw.
  @HostListener("window:resize")
  onResize() {
    console.log("resize called");
    // The canvas will fill the width and height of the host element.
    // See what they are and set them for the canvas.
    this.width = this.elRef.nativeElement.offsetWidth;
    this.height = this.elRef.nativeElement.offsetHeight;
    // We're manually setting these instead of using property bindings in
    // the view, because we need these to be set before we invoke "draw".
    // HTML5 canvas is always cleared when its width/height is set, so
    // the order in which this happens is significant.
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.draw();
  }

  reset() {
    console.log(this, " called the reset method");
    this.width = 1200;
    this.height = 200;
    this.canvas.width = 1200;
    this.canvas.height = 200;
    this.canvas.style.width = `1200px`;
    this.canvas.style.height = `200px`;
    this.draw();
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "#222ea1";
    this.ctx.lineWidth = this.height / 3;

    // Draw the centerline
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    this.ctx.stroke();
  }
}
