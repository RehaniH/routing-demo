import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-component-deactivate.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: 'users', pathMatch: 'full' }, when by default when we want to redirect to another path
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } }
    ]
  }
  ,
  // { path: 'not-found', component: PageNotFoundComponent},
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Custom error message: Not Found !' } },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, {useHash: true})], this is used for older browser support and production server support for some servers
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
