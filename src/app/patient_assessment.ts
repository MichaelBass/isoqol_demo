export class PatientAssessment {  
  Description!: string;
  Active?: boolean;
  Theta?: string;
  StdError?: string; 

  constructor(description:string){
    this.Description = description;
  }
}