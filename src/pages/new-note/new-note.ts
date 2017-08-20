import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from "../../services/notes.service";
import { Note } from "../../model/note.model";

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {

  createdDate: Date;
  selectedTab: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NotesService) {
    this.createdDate = new Date(this.navParams.get('createdDate'));
    this.selectedTab = this.navParams.get('selectedTab');
  }

  // Add new note
  onAddNote(value: Note) { // You can access all attributes from html with the tag "name"
    value.createdDate = this.createdDate;
    value.type = this.selectedTab;
    this.noteService.addNote(value).then((data) => this.navCtrl.pop());
  }

}
