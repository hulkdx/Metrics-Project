//  Tommi Tuominen
//  Project Work course work 2014
// 

var numofprojects = 6;
var objects = {};

function makeObjects(numofprojects){

        for(i=0;i<numofprojects;i++){
            
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
            CreateOptions("Project name "+i,random3);
            
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
                hours_week1: random3,
                hours_week2: random2,
                hours_week3: random3,
                id: random3
            };
            
            listofprojects.push(objects[i]);
        }
}

var list = document.getElementById("projectlist");

function CreateOptions(name, id){
    var option = document.createElement("option");
    option.textContent = name+" ("+id+")";
    option.value = name+" ("+id+")";
    option.id = id;
    list.appendChild(option);
}

function GetSelectedOptions(){
    var projForm = document.forms.projectForm;
    var SelBranchVal = "";
    
    for (i=0; i<projForm.projectlist.length; i++){
        
        if (projForm.projectlist[i].selected){
            console.log(projForm.projectlist[i].value);
        }
    }
    
addLine();
    
}