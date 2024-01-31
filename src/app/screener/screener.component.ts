
import { Component, OnInit } from '@angular/core';
import { AcApiService } from '../ac-api.service';

import { FormDictionary } from '../formDictionary';
import { Form } from '../form';
import { Item } from '../item';
import { Map } from '../map';
import { AssessmentForm } from '../assessment_form';


@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.css']
})
export class ScreenerComponent implements OnInit {

    selectedMap!: Map;

    patient_listOID: AssessmentForm[] = [];
    screeningItems: Item[] = [];
    screeningResponses: string[] = [];

   constructor(private ac_api: AcApiService) {}

    ngOnInit() {

      this.patient_listOID = this.ac_api.patient_listOID;
   
      for (let i = 0; i < this.patient_listOID.length; i++) {
          this.getDataDictionary(this.patient_listOID[i].formOID);
      } 
    }

    getDataDictionary(formOID:string): void{
      this.ac_api.getDictionary(formOID).subscribe(
        results => { 

          for (let i = 0; i < results.Items.length; i++) {
              this.screeningItems.push(results.Items[i]);
          }
        }
      ); 
    }

  onSelect(itemID: string, map: Map): void {
      this.selectedMap = map;
      map.Criteria = true;
      let data = itemID + "=" + this.selectedMap.Description;
      this.screeningResponses.push(data);
      this.ac_api.logScreenerResponses(this.screeningResponses);
  }

  clearCriteria(): void {
    this.screeningResponses = [];
    this.ac_api.logScreenerResponses(this.screeningResponses);

    for (let item of this.screeningItems) {
      for (let element of item.Elements) {
        if(element.Map){
         for (let map of element.Map) {
            map!.Criteria =false;
        }
        }      
      }        
    }

  }

}
