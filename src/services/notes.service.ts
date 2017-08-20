import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Note } from "../model/note.model";

@Injectable()
export class NotesService {
    notes: Note[] = [];
    notesKey: string;

    public constructor(private storage: Storage) {
        this.notesKey = "notes";
    }

    // Get notes
    getAllNotes() {
        return this.storage.get(this.notesKey)
            .then(
            (notes) => {
                this.notes = notes == null ? [] : notes;
                return this.notes.slice();
            });
    }

    // Get all notes to a specific date
    getAllNotesToSpecificDate(inputDate: Date, selectedTab) {
        return this.storage.get(this.notesKey)
            .then(
            (notes) => {
                this.notes = notes == null ? [] : notes;
                return this.notes.slice().filter(
                    (note) => (selectedTab == note.type || (selectedTab == 0 && note.type == null)) && (
                        (new Date(note.createdDate).getTime() <= new Date(inputDate).getTime()) &&
                        (note.finishedDate == null || new Date(note.finishedDate).getTime() == new Date(inputDate).getTime()) ||
                        (new Date(note.createdDate).getTime() == new Date(inputDate).getTime()))
                );
            });
    }

    // Add new note
    addNote(note: Note) {
        this.notes.push(note);
        return this.storage.set(this.notesKey, this.notes);
    }

    // Add delete note
    deleteNote(note: Note) {
        var index = this.notes.indexOf(note);
        if (index > - 1)
            this.notes.splice(index, 1);
        return this.storage.set(this.notesKey, this.notes);
    }

    // Check the note
    checkNote(note: Note, finishedDate: Date) {
        if (note.finishedDate == null)
            note.finishedDate = new Date(finishedDate.getFullYear(), finishedDate.getMonth(), finishedDate.getDate());
        else
            note.finishedDate = null;
        return this.storage.set(this.notesKey, this.notes);
    }

}