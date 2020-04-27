import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmmService } from '../smm.service';
import { checklistdata, submitQueAns, getUserWithNtnet, questionFileMap, question, answer } from '../smm-datastructure';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,ReactiveFormsModule,FormArray, NG_VALIDATORS } from '@angular/forms';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';

import { ThrowStmt } from '@angular/compiler';
import { element } from 'protractor';
declare const getntNet: any;
var ntnetvalue: string;

@Component({
  selector: 'app-prr',
  templateUrl: './prr.component.html',
  styleUrls: ['./prr.component.css']
})
//providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]

export class PrrComponent implements OnInit {
  public que1: number = 0;
  public displaydataque1: boolean = true;
  checklistdataarray: Array<checklistdata> = [];
  checklistdataobject = new checklistdata();
  public databinding: boolean = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  accountIdvar: number;
  ntnetAttributes: getUserWithNtnet;
  submitobject: submitQueAns;
  submitobject1: submitQueAns[] = [];
  arrQuestionFileMap: questionFileMap[] = [];
  selectedanswer: submitQueAns;
  selectedfileque1: File = null;
  httpService: any;
  fileUploaded:any;
  questiondatas:any[]=[];
  showDownloadButton:boolean=false;
  showUploadButton:boolean=true;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, public _smmservice: SmmService, private router: ActivatedRoute,private route:Router) {
    const ntnetValueForAolApproval  = this.router.snapshot.params['ntnetForAolApproval'];
    if(ntnetValueForAolApproval){
      ntnetvalue=ntnetValueForAolApproval
    }
    else{
      ntnetvalue=getntNet();
    }
   }

  selectedAnswerId: string;
  checklistDataArrayToFindSelectedAnswer: checklistdata[] = [];
  questionArray :question[]=[];
  selectedAnswerId1:number;
 
  ngOnInit() {
   
   
    // ntnetvalue = getntNet();
   // ntnetvalue = "miralk";
    this._smmservice.getUserWithNtnet(ntnetvalue).subscribe(data => {
      this.ntnetAttributes = data;
    });
    this._smmservice.getcheckedlistusingntnet(ntnetvalue).subscribe(data => {
      this.checklistdataarray = data;
      console.log("Checklistdataarry",this.checklistdataarray);
      debugger;
      for (const questionSet of this.checklistdataarray) {
        if (questionSet.status==null || questionSet.status=="DRAFT") {
          for (const questionObj of questionSet.question) {
            if (questionObj) {
              if(questionObj.checklistId && questionObj.fileName && questionObj.fileName!="null"){
                questionObj.checklistIdToShowDownloadButton=questionObj.checklistId;
                questionObj.fileNameToShowOnDownloadButton=questionObj.fileName;
                // if(questionObj.fileName && questionObj.fileName!="null"){
                // questionObj.fileName=questionObj.fileName
                // }
                this.showDownloadButton=true;
                              // questionObj.selectedDocument=questionObj.fileName
              }
              for (const answerObj of questionObj.answer) {
                if (answerObj.selected) {
                  questionObj.selectedAnswerId = answerObj.answerId;
                  
                 this.onSelectModify(questionSet.accountTeamMappingId,questionObj.questionId,questionObj.selectedAnswerId,answerObj.score,'null',questionSet.checklistId+""+questionObj.questionId)
                  break;
                }
              }
            }
          }
        }
        else{
          swal('You have already submitted checklist').then(() => {
            this.route.navigateByUrl('/')
          }); 
        }

      }
    });
  

  }



  onSelect(checklistData, questionData, unique: string, x : string) {

 // var selectedAnswerIdFromFormControl= this.checklistForm.controls['answersDropdown'].value;
    const selectedAnswer = questionData.answer.find((i) => i.answerId == questionData.selectedAnswerId);
    {
     // alert("ansid"+this.selectedAnswerId);
      //console.log("selecedans",selectedAnswer);
    };
    //console.log("selected answer",this.selectedanswer);
    // console.log("checklistdata",checklistData);
    // console.log("quesdata",questionData);
    if (selectedAnswer == undefined) {
      this.onSelectModify(checklistData.accountTeamMappingId, questionData.questionId, 0, 0, 'null', unique + "" + x);
    } else {
      this.onSelectModify(checklistData.accountTeamMappingId, questionData.questionId, selectedAnswer.answerId, selectedAnswer.score, 'null', unique + "" + x);
    }
  }


  onSelectModify(accTeamMappingIdVar: number, queIdVar: string, ansIdVar: number, scoreVar: number, docPathVar: string, index : string) {
    var tempobj: submitQueAns = {
      accountTeamMappingId: accTeamMappingIdVar,
      questionId: queIdVar,
      answerId: ansIdVar,
      score: scoreVar,
      documentPath: docPathVar,
      countFlag:0,
      flag:""
      
    };
    
    this.submitobject = tempobj;
    //console.log(this.submitobject);
    var findObj = this.arrQuestionFileMap.find(element => element.uniqueIndex == index);
    if(isNullOrUndefined(findObj)){
      var tempQFData : questionFileMap = {
        uniqueIndex: index,
        questionData: this.submitobject,
        fileData : null
      };
      this.arrQuestionFileMap.push(tempQFData);
    }  else {
      findObj.questionData = this.submitobject;
    }
    // this.submitobject1.push(tempobj);
    console.log(this.arrQuestionFileMap);
  }


  onSaveDraft() {
    
    if (this.arrQuestionFileMap.length == 0) {
      this._smmservice.submitquestionanswer(this.submitobject1);
    } else { 
      for (let i = 0; i < this.arrQuestionFileMap.length; i++) {
        var formData = new FormData();
        this.arrQuestionFileMap[i].questionData.countFlag=i; 
        this.arrQuestionFileMap[i].questionData.flag="DRAFT";
            if(this.arrQuestionFileMap[i].fileData != null){
              formData.append('file', this.arrQuestionFileMap[i].fileData);
              formData.append('jsonChecklist', JSON.stringify(this.arrQuestionFileMap[i].questionData));
              
              this.http.post('http://nitind03:8082/api/reportms/saveUpdateChecklistResponseWithFile', formData)
                .subscribe((response) => { }, (error) => {});
            }
            else{
              this.questiondatas.pop();
              this.questiondatas.push(this.arrQuestionFileMap[i].questionData)
              this.http.post('http://nitind03:8082/api/reportms/saveUpdateChecklistResponse',this.questiondatas)
                .subscribe((response) => { }, (error) => {
                });
            }
        
      }
    }
    swal('Checklist Saved Succesfully').then(() => {
      this.route.navigateByUrl('/')
    });
  }



  uploadFile(file, unique: string, x : string,form) {
    console.log("file",file);
    console.log("form",form);
    let index = unique + "" + x;   
    var findObj = this.arrQuestionFileMap.find(element => element.uniqueIndex == index);
    if(isNullOrUndefined(findObj)){
      var tempQFData : questionFileMap = {
        uniqueIndex: index,
        questionData: null,
        fileData : file[0]
      };
      this.arrQuestionFileMap.push(tempQFData);
    }  else {
      findObj.fileData = file[0];
    }
  }

  
  
  onsubmit() {
    if (this.arrQuestionFileMap.length == 0) {
      this._smmservice.submitquestionanswer(this.submitobject1);
    } else {
      
      for (let i = 0; i < this.arrQuestionFileMap.length; i++) {
        var formData = new FormData();
        this.arrQuestionFileMap[i].questionData.countFlag=i 
        this.arrQuestionFileMap[i].questionData.flag="SPOC_SUBMIT"
        if(this.arrQuestionFileMap[i].fileData != null){
        formData.append('file', this.arrQuestionFileMap[i].fileData);
        formData.append('jsonChecklist', JSON.stringify(this.arrQuestionFileMap[i].questionData));
        this.http.post('http://nitind03:8082/api/reportms/saveUpdateChecklistResponseWithFile', formData)
          .subscribe((response) => { }, (error) => {
          });
        }
        else{
          this.questiondatas.pop();
              this.questiondatas.push(this.arrQuestionFileMap[i].questionData)
              this.http.post('http://nitind03:8082/api/reportms/saveUpdateChecklistResponse',this.questiondatas)
                .subscribe((response) => { }, (error) => {
                });
        }
      }
    }
    swal('Checklist submitted Succesfully').then(() => {
      this.route.navigateByUrl('/')
    });
  }


  downloadFile(responseIdForFileDownload)
  {
    
      this._smmservice.downloadFileForSubmittedResponses(responseIdForFileDownload).subscribe(
     
      
   
        (resp)=>{
          var contentDisposition = resp.headers.get('content-disposition');
         var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].replace(/"/g, '').replace(/%20/g,' ').trim();
        //console.log('SUCCESS downloadFile(): ', resp);

        let blob:any = new Blob([resp.body], { type: 'text/json; charset=utf-8' })
        var downloadLink = document.createElement('a');
        downloadLink.href= window.URL.createObjectURL(blob);
        downloadLink.download = filename;
        
        downloadLink.click();
       
        } ,
 
      (err) => {
        console.log('ERROR in downloadFile(): ', err); 
      },
      

    );
    }
    
}

