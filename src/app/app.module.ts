import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { TextComponent } from './text/text.component';

import { KeyboardListenerService } from "./keyboard-listener.service";

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [KeyboardListenerService],
  bootstrap: [AppComponent]
})
export class AppModule { }