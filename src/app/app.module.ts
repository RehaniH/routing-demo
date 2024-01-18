import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UserComponent } from './users/user/user.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id/edit', component: EditServerComponent },
    { path: ':id', component: ServerComponent }
  
  ] },
];

@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    HomeComponent,
    UsersComponent,
    ServerComponent,
    EditServerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
