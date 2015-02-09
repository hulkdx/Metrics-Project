/*
Tommi Tuominen 99710
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
This file includes the functions used for AJAX (database_out.php).
The necessary functions for creating charts are also included here.
Project's data is first loaded into a javascript object for easy handling,
then the wanted information is extracted and reformed for the charts.
Two AJAX functions are used. One for project list and the other one for
ALL project data.
----------------------
TODO:
Remove unnecessary variables
Optimize, optimize, optimize
More strict error handling?
*/


var numofprojects = 6;
var objects = {};
var projectList = {};
var list = document.getElementById("projectlist");
var dataArray = [];
var monthlyArray  = [];
var indiArray = [];
var xCategories = [];
//REQUIREMENTS: New / In progress / Resolved / Feedback / Closed / Rejected 
var xCategories_b = ["New","In progress","Resolved","Feedback","Closed","Rejected"];
var yCategories = [];
var parsedDates = [];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var newreq = 0;
var inprog  = 0;
var resolved = 0;
var feedback = 0;
var closedd = 0;
var rejected = 0;

/*-------------------

AJAX:
GET LIST OF PROJECTS

---------------------*/

function getProjectList(options) {
    
    reportData = {
        querytype: 0,
        id: 0,
        operation: 1
    };

    $.ajax({  
        url : "database_out.php",
        type : "POST",
        dataType: "json",
        data : reportData,
        success : function(data){
            
            projectList = data;
            //console.log(projectList);
        
        if(options == 1){    
            for(var i=0; i<projectList.length; i++){
                createOptions(projectList[i].project_name, projectList[i].project_id);
            }
        }else{
            for(var i=0; i<projectList.length; i++){
                CreateProjectList(projectList, i);
            }
        }
        
        },
        error : function(errorThrown) {
            console.log(data);
            console.log("error");
        },
    });
}

/*-------------------

AJAX:
GET ALL DATA FROM SELECTED PROJECT

---------------------*/

function getProjectData(id, operation, querytype, value, containername) {

    if(parseInt(id) != -1 && parseInt(id) != null){
    
    reportData = {
        id: parseInt(id),
        operation: parseInt(operation),
        querytype: parseInt(querytype)
    };
    
    $.ajax({  
        url : "database_out.php",
        type : "POST",
        dataType: "json",
        data : reportData,
        success : function(data){
        objects = data;
        
        //console.log(objects);
        makeLineData(value, containername);

        },
        error : function(errorThrown) {
            alert("Error getting data!");
        },
    });
    
    }else{
        console.log("No selected project!");
    }
    
}
var title = "Requirements";

/*--------------------------------------

 INITIATE SERIES DRAW in MakeChart.js

--------------------------------------*/

function makeLineData(value, containername){
    
    if(value == 0){
       addLine(getMonthlyHours(), months, containername, "Monthly hours", 0, objects.project[0].project_name, 0);
    }else if(value == 1){
       addLine(getIndiHours(), xCategories, containername, "Individual hours", 1, objects.project[0].project_name, 0);
    }else if(value == 2){
        addLine(getRequirements(1), xCategories_b, containername+"2", title, 2, objects.project[0].project_name, 1);
        addLine(getIndiHours(), xCategories, containername, "Individual hours", 1, objects.project[0].project_name, 0); 
        projectRequirements();
        projectTestcases();
        projectCoderevisions();
        commitsToVersionCtrl();
    }else if(value == 3){
       addLine(getAllHours(), xCategories, containername, "Total Hours", 1, objects.project[0].project_name, 0);
    }else if(value == 4){
       addLine(getRequirements(1), xCategories_b, containername, "Requirements", 2, objects.project[0].project_name, 0);
    }else{
       alert("Button action not defined!");
    }
}

/*---------------------------

UNIQUE TO PROJECT DETAILS SITE
    
---------------------------*/

