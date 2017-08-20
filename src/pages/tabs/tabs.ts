import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { HomeBusinessPage } from "../home-business/home-business";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabPrivate = HomePage;
  tabBusiness = HomeBusinessPage;

  constructor() {

  }
}
