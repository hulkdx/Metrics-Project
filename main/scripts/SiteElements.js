/*
Tommi Tuominen 99710
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
This file is used for dynamic creation of basic website elements.
----------------------
TODO:
document.write() may not be the best option for creating elements.
creating section divs and adding into them with innerHtml or
addElement may or may not be a better choice.
*/ 
var menuitems = ["../main/account.php", "../main/listpage.php", "../main/compare.php", "../main/readweekly.php", "../main/redmine.php", "../facebook_forum/initialization.php"];
var menutext = ["Account Information", "Project List", "Compare Metrics", "Weekly report", "Redmine", "Facebook"];
var user_privileges = 6;

var username = "User";
var listofprojects = [];

//Function used for creating the top part of the site
function createTop(title){
    
    if(title == null){
        title = username;
    }
//"User" is therefore a placeholder for whenever createTop() is called without parameters,
//whether deliberately or not.   
    document.write(""+
        "<div id=\"top\" style=\"border-bottom: 1px solid silver; height: 40px;\">"+
        "<div style=\"float: left; width: 400px;\">"+
            "<img src=\"../main/images/logo.jpg\" ><br><br>"+
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
    
    for(i=1; i<user_privileges; i++){
        menus += "<li><a href=\""+menuitems[i]+"\">"+menutext[i]+"</a></li>";
    }
    
    document.write(""+
            "<div id=\"navigation\">"+
                    "<div id=\"headerinfo\" style=\"width\"></div>"+
        			"<div id=\"progress\" style=\"width:150px;border:1px solid #ccc;\"></div>"+
       				"<div id=\"information\" style=\"width\"></div>"+
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
	    "<h2>"+text+"</h2>"
    );
    
    /*uncomment these for project list sorting controls (not implemented)*/
    /*document.write(""+
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
	    "</div>");  */
    }
    else if(type == 2){
    document.write(""+
            "<div id=\"header\">"+
		"<h2>"+text+"</h2>"+
                "<div style='float: left; margin-left: 20px;'>"+
                "<input type=\"file\" id=\"fileinput\" value=\"Browse\"/>"+
                "<input type=\"text\" id=\"projectid\" placeholder=\"project id\"/>"+
                "<input type=\"text\" id=\"reportid\" placeholder=\"report id\"/>"+
                "<input type=\"button\" onclick=\"clicked()\" value=\"Send to db\"/>"+
                "</div>"+   
	    "</div>");        
    }
}

//Function used for creating the footer
function createFooter(){
    document.write(""+
            "<div id=\"footer\">"+
		"<p>&#169;THE METRICS TEAM</p>"+
	    "</div>");
}

/*--------------------------------

CREATE PROJECT LIST

----------------------------------*/

function CreateProjectList(projectList, i){
    
    document.getElementById("projectlistbox").innerHTML +=
            "<div class=\"projectbox\">"+
                "<div class='newsheader'>"+
                "<span class='projname'><a href='detail.php?id="+projectList[i].project_id+"'>"+projectList[i].project_name+" ("+projectList[i].project_id+")</a></span>"+
                "<span class='projinfo_head'>Created: <b>"+ParseDate(projectList[i].created_on)+"</b></span>"+              
                "<span class='projinfo_head'>Updated: <b>"+ParseDate(projectList[i].updated_on)+"</b></span>"+ 
                "<span class='projstatus_"+projectList[i].status+"'>"+projectList[i].status+"</span>"+
                "</div>"+
                "<br>"+
                "<span class='projinfo_left'>Version: "+projectList[i].version+"</span><br>"+
                "<span class='projinfo_left'>Description: "+projectList[i].description+"</span>"+
            "</div>";
}