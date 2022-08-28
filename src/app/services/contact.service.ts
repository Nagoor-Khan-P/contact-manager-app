import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { catchError } from 'rxjs/operators';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl : string = `http://localhost:7000`; //json-server url
  errorMsg: string;

  constructor(private httpClient : HttpClient) { }

  //GET method to get all contacts

  public getAllContacts():Observable<IContact[]>{
    let dataUrl : string =`${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleErrors));
  }

  //GET contact by ID

  public getContactById(contactId : string):Observable<IContact>{
    let dataUrl:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleErrors));
  }

  //method to create a contact

  public createContact(contact : IContact) : Observable<IContact>{
    let dataUrl : string =`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl,contact).pipe(catchError(this.handleErrors));
  }

  //method to update a contact

  public updateContact(contact : IContact, contactId : string) : Observable<IContact>{
    let dataUrl : string =`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl,contact).pipe(catchError(this.handleErrors));
  }


  //method to delete a contact

  public deleteContact(contactId : string) : Observable<{}>{
    let dataUrl : string =`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleErrors));
  }


  //method to get all the groups

  public getAllGrops():Observable<IGroup[]>{
    let dataUrl : string =`${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleErrors));
  }


  //method to get a single group

  public getGroupById(contact : IContact):Observable<IGroup>{
    let dataUrl:string=`${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleErrors));
  }

  //method to handle the server errors

  public handleErrors(error : HttpErrorResponse){
    let errorMessage : string='';
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage=`Error : ${error.error.message}`;
    }
    else{
      errorMessage = `Status : ${error.status} \n Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
