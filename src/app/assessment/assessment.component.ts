import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AcApiService } from '../ac-api.service';
import { Item } from '../item';
import { Map } from '../map';
import { Response } from '../response';
import { Form } from '../form';
import { FormItem } from '../formItem';
import { AssessmentForm } from '../assessment_form';


@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit,OnChanges {

  @Input() FormOID: string = "";
  @Output() emitter:EventEmitter<number> = new EventEmitter<number>(); 
    
  selectedMap!: Map;
  cumulativeResponses: string = "";
  form!: Form ;
  formItem!:FormItem;

  count: number = 0;

  patient_list: AssessmentForm[] = [];
  assessment_count: number = 0;

  constructor(private acService: AcApiService, private router: Router) { }

   
    ngOnChanges(changes: SimpleChanges) {
      const formOID = changes['FormOID'];
      if(formOID !== undefined){
        this.FormOID = formOID.currentValue;
        this.getNextItem();
      }
    }
    

    ngOnInit() {
      this.patient_list = this.acService.patient_listOID;
      //this.cumulativeResponses = "";
      //this.count = 0;
      // this.getNextItem();
    }

    getNextItem(){
      if(this.FormOID !== undefined){

      this.acService.activateAssessment(this.assessment_count);

        if( this.patient_list[this.assessment_count].parameter ){ // screening measures
          this.acService.getNextItem(this.FormOID, this.cumulativeResponses, this.patient_list[this.assessment_count].parameter).subscribe(
            data => { 
              this.formItem = data;
            }
          );
        }

        if( !this.patient_list[this.assessment_count].parameter ){ // follow-up measures
        this.acService.getNextItem2(this.FormOID, this.cumulativeResponses).subscribe(
          data => { 
            this.formItem = data;
          }
        );
       }

      } else {
        this.acService.activateAssessment(-1);
        this.FormOID = "";

      }
    }

  onBegin():void{
      this.assessment_count = 0;
      this.cumulativeResponses = "";
      this.count = 0;
      this.FormOID = this.patient_list[this.assessment_count].formOID;
      this.getNextItem();
  }

  onSelect(map: Map): void {
    this.selectedMap = map;
    let data = this.formItem.Items[0].ID + "=" + this.selectedMap.Description + "&";

    this.cumulativeResponses = this.cumulativeResponses + data;


    if( this.patient_list[this.assessment_count].parameter ){ // screening measures
    
      this.acService.getNextItem(this.FormOID, this.cumulativeResponses, this.patient_list[this.assessment_count].parameter).subscribe(
        data => { 

          this.formItem = data;
          this.count = this.count + 1;
          this.emitter.emit(this.count);

          //handle item - non scored items
          //if(this.formItem.Items[0].ID == "Global01" || this.formItem.Items[0].ID == "Global09r" || this.formItem.Items.length == 0 ){

          if(this.formItem.Items.length == 0 ){  

            this.acService.updateScore(this.assessment_count, 'N/A', 'N/A');
            this.assessment_count = this.assessment_count + 1;
            this.cumulativeResponses = "";
            this.count = 0;
            if(this.patient_list.length == this.assessment_count ){
              this.acService.activateAssessment(-1);
              this.FormOID = "";
            }else{
              this.FormOID = this.patient_list[this.assessment_count].formOID;
              this.getNextItem();
            }
          }
        }
      );
     } 

    if( !this.patient_list[this.assessment_count].parameter ){ // follow-up measures
  
      this.acService.getNextItem2(this.FormOID, this.cumulativeResponses).subscribe(
        data => { 

          this.formItem = data;
          this.count = this.count + 1;
          this.emitter.emit(this.count);

          //handle item - non scored items
          //if(this.formItem.Items[0].ID == "Global01" || this.formItem.Items[0].ID == "Global09r" || this.formItem.Items.length == 0 ){

          if(this.formItem.Items.length == 0 ){ 

            this.acService.updateScore(this.assessment_count, this.calcTScore(this.formItem.Theta), this.calcError(this.formItem.StdError));

            this.assessment_count = this.assessment_count + 1;
            this.cumulativeResponses = "";
            this.count = 0;

            if(this.patient_list.length == this.assessment_count ){
              this.acService.activateAssessment(-1);
              this.FormOID = "";
            }else{
              this.FormOID = this.patient_list[this.assessment_count].formOID;
              this.getNextItem();
            }
            
          }
        }
      );
    }
    }

  calcTScore(theta:string):string{
      return String(Math.round(parseFloat(theta) * 10.0 + 50.0));
      console.log(theta);
  } 

  calcError(error:string):string{
      return String(Math.round(parseFloat(error) * 10.0));
      console.log(error);
  } 

}




