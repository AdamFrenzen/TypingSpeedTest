import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {ColorModeService} from "../../services/color-mode.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorMode: boolean = true

  constructor(private service: ColorModeService, private modalService: NgbModal) {
  }

  openModal(modal: TemplateRef<HTMLElement>) {
    this.modalService.open(modal);
  }

  toggleColorMode(): void {
    this.colorMode = ! this.colorMode
    this.service.setColorMode(this.colorMode)
  }

  ngOnInit() {
    this.service.setColorMode(this.colorMode)
  }

}
