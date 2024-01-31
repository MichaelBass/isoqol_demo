

import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable,from, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Form } from './form';
import { FormItem } from './formItem';
import { FormDictionary } from './formDictionary';
import { Item } from './item';
import { Element } from './element';
import { Map } from './map';
import { Battery } from './battery';
import { PatientAssessment } from './patient_assessment';
import { AssessmentForm } from './assessment_form';

  const httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json','Authorization': 'Basic ' + btoa(environment.username +':' + environment.password)}) 
  };


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(environment.username +':' + environment.password)
  })
};


@Injectable({
  providedIn: 'root'
})
export class AcApiService {

  constructor(private http: HttpClient) {
    this.resetPatient();
  }

  log: string [] = [];
  patient_list: PatientAssessment[] = [];
  patient_listOID: AssessmentForm[] = [];
  screeningResponses: string[] = [];


  resetPatient(){
    this.patient_listOID = [];
    this.patient_listOID.push({"formOID":"71222D23-BECB-45EE-92C7-9F529BE63029","parameter":"?EngineAssembly=MSS.Engines&EngineType=MSS.Engines.SequenceEngine"});
    this.patient_listOID.push({"formOID":"68627F44-CA13-4183-8877-160782D7DB83"});
    this.patient_listOID.push({"formOID":"8E4AE6EF-9F5D-49EC-B552-5C83F33D0F2E","parameter":"?EngineAssembly=MSS.Engines&EngineType=MSS.Engines.SequenceEngine"});  
    this.patient_listOID.push({"formOID":"9BA1259E-11ED-42CB-B686-0EB81175236E"});
    
    this.patient_list = [];
    this.patient_list.push({"Description":"PROMIS Global General Health Item"});
    this.patient_list.push({"Description":"PROMIS Global Mental Health Items"});
    this.patient_list.push({"Description":"PROMIS Global Social Activities/Roles Item"});    
    this.patient_list.push({"Description":"PROMIS Global Physical Health Items"});  
  }

  activateAssessment(position:number){

    this.patient_list.forEach(item => {
      item.Active = false;
    })

    if(position > -1){
      this.patient_list[position].Active = true;
    }
  }

  updateScore(position:number, theta:string, stdError:string){
      this.patient_list[position].Theta = theta;
      this.patient_list[position].StdError = stdError;
  }

  logScreenerResponses(screeningResponses: string[]){
    this.screeningResponses = screeningResponses;
  }

  checkScreeningCriteria(response:string){

      let responses = response.split("&");
      if(responses.length){
          let lastResponse = responses[responses.length -1];
          let criteria_value = this.screeningResponses.indexOf(lastResponse);
 
          //add follow-up form
          if(criteria_value > -1){
              let itemID = lastResponse.split("=")[0];
              if(itemID == "Global01"){

              }
              if(itemID == "Global02"){

              }
              if(itemID == "Global04"){

              }
              if(itemID == "Global05"){
                //social satisfaction
                this.patient_listOID.push({"formOID":"36F00430-CC4C-4977-AE8A-0787B3C53AB8"});
                this.patient_list.push({"Description":"PROMIS Bank v1.0 - Social Sat Role"});
              }
              if(itemID == "Global10r"){ 
                this.patient_listOID.push({"formOID":"8F64582D-C19C-40E9-B470-4643D78AAE90"});
                this.patient_list.push({"Description":"PROMIS Bank v1.1 - Anger"});

                this.patient_listOID.push({"formOID":"C0DCB3EA-CFFD-4A77-9488-DBAF51225106"}); 
                this.patient_list.push({"Description":"PROMIS Bank v1.0 - Depression (recommended)"});
 
                this.patient_listOID.push({"formOID":"FFCDF6E3-8B17-4673-AB38-C677FFF6DBAF"}); 
                this.patient_list.push({"Description":"PROMIS Bank v1.0 - Anxiety"});
              }
              if(itemID == "Global09r"){
                this.patient_listOID.push({"formOID":"FEE4576A-D94F-4E85-8DAB-5A3181BB14CB"}); 
                this.patient_list.push({"Description":"PROMIS Bank v1.0 - Social Sat DSA"});
              }  
              if(itemID == "Global03"){

              } 
              if(itemID == "Global06"){
                this.patient_listOID.push({"formOID":"3EB8FC37-1874-4EBC-9504-69F47F2A72BF"}); 
                this.patient_list.push({"Description":"PROMIS Bank v2.0 - Physical Function (recommended)"});     
              }               
              if(itemID == "Global08r"){
                this.patient_listOID.push({"formOID":"2E58348D-A4E1-4667-AF7B-BC9891EE3609"}); 
                this.patient_list.push({"Description":"PROMIS Bank v1.0 - Fatigue (recommended)"});
              } 
              if(itemID == "Global07r"){
                // Pain Intensity and Pain Interference
                this.patient_listOID.push({"formOID":"572240E6-AA7D-4F45-BC20-E95422EBDB94"}); 
                this.patient_list.push({"Description":"PROMIS Bank v1.1 - Pain Interference (recommended)"});
 
                this.patient_listOID.push({"formOID":"7224FB55-81D7-4131-A136-8C89907CDFBB"}); 
                this.patient_list.push({"Description":"PROMIS Scale v1.0 - Pain Intensity 3a"});
              }    

                                                                                       
          }
      }

      
  }

