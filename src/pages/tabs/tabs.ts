import { Component } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard';
import { FavoritesPage } from '../favorites/favorites';
import { MymemesPage } from '../mymemes/mymemes';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = FavoritesPage;
  tab3Root = MymemesPage;

  constructor() {

  }
}
