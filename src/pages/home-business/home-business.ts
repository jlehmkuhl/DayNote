import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { NotesService } from "../../services/notes.service";

/**
 * Generated class for the HomeBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  // selector: 'page-home-business',
  // templateUrl: 'home-business.html'
  selector: 'page-home-business',
  templateUrl: '../home/home.html'
})
export class HomeBusinessPage extends HomePage {

  constructor(public navCtrl: NavController, public notesService: NotesService) {
    super(navCtrl, notesService);
    this.selectedTab = 1;
  }
}
