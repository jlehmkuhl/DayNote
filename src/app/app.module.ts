import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewNotePage } from "../pages/new-note/new-note";
import { NotesService } from "../services/notes.service";
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { Vibration } from "@ionic-native/vibration";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewNotePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewNotePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, NotesService, SpeechRecognition, Vibration
  ]
})
export class AppModule { }
