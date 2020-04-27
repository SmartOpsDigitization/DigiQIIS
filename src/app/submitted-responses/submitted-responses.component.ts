import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SmmService } from '../smm.service';
import { team,viewChecklistResponses, teamsChecklistResponse, questionChecklistResponse } from '../smm-datastructure';
import { DomSanitizer } from '@angular/platform-browser';
import { type } from 'os';
import { FileService } from '../file.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-submitted-responses',
  templateUrl: './submitted-responses.component.html',
  styleUrls: ['./submitted-responses.component.css']
})
export class SubmittedResponsesComponent implements OnInit {

  viewChecklistResponsesObject:viewChecklistResponses;
  accountId:number;
  accountName:string;
  teamsForChecklistResponsesArray:teamsChecklistResponse[];
  teamSelectedToViewResponses:teamsChecklistResponse = {};
  accountIdToViewSubmittedResponses:number;
  teamIdToViewSubmittedResponses:number;
  questionArray:questionChecklistResponse[];
  responseId:number;
  header: string = "Responses";
  quarterId:number;

  constructor(private router: ActivatedRoute,public _smmservice : SmmService,private sanitizer: DomSanitizer,private fileService: FileService) { }

  ngOnInit() {
    // this.accountIdToViewSubmittedResponses  = +this.router.snapshot.params['accountId'];
    
    this.accountId  = +this.router.snapshot.params['accountId'];
    this.teamIdToViewSubmittedResponses  = +this.router.snapshot.params['teamId'];
    this.quarterId=+this.router.snapshot.params['quarterId'];
    this._smmservice.viewChecklistResponses(this.accountId,this.quarterId).subscribe(data => {
      this.viewChecklistResponsesObject = data;
      console.log('DATA: ', this.viewChecklistResponsesObject);
      this.accountName=this.viewChecklistResponsesObject.accountName;
      this.teamsForChecklistResponsesArray=this.viewChecklistResponsesObject.teams;
      console.log('Teams and questions: ', this.teamsForChecklistResponsesArray);
      this.teamSelectedToViewResponses = this.teamsForChecklistResponsesArray.find(i => i.teamId == this.teamIdToViewSubmittedResponses);
      console.log('Teamselected: ', this.teamSelectedToViewResponses);

      this.questionArray=this.teamSelectedToViewResponses.questions
      console.log("questions",this.questionArray);
    });

    
  }

 downloadFile(Id:number){
    this.responseId=Id;
    var respfile:File;
    this._smmservice.downloadFileForSubmittedResponses(this.responseId).subscribe(  
        (resp)=>{
          var contentDisposition = resp.headers.get('content-disposition');
         var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].replace(/"/g, '').replace(/%20/g,' ').trim();
        console.log('SUCCESS downloadFile(): ', resp);

        let blob:any = new Blob([resp.body], { type: 'text/json; charset=utf-8' })
        var downloadLink = document.createElement('a');
        downloadLink.href= window.URL.createObjectURL(blob);
        downloadLink.download = filename;
        
        downloadLink.click();
       
        } 
               /* data => {
                  var binaryData = [];
                  binaryData.push(data);
                  var downloadLink = document.createElement('a');
                  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData));
                  // document.body.appendChild(downloadLink);
          
                  downloadLink.download = downloadLink.href;
                  downloadLink.click();
                  // window.URL.revokeObjectURL(downloadLink.href);
                  } */,
 
      (err) => {
        console.log('ERROR in downloadFile(): ', err); 
      },
      

    );
    }
   

  
  // downloadFile(Id:number) {
  //   this.responseId=Id;
  //   this.fileService.downloadFile(this.responseId).subscribe(response => {
	// 		let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
	// 		const url= window.URL.createObjectURL(blob);
	// 		window.open(url);
	// 		window.location.href = response.url;
	// 		//fileSaver.saveAs(blob, 'employees.json');
	// 	}), error => console.log('Error downloading the file'),
  //                () => console.info('File downloaded successfully');
  // }

  
  

}
