//  Tommi Tuominen
//  Project Work course work 2014
//  

var menuitems = ["account.html", "main.php", "listpage.html", "compare.html", "readweekly.html", "redmine.html", "facebook.html"];
var menutext = ["Account Information", "Project Main page", "Project List", "Compare Metrics", "Weekly report", "Redmine", "Facebook"];
var user_privileges = 7;

var username = "User";
var listofprojects = [];
var listoflatest = [];

var objects = {};
var latest = {};

var status = "Completed";
var random = 0;
var random2 = 0;
var random3 = 0;
var message = "";
var alarming = 0;

//Function used for creating the top part of the site
function createTop(title){
    
    if(title == null){
        title = username;
    }
    
    document.write(""+
        "<div id=\"top\" style=\"border-bottom: 1px solid silver; height: 40px;\">"+
        "<div style=\"float: left; width: 400px;\">"+
            "<img src=\"images/logo.jpg\" ><br><br>"+
        "</div>"+
        
        "<div id=\"top_mid\" style=\"width: 300px; float: left;\">Logged in as: "+title+       
        "</div>"+
        
        "<div id=\"top_mid\" style=\"width: 300px; float: right;\">"+    
        "<a href=\"../Login/logout.php\">Logout</a></div>"+
        
        "</div>");
}

//Function used for creating the navigation
function createNavig(){
    var menus = "";
    
    if(user_privileges > menuitems.length){
        user_privileges = menuitems.length;
    }
    
    for(i=0; i<user_privileges; i++){
        menus += "<li><a href=\""+menuitems[i]+"\">"+menutext[i]+"</a></li>";
    }
    
    document.write(""+
            "<div id=\"navigation\">"+
                   "<ul>"+menus+
                   "</ul>"+
            "</div>");
}

//Function used for creating section header
function createHeader(text, type){
    if(type == 0){
    document.write(""+
            "<div id=\"header\">"+
		"<h2>"+text+"</h2>"+
	    "</div>");
    }   
    else if(type == 1){
    document.write(""+
            "<div id=\"header\">"+
		"<h2>"+text+"</h2>"+
                "<div style='float: right; margin-left: 20px;'>Sort by: "+
                "<input type='radio' name='sort' id='bydate' value='bydate'/><label for='bydate'>date</label>"+
                "<input type='radio' name='sort' id='bystatus' value='bystatus'/><label for='bystatus'>status</label>"+
                "</div>"+
                "<div style='float: right;'>Arrange: "+
                "<input type='radio' name='ascdesc' id='ascending' value='ascending'/><label for='ascending'>Ascending</label>"+
                "<input type='radio' name='ascdesc' id='descending' value='descending'/><label for='descending'>Descending</label>"+
                "</div>"+
                "<div style='float: right; margin-right: 50px;'>"+
                "<input style='width: 200px;' type='text' placeholder='search project by name or id'>"+
                "<input type='button' value='search'>"+
                "</div>"+   
	    "</div>");        
    }
    else if(type == 2){
    document.write(""+
            "<div id=\"header\">"+
		"<h2>"+text+"</h2>"+
                "<div style='float: right; margin-left: 20px;'>"+
                "<input type=\"file\" id=\"fileinput\" value=\"Browse\"/>"+
                "<input type=\"text\" id=\"projectid\" placeholder=\"project id\"/>"+
                "<input type=\"text\" id=\"reportid\" placeholder=\"report id\"/>"+
                "<input type=\"button\" onclick=\"clicked()\" value=\"Send to db\"/>"+
                "</div>"+   
	    "</div>");        
    }
}

function makeObjects(value){

    //If value is 0, create projects object
    if(value==0){
        for(i=0;i<22;i++){
            //In this demo we use random numbers
            random = Math.floor(Math.random() * (3 - 0 + 0)) + 0;
            random2 = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
            random3 = Math.floor(Math.random() * (2000 - 1 + 1)) + 1;
        
            if(random == 0){
                status = "Completed";  
            }else if(random == 1){
                status = "Active";
            }else{
                status = "Late";
            }
            
            objects[i] =
            {
                name: "Project name "+i,
                status: status,
                startdate: "31/12/2013",
                deadline: "31/12/2014",
                finishdate: "",
                numofmembers: random2,
                lastactive: random+random2+3,
                description: "Short description of project goes here",
                id: random3,
            };
            
            listofprojects.push(objects[i]);
        }        
    }else if(value==1){
    //If value is 0, create projects object
        for(i=0;i<5;i++){
            //In this demo we use random numbers
            random = Math.floor(Math.random() * (3 - 0 + 0)) + 0;
            random3 = Math.floor(Math.random() * (2000 - 1 + 1)) + 1;
        
            if(random == 0){
                message = " needs your attention!";
                alarming = 1;
            }else if(random == 1){
                message = " has posted a new weekly report";
                alarming = 0;
            }else{
                message = " has been completed";
                alarming = 0;
            }
            
            latest[i] =
            {
                header: "Message header",
                sent: "01/01/2015",
                message: message,
                id: random3,
                alarming: alarming,
                project: "Projectname"+i+" ("+random3+")"
            };
            
            listoflatest.push(latest[i]);
        }
    }
}

//Function used for creating the footer
function createFooter(){
    document.write(""+
            "<div id=\"footer\">"+
		"<p>&#169;THE METRICS TEAM</p>"+
	    "</div>");
}


//Function used for getting the project's information from object
function getProjects(){
makeObjects(0);

    for(i=0;i<listofprojects.length;i++){
        document.write(""+
            "<div class=\"projectbox\">"+
                "<div class='newsheader'>"+
                "<span class='projname'><a href='detail.html'>"+listofprojects[i].name+" ("+listofprojects[i].id+")</a></span>"+
                "<span class='projinfo_head'>"+listofprojects[i].finishdate+"</span>"+              
                "<span class='projinfo_head'>"+listofprojects[i].startdate+"</span>"+
                "<span class='projinfo_head'>"+listofprojects[i].deadline+"</span>"+  
                "<span class='projstatus_"+listofprojects[i].status+"'>"+listofprojects[i].status+"</span>"+
                "</div>"+
                "<br>"+
                "<span class='projinfo_left'>Members: "+listofprojects[i].numofmembers+"</span><br>"+
                "<span class='projinfo_left'>Last Active: "+listofprojects[i].lastactive+" Days ago</span><br>"+
                "<span class='projinfo_left'>Description: "+listofprojects[i].description+"</span>"+
            "</div>");
    }  
}

function getLatest(){
makeObjects(1);

    for(i=0;i<listoflatest.length;i++){
        document.write(""+
        "<div class=\"newsbox\">"+
        "<div class='newsheader'><span class='projname'>"+listoflatest[i].header+"&nbsp;</span>");
        
        if(listoflatest[i].alarming == 1){
          document.write("<img src='images/warning_small.png'>");  
        }
        document.write(""+
        "<span class='projinfo_right'>Sent: "+listoflatest[i].sent+"</span></div></br>"+
        "<div class='newscontent'><a href='detail.html'>"+listoflatest[i].project+"</a>"+listoflatest[i].message+"</div>"+
        "</div><br>");
    }  
   
}