/* CREATE REQUIREMENTS */
// If weekly requiremtns not found ->
// uses information from redmine
function projectRequirements(){
    if(objects.weekly_requirement != 0 || objects.weekly_requirement != null){
        for(var i=0; i<objects.weekly_requirement.length; i++){
            document.getElementById("reqbox").innerHTML += ""+objects.weekly_requirement[i].requirement_name+" (" +objects.weekly_requirement[i].requirement_status+ ")<br>";
        }        
    }
    else if(objects.requirement){
        for(var i=0; i<objects.requirement.length; i++){
            document.getElementById("reqbox").innerHTML += "<b>"+objects.requirement[i].description+"</b><br>";
        }
    }else{
        document.getElementById("reqbox").innerHTML += "No Requirements";   
    }  
}

/* CREATE TEST CASES */

function projectTestcases(){
    if(objects.weekly_report){
        var unittest = [];
        var othertest = [];
        
        if(objects.weekly_report[0].unit_testcases){
            //unittest = JSON.parse(objects.weekly_report[0].unit_testcases);
            
            document.getElementById("testbox").innerHTML += "<b>Unit Test Cases:</b><br>";
            document.getElementById("testbox").innerHTML += objects.weekly_report[0].unit_testcases+"<br>";
            
            /*for(var i=0; i<unittest.length; i++){ 
                document.getElementById("testbox").innerHTML += unittest[i].name+"<br>";
            }*/
        }
        if(objects.weekly_report[0].other_testcases){
            //othertest = JSON.parse(objects.weekly_report[0].other_testcases);
            
            document.getElementById("testbox").innerHTML += "<b>Other Test Cases:</b><br>";
            document.getElementById("testbox").innerHTML += objects.weekly_report[0].other_testcases+"<br>";
            
            /*for(var i=0; i<othertest.length; i++){         
                document.getElementById("testbox").innerHTML += othertest[i].name+"<br>";
            }*/
        }  
    }
}

/* CREATE CODE REVISIONS */

function projectCoderevisions(){
    if(objects.weekly_report){
       var revisions = []; 
        
       if(objects.weekly_report[0].code_revisions){
        //revisions = JSON.parse(objects.weekly_report[0].code_revisions);
        document.getElementById("revisionbox").innerHTML += objects.weekly_report[0].code_revisions+"<br>";
        /*
        for(var i=0; i<revisions.length; i++){
            document.getElementById("revisionbox").innerHTML += revisions[i].name+"<br>";
        }*/
        
       }
    }
}


/* commits to version control */

function commitsToVersionCtrl(){
    if(objects.weekly_report){
       var revisions = []; 
        
       if(objects.weekly_report[0].code_revisions){
        //revisions = JSON.parse(objects.weekly_report[0].code_revisions);
        document.getElementById("commitbox").innerHTML += objects.weekly_report[0].code_revisions+"<br>";
        /*
        for(var i=0; i<revisions.length; i++){
            document.getElementById("revisionbox").innerHTML += revisions[i].name+"<br>";
        }*/
        
       }
    }
}

//Check values for 'warning' or 'ok' label
function checkValues(min, max, data){
   
var checkedArray = data;
var warning_treshold = min;
var ok_treshold = max;
    
    for(i = 0; i < checkedArray.length; i++){	
        if(checkedArray[i].y <= warning_treshold){
            checkedArray[i] = {name: checkedArray[i].name,y: checkedArray[i].y, marker:{symbol: 'url(images/warning.png)'}};
        }else if(checkedArray[i].y >= ok_treshold){
            checkedArray[i] = {name: checkedArray[i].name,y: checkedArray[i].y, marker:{symbol: 'url(images/ok.png)'},
            };
        }
    }

    return checkedArray;
}

/*------------------------------------------------------*/
/*
Rest of the functions are used in metrics comparison
and details.
*/
/*--------------------------

    GET ALL HOURS
    
----------------------------*/

