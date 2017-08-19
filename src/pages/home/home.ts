import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Note } from "../../model/note.model";
import { NewNotePage } from "../new-note/new-note";
import { NotesService } from "../../services/notes.service";

// ISSUE#1 DayNote 1.0.1 jlehmkuhl 19.08.2017
//  - Added event listener "resume" to update the list when resuming the app.

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: Note[] = [];
  viewAllNotes = false;
  dateFilter: string;

  constructor(public navCtrl: NavController, private notesService: NotesService) {
    // ISSUE#1 BEGIN
    document.addEventListener('resume', () => {
      this.initDateFilter();
    });
    // ISSUE#1 END
    this.initDateFilter();
  }

  // View will enter
  ionViewWillEnter() {
    this.refreshPage();
  }

  // Refresh data
  refreshPage() {
    if (this.viewAllNotes)
      this.notesService.getAllNotes().then((notes) => this.notes = notes);
    else
      this.notesService.getAllNotesToSpecificDate(this.ISOStringToDate(this.dateFilter)).then((notes) => this.notes = notes)
  }

  // Set date filter to today
  initDateFilter() {
    this.dateFilter = new Date(Date.now()).toISOString();
  }

  // Load NewNotePage
  onLoadNewNotePage() {
    this.navCtrl.push(NewNotePage, { createdDate: this.ISOStringToDate(this.dateFilter) });
  }

  // Switch views
  onClickViewByDate() {
    this.viewAllNotes = false;
    this.refreshPage();
  }

  // Set date to today and show results
  onClickViewToday() {
    this.viewAllNotes = false;
    this.initDateFilter();
  }

  // Release date filter and show all results
  onClickViewAll() {
    this.viewAllNotes = true;
    this.refreshPage();
  }

  // Check note 
  onCheckNote(note: Note) {
    this.notesService.checkNote(note, this.ISOStringToDate(this.dateFilter)).then((data) => this.refreshPage());
  }

  // Delete note
  onDeleteNote(note: Note) {
    this.notesService.deleteNote(note).then((data) => this.refreshPage());
  }

  // Other functions
  ISOStringToDate(inputStr: string) {
    return new Date(
      new Date(inputStr).getFullYear(),
      new Date(inputStr).getMonth(),
      new Date(inputStr).getDate()
    );
  }
}
