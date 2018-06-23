import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GenerateMemePage } from '../pages/generate-meme/generate-meme';
import { FavoritesPage } from '../pages/favorites/favorites';
import { MymemesPage } from '../pages/mymemes/mymemes';
import { TabsPage } from '../pages/tabs/tabs';

import { ProvidersUsersStorageUsersProvider } from '../providers/providers-users-storage-users/providers-users-storage-users';
import { HttpProvidersHttpProvider } from '../providers/http-providers-http/http-providers-http';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    GenerateMemePage,
    FavoritesPage,
    MymemesPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    GenerateMemePage,
    FavoritesPage,
    MymemesPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersUsersStorageUsersProvider,
    NativeStorage,
    HttpProvidersHttpProvider,
    HttpClientModule
  ]
})
export class AppModule {}
