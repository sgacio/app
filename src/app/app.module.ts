import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DeckComponent } from './deck/deck.component';
import { NewDeckComponent } from './new-deck/new-deck.component'

@NgModule({
  declarations: [AppComponent, DeckComponent, NewDeckComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [DeckComponent]
})
export class AppModule {}
