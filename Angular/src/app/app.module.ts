import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TableComponentComponent } from './table-component/table-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { TableModule } from 'primeng/table';
import { UserService } from './user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDataService } from './mydata.service';
import { AuthguardGuard } from './authguard.guard';

import {
  GalleriaModule, MenubarModule, CheckboxModule, MessagesModule, PanelModule, CalendarModule, RadioButtonModule,
  InputSwitchModule, SelectButtonModule, DataListModule, SplitButtonModule, AccordionModule, TooltipModule,
  SliderModule, MultiSelectModule, ContextMenuModule, GrowlModule, DialogModule, ButtonModule, DropdownModule,
  InputTextModule, TabViewModule, CodeHighlighterModule
} from 'primeng/primeng';

import { UpdatedTableComponentComponent } from './updated-table-component/updated-table-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'home',
    canActivate: [AuthguardGuard],
    canActivateChild: [AuthguardGuard],
    component: HomeComponentComponent,
    children: [
      { path: '', redirectTo: 'table', pathMatch: 'full' },
      { path: 'table', component: TableComponentComponent },]
  },
  { path: '**', component: ErrorComponentComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    TableComponentComponent,
    ErrorComponentComponent,
    UpdatedTableComponentComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    GalleriaModule, MenubarModule, CheckboxModule, MessagesModule, PanelModule, CalendarModule, RadioButtonModule,
    InputSwitchModule, SelectButtonModule, DataListModule, SplitButtonModule, AccordionModule, TooltipModule,
    SliderModule, MultiSelectModule, ContextMenuModule, GrowlModule, DialogModule, ButtonModule, DropdownModule,
    InputTextModule, TabViewModule, CodeHighlighterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MyDataService, UserService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

