import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading : boolean =false;
  public contactId : string | null=null;
  public contact: IContact ={} as IContact;
  public errorMessage : string | null =null;
  public groups : IGroup[] =[] as IGroup[];

  constructor(private contactService : ContactService, private activatedRoute: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param : Params) => {
      this.contactId=param.get('contactId'); //use ativatedRoute and parammap to get id from the url 

      this.loading=true;
      this.contactService.getContactById(this.contactId).subscribe((data) => {
        this.contact=data;
        this.loading=false;
        this.contactService.getAllGrops().subscribe((data : IGroup[]) => {
          this.groups=data;
        })
      },(error) => {
        this.errorMessage=error;
        this.loading=false;
      })
    })
  }

  public updateSubmit(){
    this.contactService.updateContact(this.contact,this.contactId).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage=error;
      this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
    })
  }

}
