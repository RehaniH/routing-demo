import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServerService } from "../server.service";
import { Injectable, NgModule } from "@angular/core";

interface Server{
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server>{

    constructor(private serverService: ServerService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        return this.serverService.getServer(+route.params['id']);
    }

}