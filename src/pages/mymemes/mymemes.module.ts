import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymemesPage } from './mymemes';

@NgModule({
  declarations: [
    MymemesPage,
  ],
  imports: [
    IonicPageModule.forChild(MymemesPage),
  ],
})
export class MymemesPageModule {}
