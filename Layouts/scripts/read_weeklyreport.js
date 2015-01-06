//  Tommi Tuominen
//  Project Work course work 2014
//

//var reportcontents = document.getElementById('reportContents');
var contents;

var headers = ["WEEKLY REPORT","TIME OF REPORT","CLIENT","PROJECT","DESCRIPTION","PROJECT MANAGERS","PHASE OF PROJECT",
                "REQUIREMENTS","COMPLETED TASKS","TASKS FOR THE NEXT WEEK","NEXT MILESTONE","UNIT TEST","OTHER TEST CASES",
                "CODE REVISIONS","PROBLEMS","WORKING HOURS (this week/so far)","ADDITIONAL INFORMATION"];

var keywords = ["#title","#time","#client","#project","#desc","#managers","#phase",
                "#req","#tasks_comp","#tasks_next","#milestone","#unit_test","#other_test",
                "#revisions","#problems","#hours","#additional"];
var selecteddiv;
var headerdiv;
var selectedbtn;


//Load defaults
initFields();

//Reads weekly report text file
    function readSingleFile(evt) {
        clearFields();
        var f = evt.target.files[0];
        var r = new FileReader();
        
        r.onload = function(e){
            contents = e.target.result;
    
            //Creates an array matching regex:
            var arrayOfLines = contents.match(/[^\r\n]+/g);
            
            //initFields();
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
        r.readAsText(f);
      }

    var reportData = {
        report_id: 1,
        project_id: 1,
        number_of_week: 4,
        project_manager: "John Doe",
        project_phase: "",
        completed_tasks: "",
        task_for_nextweek: "",
        schedule_status: "",
        next_milestone: "",
        working_hours: "",
        requirements: "",
        unit_testcases: "",
        other_testcases: "",
        code_revisions: "",
        problems: "",
        changes_in_project_plan: "",
        things_to_mention: ""
    };
    
    
    var projectid;
    var reportid;
       
    var projectname;
    var timeofreport;
    
    var client = [""];
    var description;
    
    //Weeklyreport info
    var managers = [""];
    var manageremails = [""];
    var phase = "";
    var completed_tasks = [""];
    var tasks_for
    
    var members = [""];
    var spenthours = [0];
    var totalhours = [0];
    
    
    //In the clicked function we get text from the text fields
    //TODO: Loop information from all of the text fields    
    function clicked(){
    var i = 0;
    
        if(document.getElementById("reportid").value != null && document.getElementById("projectid").value != null){
            
            projectid = document.getElementById("projectid").value;
            reportid = document.getElementById("reportid").value;

            //Project name
            if(document.getElementById("project_1")){
                projectname = document.getElementById("project_1").value;
            }else{
                console.log("error getting projectname!");
            }
            
            //Client name
            while(true){
            i++;
                if(document.getElementById("client_name_"+i)){
                    client[i] = document.getElementById("client_name_"+i).value;
                }else{
                    i = 0;
                    break;
                }
            }
            
            //Managers
            while(true){
            i++;
                if(document.getElementById("managers_name_"+i)){
                    managers[i] = document.getElementById("managers_name_"+i).value;
                    manageremails[i] = document.getElementById("managers_email_"+i).value;
                }else{
                    i = 0;
                    console.log("break");
                    break;
                }
            }           
            
            //Completed tasks
            if(document.getElementById("tasks_comp_1")){
                completed_tasks[0] = document.getElementById("tasks_comp_1").value;
            }else{
                console.log("error getting completed_tasks!");
            }
            
            //Tasks for the next week
            if(document.getElementById("tasks_next_1")){
                completed_tasks[0] = document.getElementById("tasks_next_1").value;
            }else{
                console.log("error getting tasks_next!");
            }
            
            //TODO:
            //Get milestone, unit_test, other_test, revisions, problems, additional info
        
            //Members
            if(document.getElementById("hours_names_1")){
                members[0] = document.getElementById("hours_names_1").value;
                spenthours[0] = document.getElementById("hours_spent_1").value;
                totalhours[0] = document.getElementById("hours_totalspent_1").value;
            }else{
                console.log("error getting hours!");
            }
    
            
            reportData = {
                
                //Weekly report data
                report_id: reportid,
                project_id: projectid,
                number_of_week: 4,
                project_manager: managers[0],
                project_phase: phase,
                completed_tasks: "x",
                task_for_nextweek: "x",
                schedule_status: "x",
                next_milestone: "x",
                working_hours: totalhours[0],
                requirements: "x",
                unit_testcases: "x",
                other_testcases: "x",
                code_revisions: "x",
                problems: "x",
                changes_in_project_plan: "x",
                things_to_mention: "x",
                
                //Individual data
                work_id: 0,
                member_id: 0,
                description: "x",
                hours: spenthours[0],
                date: "",
                
                //Project data
                project_name: projectname,
                created_on: "",
                updated_on: "",
                status: "x",
                version: "x",
 
                //Member data
                account: "x",
                password: "x",
                first_name: members[0],
                level_of_privileges: 1,
                email: "x",
                phonenumber: "x"
            };
            
        } 
    
    sendData();    
    }
    
    function sendData() {
        $.ajax({
            url : "database_in.php",
            type : "POST",
            data : reportData,
            success : function(reportData) {
                //console.log( data );
                //data - response from server
            },
            error : function(errorThrown) {
                console.log( reportData );
                console.log("error");
            },
        });
    }


    //Function used for clearing fields and divs
    function initFields(){
        clearFields();
        
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
        }    
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
        else if(detectedkey == "#desc" || detectedkey == "#phase"){
    
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
                    excludedRegex = arrayOfLines[k].replace(extractedRegex[0],'');
                    excludedRegex = excludedRegex.trim();
                    
                    CreateInput(excludedRegex, keywordsub+"_name", 0, counter, detectedkey, "text_input");
                    CreateInput(extractedRegex[0], keywordsub+"_email", 1, counter, detectedkey, "text_input");   
                }
                
                else if(detectedkey == "#project" || detectedkey == "#req" || detectedkey == "#tasks_comp" || detectedkey == "#tasks_next"){
                    CreateInput(arrayOfLines[k], keywordsub, 1, counter, detectedkey, "text_input", "text_input");
                }
                
                else if(detectedkey == "#desc" || detectedkey == "#phase"){
                    if(document.getElementById(keywordsub+"_"+i)){      
                        text += arrayOfLines[k-1]+"&#13;&#10;";
                        document.getElementById(keywordsub+"_"+i).innerHTML = text;
                    }else{    
                        document.getElementById(detectedkey+"_container").innerHTML +=
                        "<textarea type='text' id='"+keywordsub+"_"+i+"' style='width: 70%; height: 110px;'></textarea><br>";                      
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
    
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);