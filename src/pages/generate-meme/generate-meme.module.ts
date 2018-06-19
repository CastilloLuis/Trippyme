import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateMemePage } from './generate-meme';

@NgModule({
  declarations: [
    GenerateMemePage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateMemePage),
  ],
})
export class GenerateMemePageModule {}
