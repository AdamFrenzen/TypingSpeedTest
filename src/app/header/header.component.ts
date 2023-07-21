import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //TODO: Communicate dark mode with root app variable
  @Input() colorMode: boolean = true

  toggleColorMode() {
    this.colorMode = ! this.colorMode
    console.log(this.colorMode)
  }

}
