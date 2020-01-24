import {
  AfterViewInit,
  OnChanges,
  ViewChild,
  HostListener,
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges, AfterViewInit {
  private yScale: number = 100;
  private data: number[] = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * this.yScale)
  );
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private barWidth: number;

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef) {}

  @ViewChild("myCanvas", { static: false }) set canvasRef(
    canvasRef: ElementRef
  ) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = canvasRef.nativeElement.getContext("2d");
  }

  ngAfterViewInit() {
    this.onResize();
  }

  // Draw the curve again whenever changes occur
  ngOnChanges() {
    //Recalculate derived values
    this.barWidth = this.width / this.data.length;
    //this.yScale = .... very likely the max range of values ....

    this.cdr.detectChanges();

    this.draw();

    this.cdr.detectChanges();
  }

  // When the window is resized, recalculate our canvas dimensions and redraw.
  @HostListener("window:resize")
  onResize() {
    // The canvas will fill the width and height of the host element.
    // See what they are and set them for the canvas.
    this.height = this.elRef.nativeElement.offsetHeight;
    this.width = this.elRef.nativeElement.offsetWidth;

    this.cdr.detectChanges();

    // We're manually setting these instead of using property bindings in
    // the view, because we need these to be set before we invoke "draw".
    // HTML5 canvas is always cleared when its width/height is set, so
    // the order in which this happens is significant.

    this.canvas.width = this.width;
    // this.canvas.style.width = `${this.width}px`;

    this.canvas.height = this.height;
    //this.canvas.style.height = `${this.height}px`;

    //Recalculate derived values
    this.barWidth = this.width / this.data.length;

    this.cdr.detectChanges();

    this.draw();

    this.cdr.detectChanges();
  }

  private draw() {
    this.cdr.detectChanges();
    this.ctx.translate(0, this.height);
    this.ctx.scale(1, -1);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "seagreen";
    this.data.forEach((value, index) => {
      this.ctx.fillRect(
        index * this.barWidth,
        0,
        this.barWidth,
        (value / this.yScale) * this.height
      );
    });
    this.cdr.detectChanges();
  }
}
