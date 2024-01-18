import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {
    id: 0,
    name: 'first',
    status: 'none'
  };
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.queryParams);
    const serverNo = this.route.snapshot.queryParams['allowEdit'];
    this.server = this.serversService.getServer(parseInt(serverNo));

    // no need to unsubscribe this on ngOnDestroy as it is already handled from angular
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }
}
