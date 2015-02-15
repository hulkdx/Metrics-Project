/*
Tommi Tuominen and Jueran Huang
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 14.2.2015
This file includes functions for loading a text file,
parsing it and creating input fields. The data is then
constructed into an object that is sent forward to the
server. Uses Ajax for connection with database_in.php
---------------------------
TODO:
optimization and increased usability of the tool.
User messages and error handling.
*/

var contents;

var headers = ["WEEKLY REPORT","TIME OF REPORT","CLIENT","PROJECT","DESCRIPTION","PROJECT MANAGERS","PHASE OF PROJECT",
               "REQUIREMENTS","COMPLETED TASKS","TASKS FOR THE NEXT WEEK","NEXT MILESTONE","PASSED UNIT TEST CASES","TOTAL UNIT TEST CASES",
               "PASSED OTHER TEST CASES","TOTAL OTHER TEST CASES","CODE REVISIONS","PROBLEMS","WORKING HOURS (this week/so far)","ADDITIONAL INFORMATION"];

var keywords = ["#title","#time","#client","#project","#desc","#managers","#phase",
               "#req","#tasks_comp","#tasks_next","#milestone","#passed_unit_test","#total_unit_test","#passed_other_test","#total_other_test",
               "#revisions","#problems","#hours","#additional"];

var statuses = ["----New----","--In_progress--","--Resolved--","--Feedback--","---Closed---","--Rejected--"];

var selecteddiv;
var headerdiv;
var selectedbtn;
 
// Gets today's date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; // January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'.'+dd+'.'+yyyy;

// Load defaults
initFields();


