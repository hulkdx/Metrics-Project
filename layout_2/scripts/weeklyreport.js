//  Tommi Tuominen
//  Project Work course work 2014
//

//var reportcontents = document.getElementById('reportContents');

var headers = ["WEEKLY REPORT","TIME OF REPORT","CLIENT","PROJECT","DESCRIPTION","PROJECT MANAGERS","PHASE OF PROJECT",
                "REQUIREMENTS","COMPLETED TASKS","TASKS FOR THE NEXT WEEK","NEXT MILESTONE","UNIT TEST","OTHER TEST CASES",
                "CODE REVISIONS","PROBLEMS","WORKING HOURS (this week/so far)","ADDITIONAL INFORMATION"];

var keywords = ["#title","#time","#client","#project","#desc","#managers","#phase",
                "#req","#tasks_comp","#tasks_next","#milestone","#unit_test","#other_test",
                "#revisions","#problems","#hours","#additional"];
var selecteddiv;
var headerdiv;
var selectedbtn;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
} 
today = mm+'.'+dd+'.'+yyyy;
document.write(today);


empty_report = "#title\nWEEKLY REPORT\n#time\nTIME OF REPORT\n#client\nCLIENT\n#project\nPROJECT\n#desc"+
"\nDESCRIPTION\n#managers\nPROJECT MANAGERS\n#phase\nPHASE OF PROJECT\n#req\nREQUIREMENTS\n"+
"#tasks_comp\nCOMPLETED TASKS\n#tasks_next\nTASKS FOR THE NEXT WEEK\n#milestone\nNEXT MILESTONE"+
"\n#unit_test\nUNIT TEST\n#other_test\nOTHER TEST CASES\n#revisions\nCODE REVISIONS\n#problems"+
"\nPROBLEMS\n#hours\nWORKING HOURS (this week/so far)\n#additional\nADDITIONAL INFORMATION";

//Load defaults
//initReport(empty_report);

var contents;
//Reads weekly report text file

function readSingleFile(evt) {
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0; i<files.length; i++) {
        contents += files[i];
  }
  
  console.log(contents);
  
  initReport(contents);
}

//document.getElementById('files').addEventListener('change', readSingleFile, false);

