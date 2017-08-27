import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NotesService } from "../../services/notes.service";
import { Note } from "../../model/note.model";
import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@ionic-native/speech-recognition';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {

  createdDate: Date;
  isRecording = false;
  speechRecognitionListeningOptions: SpeechRecognitionListeningOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, private notesService: NotesService, private speechRecognition: SpeechRecognition, private platform: Platform, private vibration: Vibration) {
    this.createdDate = new Date(this.navParams.get('createdDate'));
  }

  // Add new note
  onAddNote(value: Note) { // You can access all attributes from html with the tag "name"
    value.createdDate = this.createdDate;
    this.notesService.addNote(value).then((data) => this.navCtrl.pop());
  }

  // Speech recognition
  onStartListening() {
    this.isRecording = true;
    this.setSpeechRecognitionOptions();
    // Is speech recognition available on this device?
    this.isSpeechRecognitionAvailable()
      .then((available: boolean) => {
        if (available) {
          // Do you have the permissions to recognize speech?
          this.hasSpeechRecognitionPermission()
            .then((hasPermission: boolean) => {
              if (hasPermission) {
                this.startSpeechRecognition();
              }
              else {
                // Request Permission..
                this.requestSpeechRecognitionPermission()
                  .then((accepted: boolean) => {
                    if (accepted)
                      this.startSpeechRecognition();
                  });
              }
            })
        }
      })
      .catch((error) => console.log(error));
    if (this.isIOS()) {
      this.vibration.vibrate(256);
    }
  }

  onStopListening() {
    this.stopSpeechRecognition();
  }

  // this.speechRecognition.isRecognitionAvailable()
  // .then((available: boolean) => console.log(available))
  isSpeechRecognitionAvailable() {
    return this.speechRecognition.isRecognitionAvailable().then((available: boolean) => { return available });
  }

  // this.speechRecognition.hasPermission()
  // .then((hasPermission: boolean) => console.log(hasPermission))
  hasSpeechRecognitionPermission() {
    return this.speechRecognition.hasPermission().then((hasPermission: boolean) => { return hasPermission });
  }

  // this.speechRecognition.requestPermission()
  // .then(
  //   () => console.log('Granted'),
  //   () => console.log('Denied')
  // )
  requestSpeechRecognitionPermission() {
    return this.speechRecognition.requestPermission().then(() => { return true }, () => { return false });
  }

  // this.speechRecognition.startListening(options)
  // .subscribe(
  //   (matches: Array<string>) => console.log(matches),
  //   (onerror) => console.log('error:', onerror)
  // )
  startSpeechRecognition() {
    this.speechRecognition.startListening(this.speechRecognitionListeningOptions).subscribe(
      (matches: Array<string>) => {
        var note = new Note;
        note.content = this.capitalizeFirstLetter(matches[0]);
        this.onAddNote(note);
      })
  }

  stopSpeechRecognition() {
    this.speechRecognition.stopListening().then(
      (data) => this.isRecording = false);
  }

  setSpeechRecognitionOptions() {
    this.speechRecognitionListeningOptions = {
      language: "de-DE"
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isIOS() {
    return this.platform.is('ios');
  }



}
