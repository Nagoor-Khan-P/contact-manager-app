import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading : boolean = false;
  public contacts : IContact[] = [];
  public errorMessage : string | null = null;



  constructor(private contactService : ContactService, private router : Router) { }

  ngOnInit() {
    this.getAllContactsFromServer();
  }

  public getAllContactsFromServer(){
    this.loading=true;
    this.contactService.getAllContacts().subscribe( (data : IContact[]) => {
      this.contacts=data;
      this.loading=false;//stopping the spinner
    }, (error) => {
      this.errorMessage=error;
      this.loading=false;
    })
  }

  public clickDeleteContact(contactId : string | undefined){
    this.loading=true;
    this.contactService.deleteContact(contactId).subscribe((data) => {
      this.getAllContactsFromServer();
      this.loading=false;
    }, (error) => {
      this.errorMessage=error;
      this.loading=false;
    })
  }

}