function initReport(contents){
 
    
//Creates an array matching regex:
//initFields();
var arrayOfLines = contents.match(/[^\r\n]+/g);
var emailregex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
var hashtagregex = /(^|\s)(#[a-z\d-]+)/;
var withouthashtag = "";   
var detectedkey = "";


//Loops thru the information searching for keywords:
//TODO: Make it more efficient       
    for(i = 0; i<arrayOfLines.length; i++){
        if(arrayOfLines[i].charAt(0) == "#"){
            
            detectedkey = arrayOfLines[i];

            document.getElementById("handledContents").innerHTML +=
            "<div class='maincontainer_div' type='text' id='"+detectedkey+"_maincontainer'>"+
                "<div class='header_div' type='text' id='header_"+i+"'>"+arrayOfLines[i+1]+         
                    "<input type='button' class='no-print' id='hidebtn"+i+"' media='print' onclick='hideSection(\""+detectedkey+"_container\",\"header_"+i+"\",\"hidebtn"+i+"\")' value='hide'/>"+
                    "<input type='button' class='no-print' id='addbtn"+i+"' media='print' onclick='addToSection(\""+detectedkey+"\")' value='add'/>"+
                "</div>"+
                "<div class='container_div' name='0' type='text' id='"+detectedkey+"_container' style='width: 100%; padding: 2px;'></div>"+
            "</div>";
            
            getData(i, emailregex, "client", arrayOfLines, detectedkey);
        }
    }
} 


    //Function used for clearing fields and divs
    function initFields(){
        clearFields();
        /*
        for(i = 0; i<headers.length; i++){
    
            detectedkey = keywords[i];
            
            if(keywords[i] != "#title" && keywords[i] != "#time"){
            document.getElementById("handledContents").innerHTML +=
            "<div class='maincontainer_div' type='text' id='"+detectedkey+"_maincontainer'>"+        
                "<div class='header_div' type='text' id='header_"+i+"'>"+headers[i]+
                    "<input type='button' class='no-print' id='hidebtn"+i+"' media='print' onclick='hideSection(\""+detectedkey+"_container\",\"header_"+i+"\",\"hidebtn"+i+"\")' value='hide' style='margin-right:2px; font-size:8pt; height:20px; float:right;'/>"+
                    "<input type='button' class='no-print' id='addbtn"+i+"' media='print' onclick='addToSection(\""+detectedkey+"\")' value='+' style='margin-right:2px; font-size:8pt; height:20px; float:right;'/>"+    
                "</div>"+
                "<div class='container_div' name='0' type='text' id='"+detectedkey+"_container' style='width: 100%; padding: 2px;'></div>"+
            "</div>";
            }else{
            document.getElementById("handledContents").innerHTML +=
            "<div class='' type='text' id='"+detectedkey+"_maincontainer'>"+        
                "<div class='header_div2' type='text' id='header_"+i+"' style=''>"+headers[i]+
                "</div>"+
                "<div class='' name='0' type='text' id='"+detectedkey+"_container' style='width: 100%; padding: 2px;'></div>"+
            "</div>";                   
            }
        }*/ 
    }
        
    function clearFields(){
        document.getElementById("handledContents").innerHTML = "";
    }
     
    
    function addToSection(detectedkey){
        
        var numofitems = document.getElementById(detectedkey+"_container").getAttribute("name");

        if(detectedkey == "#title"){
        }    
        else if(detectedkey == "#time"){
            CreateInput("",detectedkey.substr(1),1,parseInt(numofitems)+1,detectedkey,"text_input");
        } 
        else if(detectedkey == "#client" || detectedkey == "#managers"){
            CreateInput("",detectedkey.substr(1)+"_name",0,parseInt(numofitems)+1,detectedkey,"text_input");
            CreateInput("",detectedkey.substr(1)+"_email",1,parseInt(numofitems)+1,detectedkey,"text_input");
        } 
        else if(detectedkey == "#project" || detectedkey == "#req" || detectedkey == "#tasks_comp" || detectedkey == "#tasks_next"){
            CreateInput("",detectedkey.substr(1),1,parseInt(numofitems)+1,detectedkey,"text_input");
        }
        
        else if(detectedkey == "#hours"){
            CreateInput("",detectedkey.substr(1)+"_name",0,parseInt(numofitems)+1,detectedkey,"text_input");
            CreateInput("",detectedkey.substr(1)+"_spent",0,parseInt(numofitems)+1,detectedkey,"hour_input");
            CreateInput("",detectedkey.substr(1)+"_total",1,parseInt(numofitems)+1,detectedkey,"hour_input");
        }
    }
    
    function hideSection(targetid, headerid, btnid){
  
        selecteddiv = document.getElementById(targetid);
        headerdiv = document.getElementById(headerid);
        selectedbtn = document.getElementById(btnid);
        
        if(selecteddiv.style.display == "none"){
            selectedbtn.value = "hide";
            selectedbtn.style.color = "#000000";
            headerdiv.style.color = "#3F3F3F";
            selecteddiv.style.display = 'block';
        }else{
            selectedbtn.value = "show";
            selectedbtn.style.color = "gray";
            headerdiv.style.color = "silver";
            selecteddiv.style.display = 'none';  
        }
        
    }
    
    function CheckForKeyWord(input){
        var result = false;
        
        for(i=0;keywords.length;i++){
            if(keywords[i] == input){
                result = true;
            }     
        }
        
        return result;
    }
    
    //Function used for displaying the data
    //Loops thru sub categories
    function getData(i, regex, idprefix, arrayOfLines, detectedkey){   
        var extractedRegex = "";
        var excludedRegex = "";
        var text = "";
        var keywordsub = detectedkey.substr(1);
        var counter = 1;
        var hoursRegex = /\d+\/\d+/;
        var textRegex = /[a-zA-Z]*\s+[a-zA-Z]*/;
        var extractedHours = "";
        var excludedHours = "";
        
        for(k = i+2; k<arrayOfLines.length; k++){

            if(arrayOfLines[k].charAt(0) == "#"){
                counter = 0;
                break;
            }else{
    
                if(detectedkey == "#title"){
                }
                
                else if(detectedkey == "#time"){   
                    CreateInput(arrayOfLines[k], "time", 1, counter, detectedkey, "text_input");    
                }
                
                else if(detectedkey == "#client" || detectedkey == "#managers"){
                    
                    //Gets email from the string
                    //Separates email from name
                    extractedRegex = regex.exec(arrayOfLines[k]);
                    
                    if(extractedRegex != null){
                        excludedRegex = arrayOfLines[k].replace(extractedRegex[0],'');
                        excludedRegex = excludedRegex.trim();
                    }else{
                        extractedRegex = ""; 
                    }
                    CreateInput(excludedRegex, keywordsub+"_name", 0, counter, detectedkey, "text_input");
                    CreateInput(extractedRegex[0], keywordsub+"_email", 1, counter, detectedkey, "text_input");   
                }
                
                else if(detectedkey == "#project" || detectedkey == "#req" || detectedkey == "#tasks_comp" || detectedkey == "#tasks_next"){
                    CreateInput(arrayOfLines[k], keywordsub, 1, counter, detectedkey, "text_input", "text_input");
                }
                
                else if(detectedkey == "#desc"){
                    if(document.getElementById("weekly_description")){
                        text += arrayOfLines[k-1]+"&#13;&#10;";
                        document.getElementById("weekly_description").innerHTML = text;
                    }else{    
                        document.getElementById(detectedkey+"_container").innerHTML +=
                        "<textarea type='text' id='weekly_description' style='width: 70%; height: 110px;'></textarea><br>";                      
                    }
                }
                
                else if(detectedkey == "#phase"){
                    if(document.getElementById("weekly_phase")){
                        text += arrayOfLines[k-1]+"&#13;&#10;";
                        document.getElementById("weekly_phase").innerHTML = text;
                    }else{    
                        document.getElementById(detectedkey+"_container").innerHTML +=
                        "<textarea type='text' id='weekly_phase' style='width: 70%; height: 110px;'></textarea><br>";                      
                    }
                }
                
                else if(detectedkey == "#additional"){
                    if(document.getElementById("weekly_additional")){
                        text += arrayOfLines[k-1]+"&#13;&#10;";
                        document.getElementById("weekly_additional").innerHTML = text;
                    }else{    
                        document.getElementById(detectedkey+"_container").innerHTML +=
                        "<textarea type='text' id='weekly_additional' style='width: 70%; height: 110px;'></textarea><br>";                      
                    }
                }
  
                else if(detectedkey == "#hours"){
                       
                    extractedHours = hoursRegex.exec(arrayOfLines[k]);
                    excludedHours = arrayOfLines[k].replace(extractedHours,'');
                    excludedHours = excludedHours.trim();
                    
                    if(extractedHours != null){    
                        var splithours = extractedHours[0].split("/");
                        CreateInput(excludedHours, keywordsub+"_name", 0, counter, detectedkey, "text_input");
                        CreateInput(splithours[0], keywordsub+"_spent", 0, counter, detectedkey, "hour_input");
                        CreateInput(splithours[1], keywordsub+"_total", 1, counter, detectedkey, "hour_input");                        
                    }else{
                        CreateInput(excludedHours, keywordsub+"_names", 1,""+i+"_"+counter, detectedkey, "text_input");   
                    }
                }
                
                counter++;
            }
        } 
    }
    
var br = "";
var placeholder = "";

//Function used for creating input text fields
function CreateInput(text,idprefix,order,counter,detectedkey,classname){
     
    if(idprefix == "client_name" || idprefix == "managers_name" || idprefix == "hours_name"){
        placeholder = "Name";
    }else if(idprefix == "client_email" || idprefix == "managers_email"){
        placeholder = "Email";
    }else if(idprefix == "project"){
        placeholder = "Project name";
    }else if(idprefix == "req"){
        placeholder = "Requirement";
    }else if(idprefix == "tasks_comp"){
        placeholder = "Completed task";
    }else if(idprefix == "tasks_next"){
        placeholder = "Task for next week";
    }else if(idprefix == "hours_spent"){
        placeholder = "h spent";
    }else if(idprefix == "hours_total"){
        placeholder = "h total";
    }
    
    var container = document.getElementById(detectedkey+"_container");
    var input = document.createElement("input");
    input.type = "text";
    input.className = classname;
    input.setAttribute("value", text);
    input.id = idprefix+"_"+counter;
    input.placeholder = placeholder;
    container.appendChild(input);   
    
    if(order == 0){
        br="";
    }else{
        container.appendChild(document.createElement("br"));
        br="<br>";
    }
    
    document.getElementById(detectedkey+"_container").setAttribute("name",counter);
}

    var projectid;
    var reportid; 
    var projectname;
    var timeofreport;
    var client = [];
    var description; 
    var phase = "";
    
    //Weeklyreport info
    var otherinfo = [];
    var managers = [];
    var manageremails = [];
    var requirements = [];
    var completed_tasks = [];
    var tasks_next = [];
    var members = [];
    var spenthours = [0];
    var totalhours = [0];
    var finalObject = [];

    /*---------------------
    
    Function for getting
    all the data from fields
     
    -----------------------*/
    
    function clicked(){
    var i = 0;
    
        if(document.getElementById("reportid").value != null && document.getElementById("projectid").value != null){
            
            projectid = document.getElementById("projectid").value;
            reportid = document.getElementById("reportid").value;

            //Project name
            if(document.getElementById("project_1")){
                otherinfo.push({project_name: document.getElementById("project_1").value});
            }else{
                console.log("error getting projectname!");
            }
            
            //Client name
            while(true){
            i++;
                if(document.getElementById("client_name_"+i)){
                    client.push({name: document.getElementById("client_name_"+i).value, email: document.getElementById("client_email_"+i).value});
                }else{
                    i = 0;
                    break;
                }
            }
            
            //Managers
            while(true){
            i++;
                if(document.getElementById("managers_name_"+i)){
                    managers.push({name:document.getElementById("managers_name_"+i).value, email: document.getElementById("managers_email_"+i).value });
                }else{
                    i = 0;
                    break;
                }
            }           
            
            //Requirements
            while(true){
            i++;
                if(document.getElementById("req_"+i)){
                    requirements.push({name:document.getElementById("req_"+i).value});
                }else{
                    i = 0;
                    break;
                }
            }
            
            //Completed tasks
            while(true){
            i++;
                if(document.getElementById("tasks_comp_"+i)){
                    completed_tasks.push({name:document.getElementById("tasks_comp_"+i).value});
                }else{
                    i = 0;
                    break;
                }
            }
            
            //Next tasks
            while(true){
            i++;
                if(document.getElementById("tasks_next_"+i)){
                    tasks_next.push({name:document.getElementById("tasks_next_"+i).value});
                }else{
                    i = 0;
                    break;
                }
            }           
            
            
            finalObject = {
                otherinfo: otherinfo,
                client: client,
                managers: managers,
                description: "description text",
                phase: "phase text",
                requirements: requirements,
                completed_tasks: completed_tasks,
                tasks_next: tasks_next
            }
            
            console.log(JSON.stringify(finalObject));            
        } 
    
    sendData();    
    }
    
    /*---------------------
    
    AJAX sends finalObject to
    databse_id.php
 
    -----------------------*/
    
    function sendData() {
        $.ajax({
            url : "database_in.php",
            dataType   : "json",
            contentType: "application/json",      
            type : "POST",
            data : JSON.stringify(finalObject),
            success : function(finalObject) {
                //console.log( data );
                //data - response from server
            },
            error : function(errorThrown) {
                console.log( finalObject );
                console.log("error");
            },
        });
    }
 
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);