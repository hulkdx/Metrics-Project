/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Updated: 16.6.2015
This file is used for dynamic elements and options for index.php
*/

var projectList;

function createOptions()
{
    // Connect To Database
    $.ajax({
        url: "database_out.php",
        type: "POST",
        dataType: "json",
        data: {
            querytype: 0,
            id: 0,
            operation: 5
        },
        success: function(data) {
            projectList = data;
            var comboBox = document.getElementById("publicCB");
            var option = document.createElement("option");
            option.text = "All";
            comboBox.add(option);
            // Fill the comboBox options with Project List
            for (var i = 0, len = data.length; i < len; i++) {
                var option = document.createElement("option");
                option.text = data[i].project_name;
                comboBox.add(option);
            };
        },

        error: function(errorThrown) {
            console.log(errorThrown);
            console.log("error");
        },
    });
}

function publicClicked() {
    var comboBox = document.getElementById("publicCB");

    if(comboBox.selectedIndex==0){
        window.location.href = "public_all.php";
        return;
    }

    var id = projectList[comboBox.selectedIndex-1].project_id;
    window.location.href = "public.php?id=" + id;
}
