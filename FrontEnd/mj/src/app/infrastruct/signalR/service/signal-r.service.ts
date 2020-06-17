import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalRecieved = new EventEmitter<string>();
  constructor(
  ) {
    this.buildConnection();
    this.startConnection();
  }

  buildConnection() {
    const urlPath = environment.apiUrl + '/main/signalHub';
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(urlPath)
      .build();
  }

  startConnection() {
    this.hubConnection.start().then(() => {
      this.registerSignalEvents();
      console.log('SignalR connection started');
    })
      .catch(err => {
        console.log('SignalR err ' + err);
        setTimeout(() => { this.startConnection(); }, 3000);
      });
  }

  registerSignalEvents() {
    this.hubConnection.on('SignalMessage', (data: string) => {
      this.signalRecieved.emit(data);
    });
  }

}
