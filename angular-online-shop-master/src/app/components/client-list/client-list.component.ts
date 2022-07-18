import { Component, OnInit } from '@angular/core';
import {Client} from '../../common/client';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.listClients();
  }
  listClients() {
    this.clientService.getClientList().subscribe(data => {
      this.clients = data;
    });
  }

  updateCategory(): void {
    this.clientService.getClientList().subscribe(response => {
      this.clients = response;
    });
  }
  onDeleteClient(id: number): void {
    const shouldDelete = confirm('Are you sure you want to delete it?');
    if (shouldDelete) {
      this.clientService.delete(id).subscribe(response => {
        this.updateCategory();
      }, (err) =>{
        console.log(err);
        alert("An error occured. Please try again")
      });
    }
  }
}