/*----------------

Text file parser.
Called after choosing a text file.

-----------------*/

    function readSingleFile(evt) {
        clearFields();
        var f = evt.target.files[0];
        var r = new FileReader();
        
        r.onload = function(e){
        contents = e.target.result;

        // Creates an array matching regex:
        var arrayOfLines = contents.match(/[^\r\n]+/g);
        
        // Regex patterns used for matching certain strings
        var emailregex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        var hashtagregex = /(^|\s)(#[a-z\d-]+)/;
        
        var withouthashtag = "";   
        var detectedkey = "";
        var divs_open = "";
        var divs_close = "";
        
        var buttons = "";
        
        // Loops thru the information searching for keywords:
        // TODO: Make it more efficient
            for(i = 0; i<arrayOfLines.length; i++){
                if(arrayOfLines[i].charAt(0) == "#"){
                    
                    detectedkey = arrayOfLines[i];
                    
                    divs_open = "<div class='maincontainer_div' type='text' id='"+detectedkey+"_maincontainer'>"+
                                "<div class='header_div' type='text' id='header_"+i+"'>"+arrayOfLines[i+1];
                    
                    buttons = "<input type='button' class='no-print' id='hidebtn"+i+"' media='print' onclick='hideSection(\""+detectedkey+"_container\",\"header_"+i+"\",\"hidebtn"+i+"\")' value='hide'/>"+
                            "<input type='button' class='no-print' id='addbtn"+i+"' media='print' onclick='addToSection(\""+detectedkey+"\")' value='add'/>";
                    
                    divs_close = "</div><div class='container_div' name='0' type='text' id='"+detectedkey+"_container' style='width: 100%; padding: 2px;'></div>"+
                                "</div>";
                    
                    if(detectedkey != "#time" && detectedkey != "#title"){
                        document.getElementById("handledContents").innerHTML += divs_open+buttons+divs_close;
                    }else{
                        document.getElementById("handledContents").innerHTML += divs_open+divs_close;
                    }
                    getData(i, emailregex, "client", arrayOfLines, detectedkey);
                }
            }
        }
        r.readAsText(f);
      }

    // Function used for clearing fields and divs
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

/* Function used for adding input fields into the report */
function addToSection(detectedkey){
        
        var numofitems = document.getElementById(detectedkey+"_container").getAttribute("name");
        var subkey = detectedkey.substr(1);
        
        if(detectedkey == "#title"){
        }    
        else if(detectedkey == "#time" || detectedkey == "#project"){
            if(!document.getElementById(subkey+"_0")){
                CreateInput("",subkey,1,0,detectedkey,"text_input");
            }
        } 
        else if(detectedkey == "#client" || detectedkey == "#managers"){
            CreateInput("",subkey+"_name",0,parseInt(numofitems)+1,detectedkey,"text_input");
            CreateInput("",subkey+"_email",1,parseInt(numofitems)+1,detectedkey,"text_input");
        }
        
        else if(detectedkey == "#tasks_comp" || detectedkey == "#tasks_next"){
            CreateInput("",subkey,1,parseInt(numofitems)+1,detectedkey,"text_input");
        }
        else if(detectedkey == "#req"){
        	CreateInput("",subkey+"_name",0,parseInt(numofitems)+1,detectedkey,"text_input");
        	// CreateInput("",subkey+"_status",1,parseInt(numofitems)+1,detectedkey,"text_input");
            CreateInput("", subkey+"_status", 1, parseInt(numofitems)+1, detectedkey, "dropdown");
        }
        else if(detectedkey == "#milestone" || detectedkey == "#revisions" || detectedkey == "#problems"){
        	if(!document.getElementById(subkey)){
        	CreateInput("",subkey,1,parseInt(numofitems)+1,detectedkey,"text_input");
        	}
        }
        else if(detectedkey == "#total_unit_test" || detectedkey == "#total_other_test"|| detectedkey == "#passed_unit_test" || detectedkey == "#passed_other_test"){
        	if(!document.getElementById(subkey+"_0")){
                CreateInput("",subkey,1,0,detectedkey,"text_input");
        	}
        }
        else if(detectedkey == "#hours"){
            CreateInput("",subkey+"_name",0,parseInt(numofitems)+1,detectedkey,"text_input");
            CreateInput("",subkey+"_spent",0,parseInt(numofitems)+1,detectedkey,"hour_input");
            CreateInput("",subkey+"_total",1,parseInt(numofitems)+1,detectedkey,"hour_input");
        }
        
    // TEXT AREAS
        else if(detectedkey == "#desc" || detectedkey == "#phase" || detectedkey == "#additional"){
            if(!document.getElementById(subkey)){
                CreateInput("",subkey,0,0,detectedkey,"textarea");
            }
        }        
    }
    
/* Hides the wanted segment */
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

// Function used for displaying the data
// Loops thru sub categories
function getData(i, regex, idprefix, arrayOfLines, detectedkey){
    var extractedRegex = "";
    var excludedRegex = "";
    var text = "";
    var keywordsub = detectedkey.substr(1);
    var counter = 1;
    var subcounter = 0;
    var hoursRegex = /\d+\/\d+/;
    var textRegex = /[a-zA-Z]*\s+[a-zA-Z]*/;
    var extractedHours = "";
    var excludedHours = "";
    
    for(k = i+2; k<arrayOfLines.length; k++){

        if(arrayOfLines[k].charAt(0) == "#"){
            counter = 0;
            break;
        }else{
            
            if(detectedkey == "#time" || detectedkey == "#project" || detectedkey == "#passed_unit_test" 
            	|| detectedkey == "#passed_other_test"|| detectedkey == "#total_unit_test" || detectedkey == "#total_other_test"){   
                CreateInput(arrayOfLines[k], keywordsub, 1, 0, detectedkey, "text_input");    
            }


/* REQUIREMENTS */
// match(/(^|\s)(#[a-z\d-]+)/) = Matches for '#' in text

            else if(detectedkey == "#req"){
                
                if(arrayOfLines[k] == "New:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t] == "In_progress:" || arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("0", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                    }
                }

                if(arrayOfLines[k] == "In_progress:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t] == "Resolved:" || arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("1", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                    }   
                }

                if(arrayOfLines[k] == "Resolved:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t] == "Feedback:" || arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("2", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                    }   
                }

                if(arrayOfLines[k] == "Feedback:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t] == "Closed:" || arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("3", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                    }   
                }

                if(arrayOfLines[k] == "Closed:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t] == "Rejected:" || arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("4", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                    }   
                }

                if(arrayOfLines[k] == "Rejected:"){

                    for(t = k+1; t<arrayOfLines.length; t++){

                        if(arrayOfLines[t].match(/(^|\s)(#[a-z\d-]+)/)) {
                            break;
                        }
                        subcounter++
                        CreateInput(arrayOfLines[t], keywordsub+"_name", 0, subcounter, detectedkey, "text_input");
                        CreateInput("5", keywordsub+"_status", 1, subcounter, detectedkey, "dropdown");
                        
                    }   
                }             

            }

/*------------------*/

            else if(detectedkey == "#client" || detectedkey == "#managers"){
                
                // Gets email from the string
                // Separates email from name
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
            else if(detectedkey == "#tasks_comp" || detectedkey == "#tasks_next"|| detectedkey == "#milestone"
                   || detectedkey == "#revisions" || detectedkey == "#problems"){
                CreateInput(arrayOfLines[k], keywordsub, 1, counter, detectedkey, "text_input", "text_input");
            }
            
            else if(detectedkey == "#desc"){
                if(document.getElementById("desc")){
                    text += arrayOfLines[k-1]+"&#13;&#10;";
                    document.getElementById("desc").innerHTML = text;
                }else{    
                    document.getElementById(detectedkey+"_container").innerHTML +=
                    "<textarea type='text' id='desc' style='width: 70%; height: 110px;'></textarea><br>";                      
                }
            }
            
            else if(detectedkey == "#phase"){
                if(document.getElementById("phase")){
                    text += arrayOfLines[k-1]+"&#13;&#10;";
                    document.getElementById("phase").innerHTML = text;
                }else{    
                    document.getElementById(detectedkey+"_container").innerHTML +=
                    "<textarea type='text' id='phase' style='width: 70%; height: 110px;'></textarea><br>";                      
                }
            }
            
            else if(detectedkey == "#additional"){
                if(document.getElementById("additional")){
                    text += arrayOfLines[k-1]+"&#13;&#10;";
                    document.getElementById("additional").innerHTML = text;
                }else{    
                    document.getElementById(detectedkey+"_container").innerHTML +=
                    "<textarea type='text' id='additional' style='width: 70%; height: 110px;'></textarea><br>";                      
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



/* Function used for creating input and textarea elements. */
function CreateInput(text,idprefix,order,counter,detectedkey,classname){
    
    if(idprefix == "client_name" || idprefix == "managers_name" || idprefix == "hours_name"|| idprefix == "req_name"){
        placeholder = "Name";
    }else if(idprefix == "client_email" || idprefix == "managers_email"){
        placeholder = "Email";
    }else if(idprefix == "project"){
        placeholder = "Project name";
   
    }else if(idprefix == "tasks_comp"){
        placeholder = "Completed task";
    }else if(idprefix == "tasks_next"){
        placeholder = "Task for next week";
    }else if(idprefix == "milestone"){
        placeholder = "Next milestone";
    }else if(idprefix == "passed_unit_test"){
        placeholder = "Passed unit test case";
    }else if(idprefix == "passed_other_test"){
        placeholder = "Passed other test case";
    }else if(idprefix == "total_unit_test"){
        placeholder = "Total unit test case";
    }else if(idprefix == "total_other_test"){
        placeholder = "Total other test case";
    }else if(idprefix == "revision"){
        placeholder = "revision";
    }else if(idprefix == "revision"){
        placeholder = "problems";
    }
    
    else if(idprefix == "hours_spent"){
        placeholder = "h spent";
    }else if(idprefix == "hours_total"){
        placeholder = "h total";
    }
    
    var container = document.getElementById(detectedkey+"_container");
    
    if(classname == "dropdown" ){
        // Create and append select list
        var selectList = document.createElement("select");
        selectList.id = "req_select_"+counter;
        container.appendChild(selectList);
        var option1 = document.createElement("option");
        option1.value = "1";
        option1.text = "New";
        selectList.appendChild(option1);
        var option2 = document.createElement("option");
        option2.value = "2";
        option2.text = "In progress";
        selectList.appendChild(option2);
        var option3 = document.createElement("option");
        option3.value = "3";
        option3.text = "Resolved";
        selectList.appendChild(option3);
        var option4 = document.createElement("option");
        option4.value = "4";
        option4.text = "Feedback";
        selectList.appendChild(option4);
        var option5 = document.createElement("option");
        option5.value = "5";
        option5.text = "Closed";
        selectList.appendChild(option5);
        var option6 = document.createElement("option");
        option6.value = "6";
        option6.text = "Rejected";
        selectList.appendChild(option6);

        var x = selectList.children[parseInt(text)];
    	x.setAttribute("selected", "selected");
    	container.innerHTML += "<br>";
    }
    
    else{

    if(classname == "text_input" || classname == "hour_input"){
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
    }else{
        var texta = document.createElement("textarea");
        texta.id = idprefix;
        texta.maxLength = "200";
        texta.cols = "40";
        texta.rows = "5";
        container.appendChild(texta);
    }
    }

    document.getElementById(detectedkey+"_container").setAttribute("name",counter);
}
   
var br = "";
var placeholder = "";

    var projectid;
    var reportid; 
    var projectname;
    var timeofreport;
    var client = [""];
    var description; 
    var phase = "";
    
    // Weeklyreport info
    var managers = [];
    var manageremails = [];
    var requirements = [];
    var completed_tasks = [];
    var tasks_next = [];
    var milestone = [];
  
    var revisions = [];
    var problems = [];
    
    var working_hours = [];

    var finalObject = [];
    var otherinfo = [{time: "", project_name: "", description: "",
    	            passed_unit_test: 0 , passed_other_test: 0, total_unit_test: 0,total_other_test: 0,
                    reportid: 0, projectid: 0, phase: "", additional:"",}];


    /*---------------------
    
    Function for getting
    all the data from fields
     
    -----------------------*/
    
    function clicked(){
        var i = 0;
        finalObject = [];
        
            if(document.getElementById("reportid").value != null && document.getElementById("projectid").value != null){
                
                projectid = document.getElementById("projectid").value;
                reportid = document.getElementById("reportid").value;

                // Time, project name, desc, phase ,unit_test,oother_test and
		// additional
                // are pushed into otherinfo array
                
                if(document.getElementById("time_0")){
                    otherinfo[0].time = document.getElementById("time_0").value;
                }else{console.log("error getting time!");}
                
                if(document.getElementById("project_0")){
                    otherinfo[0].project_name = document.getElementById("project_0").value;
                }else{console.log("error getting projectname!");}
                
                if(document.getElementById("desc")){
                    otherinfo[0].description = document.getElementById("desc").value;
                }else{console.log("error getting desc!");}
                
                if(document.getElementById("phase")){
                    otherinfo[0].phase = document.getElementById("phase").value;
                }else{console.log("error getting phase!");}
                
                if(document.getElementById("additional")){
                    otherinfo[0].additional = document.getElementById("additional").value;
                }else{console.log("error getting additional!");}
               // Unit Test
                
                if(document.getElementById("passed_unit_test_0")){
                	otherinfo[0].passed_unit_test = document.getElementById("passed_unit_test_0").value;
                }else{console.log("error getting passed_unit_test!");}      
                
               
                if(document.getElementById("total_unit_test_0")){
                	otherinfo[0].total_unit_test = document.getElementById("total_unit_test_0").value;
                }else{console.log("error getting total_unit_test!");}     
                // Other Test
               
                if(document.getElementById("passed_other_test_0")){
                	otherinfo[0].passed_other_test = document.getElementById("passed_other_test_0").value;
                }else{console.log("error getting passed_other_test!");}
                
                if(document.getElementById("total_other_test_0")){
                	otherinfo[0].total_unit_test = document.getElementById("total_unit_test_0").value;
                }else{console.log("error getting total_unit_test!");}
                
                otherinfo[0].reportid = reportid;
                otherinfo[0].projectid = projectid;
                
                // Client name
                while(true){
                i++;
                    if(document.getElementById("client_name_"+i)){
                        client.push({name: document.getElementById("client_name_"+i).value, email: document.getElementById("client_email_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                // Managers
                while(true){
                i++;
                    if(document.getElementById("managers_name_"+i)){
                        managers.push({name:document.getElementById("managers_name_"+i).value, email: document.getElementById("managers_email_"+i).value });
                        //console.log( document.getElementById("managers_name_"+i).value );
                        //console.log( document.getElementById("managers_email_"+i).value );
                    }else{
                        i = 0;
                        break;
                    }
                }
                   
                
                // Requirements
                while(true){
                i++;
                    if(document.getElementById("req_name_"+i)){
                        requirements.push({name:document.getElementById("req_name_"+i).value, status: document.getElementById("req_select_"+i).value});
                        //console.log( document.getElementById("req_name_"+i).value );
                        //console.log( document.getElementById("req_select_"+i).value );
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                
                // Completed tasks
                while(true){
                i++;
                    if(document.getElementById("tasks_comp_"+i)){
                        completed_tasks.push({name:document.getElementById("tasks_comp_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                // Next tasks
                while(true){
                i++;
                    if(document.getElementById("tasks_next_"+i)){
                        tasks_next.push({name:document.getElementById("tasks_next_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                // Milestone
                while(true){
                i++;
                    if(document.getElementById("milestone_"+i)){
                        milestone.push({name:document.getElementById("milestone_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                
                // Code revisions
                while(true){
                i++;
                    if(document.getElementById("revisions_"+i)){
                        revisions.push({name:document.getElementById("revisions_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                // Problems
                while(true){
                i++;
                    if(document.getElementById("problems_"+i)){
                        problems.push({name:document.getElementById("problems_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
                
                // Working hours
                while(true){
                i++;
                    if(document.getElementById("hours_name_"+i)){
                        working_hours.push({name: document.getElementById("hours_name_"+i).value,
                                           weekhours: document.getElementById("hours_spent_"+i).value,
                                           totalhours: document.getElementById("hours_total_"+i).value});
                    }else{
                        i = 0;
                        break;
                    }
                }
        
                // Final object is created from all the data objects:
                finalObject = {
                    otherinfo: otherinfo,
                    client: client,
                    managers: managers,
                    requirements: requirements,
                    completed_tasks: completed_tasks,
                    tasks_next: tasks_next,
                    milestone: milestone,
                    revisions: revisions,
                    workinghours: working_hours,
                    problems: problems                
                };
                
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
                console.log("success!");
                // console.log( data );
                // data - response from server
            },
            error : function(errorThrown) {    
                console.log("error - AJAX");
                console.log(errorThrown);
            },
        });
    }

// File reader event
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);