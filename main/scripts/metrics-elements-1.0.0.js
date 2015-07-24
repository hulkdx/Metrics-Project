/*
Tommi Tuominen and Mohammad Jafarzadeh Rezvan
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
var menuitems = ["../main/account.php", "../main/project_list.php", "../main/project_comparison.php", "../main/readweekly.php", "../main/redmine.php", "../facebook_forum/initialization.php"];
var menutext = ["Account Information", "Project List", "Compare Metrics", "Weekly report", "Redmine", "Facebook"];
var user_privileges = 6;

var username = "User";
var listofprojects = [];
var projectList = {};

//Function used for creating the top part of the site
function createTop(title) {

    if (title == null) {
        document.write("" +
            "<div id=\"top\" style=\"border-bottom: 1px solid silver; height: 40px;\">" +
            "<div style=\"float: left; width: 400px;\">" +
            "<img src=\"../main/images/logo.jpg\" ><br><br>" +
            "</div>" +

            "<div id=\"top_mid\" style=\"width: 300px; float: right;\">" +
            "<a href=\"../Login/logout.php\">Logout</a></div>" +

            "</div>");
    }
    else {
        //"User" is therefore a placeholder for whenever createTop() is called without parameters,
        //whether deliberately or not.
        document.write("" +
            "<div id=\"top\" style=\"border-bottom: 1px solid silver; height: 40px;\">" +
            "<div style=\"float: left; width: 400px;\">" +
            "<img src=\"../main/images/logo.jpg\" ><br><br>" +
            "</div>" +

            "<div id=\"top_mid\" style=\"width: 300px; float: left;\">Logged in as: " + title +
            "</div>" +

            "<div id=\"top_mid\" style=\"width: 300px; float: right;\">" +
            "<a href=\"../Login/logout.php\">Logout</a></div>" +

            "</div>");
    }
}

//Function used for creating the navigation
function createNavig() {
    var menus = "";

    if (user_privileges > menuitems.length) {
        user_privileges = menuitems.length;
    }

    for (i = 1; i < user_privileges; i++) {
        menus += "<li><a href=\"" + menuitems[i] + "\">" + menutext[i] + "</a></li>";
    }

    document.write("" +
        "<div id=\"navigation\">" +
        "<div id=\"headerinfo\" style=\"width\"></div>" +
        "<div id=\"progress\" style=\"width:150px;border:1px solid #ccc;\"></div>" +
        "<div id=\"information\" style=\"width\"></div>" +
        "<ul>" + menus +
        "</ul>" +
        "</div>");
}

//Function used for creating section header
function createHeader(text, type) {
    if (type == 0) {
        document.write("" +
            "<div id=\"header\">" +
            "<h2>" + text + "</h2>" +
            "</div>");
    } else if (type == 1) {
        document.write("" +
            "<div id=\"header\">" +
            "<h2>" + text + "</h2>"
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
    } else if (type == 2) {
        document.write(
            "<div id=\"header\">" +

            "<h2>" + text + "</h2>" +
            "<div style='width: 300px; float: left;'>"+
            "<input type=\"file\" id=\"fileinput\" value=\"Browse\"/>"+
            "</div>"+
            "<div style='width: 1100px; margin-left: 10px;'>" +

            "<div style='width: 600px; float: right;'>"+
            "<select id=\"projectComboBox\" onchange=\"onChangeComboBox()\"> <option>New</option> <option>Random</option> </select>" +
            "<br>"+
            "<input type=\"button\" onclick=\"clicked()\" value=\"Send to db\"/>" +
            "</div>"+
            "</div>" +
            "</div>" +
            "<input type=\"text\" id=\"projectid\" placeholder=\"project id\"/>"
        );
        // Connect To Database
        $.ajax({
            url: "database_out.php",
            type: "POST",
            dataType: "json",
            data: {
                querytype: 0,
                id: 0,
                operation: 1
            },
            success: function(data) {
                projectList = data;
                var comboBox = document.getElementById("projectComboBox");
                // Fill the comboBox options with Project List
                for (var i = 0, len = data.length; i < len; i++) {
                    var option = document.createElement("option");
                    option.text = data[i].project_name;
                    comboBox.add(option);
                }
            },

            error: function(errorThrown) {
                console.log(errorThrown);
                console.log("error");
            },
        });

    }
}


function onChangeComboBox() {
    var comboBox = document.getElementById("projectComboBox");
    var textBox = document.getElementById("projectid");
    var selectedValue = comboBox.options[comboBox.selectedIndex].value;
    if (selectedValue == "New") {
        textBox.value = "";
    } else if (selectedValue == "Random") {
        var randomNumber = Math.random() * 100000 | 0;
        textBox.value = randomNumber;
    } else {
        for (var i = 0, len = projectList.length, selectedIndex = comboBox.selectedIndex-2; i < len; i++) {
            if (selectedIndex == i) {
                textBox.value = projectList[i].project_id;
            }
        }
    }
}

//Function used for creating the footer
function createFooter() {
    document.write("" +
        "<div id=\"footer\">" +
        "<p>&#169;THE METRICS TEAM</p>" +
        "</div>");
}

/*--------------------------------

CREATE PROJECT LIST

----------------------------------*/

function CreateProjectList(projectList, i) {

    document.getElementById("projectlistbox").innerHTML +=
        "<div class=\"projectbox\">" +
        "<div class='newsheader'>" +
        "<span class='projname'><a href='project_details.php?id=" + projectList[i].project_id + "'>" + projectList[i].project_name + " (" + projectList[i].project_id + ")</a></span>" +
        "<span class='projinfo_head'>Created: <b>" + parseDate(projectList[i].created_on) + "</b></span>" +
        "<span class='projinfo_head'>Updated: <b>" + parseDate(projectList[i].updated_on) + "</b></span>" +
        "</div>" +
        "<br>" +
        "<span class='projinfo_left'>Version: " + projectList[i].version + "</span><br>" +
        "<span class='projinfo_left'>Description: " + projectList[i].description + "</span>" +
        "</div>";
}

function createListForPublic()
{
    var id = getUrlVars()["id"];
    $.ajax({
        url: "../Login/public.php",
        type: "GET",
        dataType: "json",
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            var project_name = data.project_name;
            var created_on   = data.created_on;
            var updated_on   = data.updated_on;
            var status       = data.status;
            var versionz     = data.version;
            var description  = data.description;
            var hours        = data.working_hours;

            document.getElementById("project_name").value = project_name;
            document.getElementById("created_on").value = created_on;
            document.getElementById("updated_on").value = updated_on;
            document.getElementById("status").value = status;
            document.getElementById("version").value = versionz;
            document.getElementById("desc").value = description;
            document.getElementById("hours").value = hours;
        },

        error: function(errorThrown) {
            //console.log("yes");
        },
    });


}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
