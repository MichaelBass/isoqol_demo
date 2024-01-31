import { Component, OnInit, ViewChild} from '@angular/core';
import { AcApiService } from '../ac-api.service';

import { FormDictionary } from '../formDictionary';
import { Form } from '../form';
import { Item } from '../item';
import { PatientAssessment } from '../patient_assessment';

import { ScreenerComponent} from '../screener/screener.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

@ViewChild(ScreenerComponent) child! : ScreenerComponent;

  cats!: Form[];
  psers!: Form[];
  screens!: Form[];

  FormOID!: string;
  count: number = 0; 

  patient_list: PatientAssessment[] = [];

  displayDeveloper: boolean = false;

  clearCriteria(){  
      this.child.clearCriteria();
  }

  clearQuestionnaire(){
      this.ac_api.resetPatient();
      this.patient_list = this.ac_api.patient_list;
  }

 constructor(private ac_api: AcApiService) {
    this.displayDeveloper = false;
 }

  ngOnInit() {

    this.patient_list = this.ac_api.patient_list;

    this.ac_api.getCATS().subscribe(
      results => { this.cats = results; }
    );

    this.ac_api.getScreenCATS().subscribe(
      results => { this.screens = results; }
    );

    this.ac_api.getPSERCATS().subscribe(
      results => { this.psers = results; }
    );  
  }




  onSelected(value:string): void {
    this.FormOID = value;
  }

  send(_count:number){ 
    this.count = _count; 
  } 

  toggleDeveloper(): void {
    this.displayDeveloper = !this.displayDeveloper;
  }

}
