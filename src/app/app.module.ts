import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './pages/home/home.component';
import { RecommandationCardComponent } from './components/cards/recommandation-card/recommandation-card.component';
import { LoadingCardComponent } from './components/cards/loading-card/loading-card.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RecommandationsComponent} from "./pages/recommandations/recommandations.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    LoadingComponent,
    HomeComponent,
    RecommandationCardComponent,
    LoadingCardComponent,
    RecommandationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    // CoreModule,
    // HomeModule,
    // NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
