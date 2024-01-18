import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from './server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private serverService: ServerService) {
                this.servers = this.serverService.getServers();
               }

  ngOnInit(): void {
  }

  public onReload(){
    // this.router.navigate( ['servers'], {relativeTo: this.route}); // use this to mention relative paths. By default, the path is append to root
  }

}