function getAllHours(){
clearArrays();
totalhours = 0;

    if(objects.individual){
        for(var i = 0; i<objects.individual.length; i++){
            totalhours += parseInt(objects.individual[i].hours);
        }  
        dataArray.push({name: objects.project[0].name, y: totalhours, id: objects.project[0].project_id});    
    }else if(objects.weekly_report){
        
        var working_hours = JSON.parse(objects.weekly_report[0].working_hours);
        
        for(var i = 0; i<working_hours.length; i++){
            totalhours += parseInt(working_hours[i].totalhours);
        }  
        dataArray.push({name: objects.project[0].name, y: totalhours, id: objects.project[0].project_id}); 
    }else{
        alert("Unable to get data!");
    }
return dataArray;
}


/*-------------------------- 
    
    GET INDIVIDUAL HOURS

----------------------------*/

function getIndiHours(){
clearArrays();

var memberid = "";
var membername = "";

if(objects.participation != 0){

    for(var i=0; i<objects.participation.length; i++){

        memberid = objects.participation[i].member_id;
        membername = objects.participation[i].first_name+" "+objects.participation[i].last_name;

        for(var k=0; k<objects.individual.length; k++){
            if(objects.individual[k].member_id == memberid){
                indiArray.push({name: membername+" ("+objects.project[0].project_id+")", y: parseInt(objects.individual[k].hours), id: parseInt(objects.individual[k].member_id)});
            }
        }

    }
    
    return addHours(indiArray);
    
}else if(objects.individual != 0){
        var testadd = 0;
            for(var k=0; k<objects.individual.length; k++){
                indiArray.push({name: parseInt(objects.individual[k].member_id), y: parseInt(objects.individual[k].hours), id: parseInt(objects.individual[k].member_id)});
            }
    return addHours(indiArray);

}else if(objects.weekly_report){
    
            var weeklyHours = [];
    
                try{
                    var weeklyHours = JSON.parse(objects.weekly_report[0].working_hours);
                    for(var k=0; k<weeklyHours.length; k++){
                        indiArray.push({name: weeklyHours[k].name, y: parseInt(weeklyHours[k].totalhours)});
                        xCategories.push(weeklyHours[k].name);
                    }    
                }catch(err){
                    indiArray.push({name: "No information", y: 0});   
                }
                
        return indiArray;
  
}else{
    alert("Unable to get data!");
}

return 0;
}

/*--------------------------

    GET MONTHLY HOURS
    
----------------------------*/

function getMonthlyHours(){
clearArrays();
totalhours = 0;
var reArray = [];
var indidate = "";

if(objects.individual && objects.individual.length > 1){
    for(var i=0; i<objects.individual.length; i++){
        indidate = objects.individual[i].date;
        
        reArray.push({name: objects.project[0].project_name,
                    y: parseInt(objects.individual[i].hours),
                    //day: parseInt(parseDateTime("day",indidate)),
                    month: parseInt(parseDateTime("month",indidate))
                    //year: parseInt(parseDateTime("year",indidate))
                    });
    }

var arraySeries = reArray;
var addedh = {}
var addedh_count = {}
var newArraySeries = []
    
    arraySeries.forEach(
    function(e){
        if(!addedh[e.month]){
            addedh[e.month] = 0
            addedh[e.month] = 0
        }
        addedh[e.month] += e.y
        addedh_count[e.month]++
    }
    )

    for(var month in addedh){
        newArraySeries.push({name: month, y: addedh[month], month: month});
    }

    for(var i = 0; i<newArraySeries.length; i++){
        monthlyArray[newArraySeries[i].month-1].y = newArraySeries[i].y;
    }
}else if(objects.individual.length == 1){

    return addHours(objects.individual);
}else{
    alert("Unable to get data!");
}

return monthlyArray;
}

/* GET NAMES OF PROJECT MEMBERS */
/* NOTE: Not always possible due to limitations of redmine */

function GetNames(){
clearArrays();

    for(var i=0; i<objects.participation.length; i++){   
        yCategories[i] = objects.participation[i].first_name+" "+objects.participation[i].last_name;
    }
    
    return yCategories;
}

/* ADD ALL HOURS OF THE SAME USER */

