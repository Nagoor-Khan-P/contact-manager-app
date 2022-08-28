import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  private contactId : string | null = null;

  public loading: boolean=false;
  public contact:IContact;
  public errorMessage : string | null;
  public group:IGroup;

  constructor(private activatedRoute : ActivatedRoute, private contactService : ContactService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param : Params) => {
      this.contactId=param.get('contactId'); //getting id fron the url

      this.loading=true;
      this.contactService.getContactById(this.contactId).subscribe((data : IContact) => {
        this.contact=data;
        this.loading=false;
        this.contactService.getGroupById(data).subscribe((data) => {
          this.group=data;
        })
      },(error) => {
        this.errorMessage=error;
        this.loading=false;
      })
    })
  }

  public isEmpty(){
    return Object.keys(this.contact).length >0;
  }

  public isGroupEmpty(){
    return Object.keys(this.group).length > 0;
  }

}
