import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { TextComponent } from './components/text/text.component';

import { KeyboardListenerService } from "./services/keyboard-listener.service";
import { PromptComponent } from './components/prompt/prompt.component';
import { HeaderComponent } from './components/header/header.component';
import {ColorModeService} from "./services/color-mode.service";

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    TextComponent,
    PromptComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [KeyboardListenerService, ColorModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
