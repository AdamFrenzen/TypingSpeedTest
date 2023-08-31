import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit{

  @ViewChild('baseTimerPathRemaining') TimerRemain!: ElementRef;

  @ViewChild('baseTimerLabel') TimerLabel!: ElementRef

  // Credit: Mateusz Rybczonec

  FULL_DASH_ARRAY = 283;
  COLOR_CODES = {
    info: {
      color: "green"
    },
  };

  TIME_LIMIT = 60;
  timePassed = 0;
  timeLeft = this.TIME_LIMIT;
  timerInterval: any = 0;
  remainingPathColor = this.COLOR_CODES.info.color;

  timerStart: boolean = false

  // startTimer();

  onTimesUp() {
    // if (! this.timerInterval) {
    //   return
    // }
    console.log("end")
    clearInterval(this.timerInterval!);
  }

  startTimer() {
    console.log(this.timeLeft)
    if (0 !== this.timerInterval) {return}
    this.timerStart = true

    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      this.TimerLabel.nativeElement.innerHTML = this.formatTime(
        this.timeLeft
      );
      // this.TimerLabel.nativeElement.classList.add(this.remainingPathColor);
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);

      if (this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds:any = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  setRemainingPathColor(timeLeft: any) {
    const { info } = this.COLOR_CODES;
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    this.TimerRemain.nativeElement.setAttribute("stroke-dasharray", circleDasharray);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.startTimer()
  }

}
