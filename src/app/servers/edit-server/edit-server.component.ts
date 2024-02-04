import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/can-component-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string} = {
    id: 0,
    name: 'first',
    status: 'none'
  };
  serverName = '';
  serverStatus = '';
  allowEdit;
  changesUpdated = false;

  constructor(private serversService: ServerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.queryParams);
    const serverNo = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(parseInt(serverNo));

    // no need to unsubscribe this on ngOnDestroy as it is already handled from angular
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] === '1';
    });
    this.route.fragment.subscribe();
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesUpdated = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if ( !this.allowEdit){
      return true;
    } else if ( (this.server.name !== this.serverName || this.server.status !== this.serverStatus) && !this.changesUpdated){
      return confirm('Are you sure you want to discard the changes ?');
    } else {
      return true;
    }
  }
}
