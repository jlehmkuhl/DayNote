import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeBusinessPage } from './home-business';

@NgModule({
  declarations: [
    HomeBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeBusinessPage),
  ],
})
export class HomeBusinessPageModule {}
