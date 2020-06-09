import { CoachMarkComponent } from './shared/coachmark/componentowner.component';
// import { QrCodeComponent } from './components/qrcode/qrcode.component';
import { AlphaService } from './shared/services/alpha.service';
import { FileService } from './shared/services/file.service';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { AlertService } from './shared/services/alert/alert.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalBodyComponent } from './components/modal/modal-body/modal-body.component';
import { HttpClientModule } from '@angular/common/http';
import { CMDirective } from './shared/coachmark/directive/cmDirective.directive';
import { A } from './components/login/a.component';
// import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GraphicComponent,
    ModalComponent,
    ModalBodyComponent,
    CoachMarkComponent,
    CMDirective,
    A
    // QrCodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // NgQRCodeReaderModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [AlertService, FileService, AlphaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
