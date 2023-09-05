import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {KeyboardListenerService} from "../../services/keyboard-listener.service";
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit{
  @ViewChild('baseTimerPathRemaining') TimerRemain!: ElementRef;
  @ViewChild('baseTimerLabel') TimerLabel!: ElementRef
  @ViewChild('scoreReport') ScoreModal!: TemplateRef<HTMLElement>

  subscription: Subscription;

  constructor(private keyListener: KeyboardListenerService, private modalService: NgbModal) {
    this.subscription = this.keyListener.getTimerState().subscribe(state => {
      if (!state) {
        this.onTimesUp()
      }
      else if (!this.timerStart) {
        this.startTimer()
      }
    })
  }

  openModal(modal: TemplateRef<HTMLElement>) {
    this.modalService.open(modal);
  }

  // Credit: Mateusz Rybczonec
  // radial svg clock

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

  timerStart: boolean = false

  WPM: number = 0;
  CPM: number = 0;
  ACC: number = 0;

  onTimesUp() {
    this.keyListener.setTrackingWPM(false)
    clearInterval(this.timerInterval!);

    const charInfo = this.keyListener.getChars()
    this.WPM = (charInfo[0]/5)/(this.timePassed/60);
    this.WPM = Math.round(this.WPM * 100)/100 // ROUND to 2 decimal
    this.CPM = (charInfo[0])/(this.timePassed/60);
    this.CPM = Math.round(this.CPM * 100)/100
    this.ACC = ((charInfo[0]-charInfo[1])/charInfo[0])*100
    this.ACC = Math.round(this.ACC * 100)/100
    this.openModal(this.ScoreModal)
  }

  startTimer() {
    // if (0 !== this.timerInterval) { return }
    this.timerStart = true

    this.keyListener.setTrackingWPM(true)

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
