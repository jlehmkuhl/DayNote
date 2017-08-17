import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Note } from "../../model/note.model";
import { NotesService } from "../../services/notes.service";

/**
 * Generated class for the NotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

  note: Note;

  constructor(public navCtrl: NavController, public navParams: NavParams, private notesService: NotesService, public viewCtrl: ViewController) {
    this.note = navParams.data;
  }

  // Update note
  onSave() {
    this.notesService.updateNote(this.note);
    this.navCtrl.pop();
  }
}
