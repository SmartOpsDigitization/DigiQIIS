export class getaccountname{
    accountId:number;
    accountName:string;
    aolName:string;
}

export class getallaols{
    aolName:string;
}

export class getteamname {
	teamname:string;
}

export class checklistdata{
	checklistId:number;
	accountTeamMappingId:number;
	checklistname:string;
	accountId:number;
	accountName:string;
	teamId:number;
    teamName:string;
	processid:number;
	processName:string;
	status:string;
	question?:Array<question>;

}

export class question {
	questionId:string;
	checklistId:number;
	question:string;
	answer?:Array<answer>;
	selectedAnswerId:number;
	selectedDocument?:File;
	fileName?:string;
	checklistIdToShowDownloadButton?:number;
	fileNameToShowOnDownloadButton?:string;
}

export class answer{
	answerId:number;
	answer:string;
	score:number;
	selected:string;
}

export class checklistdatapass{
	processid:number;
}

export class team{
	teamId:number;
	teamName:string;
}


export interface ResponseMessage {
	responseMessage: string;
}

export class process1{
	processId : number;
	processName : string;
}

export class processupdate{
	processId:number;
	processName:string;
}

export class checkedlist{
	checklistId:number;
	checklistName:string;
	checklist_details:string;
	processId:number
}

export class teams{
	teamId:number;
	teamName:string;
	spoc:string;
	reason:string;
}

export class accountsetup{
	accountId:number;
	accountName:string;
	teams:teams[];
}

export class questionadd{
	questionId:number;
	question:string;
	checklistId:number;
	answer:answer[];
}

export class answerupdate{
	answer:string;
	score:number;
}

export class deletequestionid{
	questionid:number;
}

export class accountteammapping{
	id?:number;
	accountId?:number;
	accountName?:string;
	teams?:Array<teamsaveaccount>;
}

export class teamsaveaccount{
	teamId:number;
	teamName:string;
	spoc:string;
	reason:string;
	status:string;
	rejectionReason:string;
}
export class submitSmmAccountSetup
{
	id?:number;
	accountId?:number;
	accountName?:string;
	teams?:Array<teamprocessmappingforSSM>;
}
export class teamprocessmappingforSSM {
	teamId:number;
	teamName:string;
	spoc:string;
	reason:string;
	status : string;
	rejectionReason : string;
	process :Array<process1> 
}

//hm879b
export class submitQueAns{
	accountTeamMappingId:number;
	questionId:string;
	answerId:number;
	score:number;
	documentPath:string;
	countFlag:number;
	flag:string;
}
//hm879b
export class questionFileMap{
	uniqueIndex: string;
	questionData: any;
	fileData: any;
}
//hm879b
export class submitsmmprocessselection
{
	accountId:number;
	teamId:number;
	spoc:string;
	reason:string;
}
//hm879b
export class processteammap{
	accountId?:number;
	teamId?:number;
	teamName?:string;
	responseMessage?:string;
	process?:Array<process>;
}
export class process{
	processId ?: number;
	processName ?: string;
}




export class email{
	email:string;
}

//hm879b
//Display scores
export class displayScores{
	accountId?:number;
	accountName?:string;
	quarterWiseScore?:Array<quarterWiseScore>;
}

export class quarterWiseScore{
	quarterName?:string;
	minScore?:number;
	maxScore?:number;
	avgScore?:number;
	quarterId?:number;
	year?:string;
}

export class getUserWithNtnet{
  
	empId?:number;
	name?:string;
	email?:string;
	ntNet?:string;
	role?:string;
	designation?:string;
}



// ----------------------------------------------------------------------------------
export class viewChecklistResponses{
	accountId?:number;
	accountName?:string;
	teams?:Array<teamsChecklistResponse>
}
export class teamsChecklistResponse{
	teamId?:number;
	teamName?:string;
	spoc?:string;
	questions?:Array<questionChecklistResponse>
}
export class questionChecklistResponse{
	responseId:number;
	questionId:number;
	question:string;
	answerId:number;
	answer:string;
	score:number;
	filename:string;
	comments:string;
}

