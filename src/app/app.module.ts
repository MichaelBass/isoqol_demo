import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { DeveloperComponent } from './developer/developer.component';
import { ScreenerComponent } from './screener/screener.component';
import { HomeOverlayComponent } from './home-overlay/home-overlay.component';
import { AcApiService } from './ac-api.service';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    AssessmentComponent,
    DeveloperComponent,
    ScreenerComponent,
    HomeOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AcApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