  getDictionary(FormOID: string): Observable<FormDictionary>{ 
    return this.http.get<any>(environment.server + 'Forms/'+ FormOID + '.json',httpOptions).pipe( 
      map( (res: FormDictionary) => {
        return res;
      }
      )
    )
  }

  getNextItem2(FormOID: string, data: string): Observable<any>{

    let newlog: string = "POST : " +  environment.server + "StatelessParticipants/" + FormOID + ".json" + "</br>"
    newlog = newlog + "Data : " +  data.substring(0,data.length-1);

    this.checkScreeningCriteria(data.substring(0,data.length-1));
    this.log.push(newlog);

      return this.http.post<any>(environment.server + "StatelessParticipants/" + FormOID + ".json",data.substring(0,data.length-1) ,httpOptions2).pipe(
      map( (res: any) => {

      return res;
      }
      ),catchError(<T>(error: any, result?: T) => {
          console.log(error);
          return of(result as T);
        })
      );
  }

  getNextItem(FormOID: string, data: string, params?:string): Observable<any>{


    //let params = "?EngineAssembly=MSS.Engines&EngineType=MSS.Engines.SequenceEngine";
    let newlog: string = "POST : " +  environment.server + "StatelessParticipants/" + FormOID + ".json" + params + "</br>"
    newlog = newlog + "Data : " +  data.substring(0,data.length-1);
    
    this.checkScreeningCriteria(data.substring(0,data.length-1));
    this.log.push(newlog);

      return this.http.post<any>(environment.server + "StatelessParticipants/" + FormOID + ".json" + params,data.substring(0,data.length-1) ,httpOptions2).pipe(
      map( (res: any) => {

      return res;
      }
      ),catchError(<T>(error: any, result?: T) => {
          console.log(error);
          return of(result as T);
        })
      );
  }

  getCATS(): Observable<Form[]>{ 
    this.log.push( "GET : " +  environment.server + 'Forms/.json?Properties=true' + '</br>');
    return this.http.get<any>(environment.server + 'Forms/.json?Properties=true',httpOptions).pipe( 
     map( 
       forms => {return forms.Form.filter((r:Form) => r.Method === 'AfterSaveCAT');}
      ) 
    )
  }

  getScreenCATS(): Observable<Form[]>{
    return this.http.get<any>(environment.server + 'Forms/.json?Properties=true',httpOptions).pipe( 
     map( 
       forms => {return forms.Form.filter((r:Form) => r.Engine === 'CATEngineGRM_ScreenCAT');}
      ) 
    )
  }

  getPSERCATS(): Observable<Form[]>{ 
    return this.http.get<any>(environment.server + 'Forms/.json?Properties=true',httpOptions).pipe( 
     map( 
       forms => {return forms.Form.filter((r:Form) => r.Engine === 'CATEnginePSER');}
      ) 
    )
  }

}
