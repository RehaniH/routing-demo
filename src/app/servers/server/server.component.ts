import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(private serversService: ServerService, private route: ActivatedRoute) { }

  ngOnInit() {
    const currentServerId = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(+currentServerId);
  }

}
