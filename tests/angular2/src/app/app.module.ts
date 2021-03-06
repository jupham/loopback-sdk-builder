import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SDKModule } from './shared/sdk/index';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SDKModule.forRoot(),
    routing
  ],
  providers       : [ appRoutingProviders ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})
export class AppModule { }
