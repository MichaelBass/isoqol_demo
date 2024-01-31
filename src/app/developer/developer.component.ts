import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { AcApiService } from '../ac-api.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {

  @Input() FormOID!: string;
  @Input() count: number = 0;


  log: string []= [];

  constructor(private ac_api: AcApiService) {}

  ngOnChanges(changes: SimpleChanges) {

    const formOID = changes['FormOID'];
    if(formOID !== undefined){
      this.log = this.ac_api.log;
    }
  
    const _count = changes['count'];
    if(_count !== undefined){
      this.log = this.ac_api.log;
    }
  }

  ngOnInit() {
    this.log = this.ac_api.log;
  }
}