function addHours(indiArray){
    var arraySeries = indiArray;
    var addedh = {}
    var addedh_count = {}
    var newArraySeries = []
        
    arraySeries.forEach(
    function(e){
        if(!addedh[e.id]){
            addedh[e.id] = 0
            addedh[e.id] = 0
        }
        addedh[e.id] += e.y
        addedh_count[e.id]++
    }
    )
    
    for(var id in addedh){
        newArraySeries.push({name: id, y: addedh[id], id: id});
    }
    
return newArraySeries;
}

/* COUNT REQUIREMENT STATUSES */

function getRequirements(){

newreq = 0;
inprog  = 0;
resolved = 0;
feedback = 0;
closedd = 0;
rejected = 0;
dataArray = [];

    //If project has weekly_requirement use only that
    //else check requirement
    if(objects.weekly_requirement){
        for(var i=0; i<objects.weekly_requirement.length; i++){           
            detectRequirement(parseInt(objects.weekly_requirement[i].requirement_status));
        }        
    }else if(objects.requirement){
        for(var i=0; i<objects.requirement.length; i++){
            detectRequirement(parseInt(objects.requirement[i].requirement_status));
        }
    }else{
        console.log("No requirement data!");
        return 0;
    }

    dataArray = [{y:newreq},{y:inprog},{y:resolved},{y:feedback},{y:closedd},{y:rejected}];

return dataArray;
}

//Used for counting requirement statuses
function detectRequirement(reqValue){

    if(reqValue == 1){
        newreq = newreq+1;  
    }else if(reqValue == 2){
        inprog = inprog+1;
    }else if(reqValue == 3){
        resolved = resolved+1;    
    }else if(reqValue == 4){
        feedback = feedback+1;    
    }else if(reqValue == 5){
        closedd = closedd+1;
    }else if(reqValue >= 6){
        rejected = rejected+1;
    }

}


/* FORMAT DATE VALUES */

function parseDate(date){
    parsedDates = [];
    var formattedDate = "";

    parsedDates.push(parseDateTime("all",date));
    formattedDate = parsedDates[0].day + "." + parsedDates[0].month + "." + parsedDates[0].year;
    
    return formattedDate;
}

function parseDateTime(scope, datetime){

if(datetime != null){
    var t = datetime.split(/[- :]/);
    
    d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    
    if(scope == "day"){
        return parseInt(t[2]);
    }else if(scope == "month"){
        return parseInt(t[1]);
    }else if(scope == "year"){
        return parseInt(t[0]);
    }else if(scope == "all"){
        parsedTime = {
            day: parseInt(t[2]),
            month: parseInt(t[1]),
            year: parseInt(t[0])
        };      
    }
}else{
    parsedTime = {
        day: 0,
        month: 0,
        year: 0
    };
}
    return parsedTime;    
}

/*
function GetDates(){
clearArrays();

    for(var i=0; i<objects.individual.length; i++){
        parsedDates[i] = parseDateTime(objects.individual[i].date);    
    }
    
    return parsedDates;
}
*/

/* CLEAR ARRAYS */

function clearArrays(){
    xCategories = [];
    yCategories = [];
    dataArray = [];
    parsedDates = [];
    monthlyArray = [{name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0},
    {name:'', y:0, day:0, month:0, year:0}];
    indiArray = [];
}

/* POPULATE DROPDOWN MULTISELECT LIST */

function createOptions(name, id){
    var option = document.createElement("option");
    option.textContent = name+" ("+id+")";
    option.value = name+" ("+id+")";
    option.id = id;
    list.appendChild(option);
}

/* CHECK SELECTED LIST OPTION */

function getSelectedOptions(value){
    var projForm = document.forms.projectForm;
    var SelBranchVal = "";
    var selectedid = -1;
    var k = 0;
    
    for (i=0; i<projForm.projectlist.length; i++){
        
        if (projForm.projectlist[i].selected){
            selectedid = projForm.projectlist[i].id;
        }
    }

    getProjectData(selectedid,0,1,value, "container"); 
}