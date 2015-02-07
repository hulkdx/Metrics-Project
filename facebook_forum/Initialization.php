<?php
/*Shahzad Choudhary 99707
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 7.2.2015
This file serves to display the form for Facebook-related queries and handle AJAX requests.*/
	include('../Login/session.php');
	if (!isset($_SESSION["token"]))
      header("Location:login.php");
?>

<!DOCTYPE HTML>
<html>
<head>

 <link href="../main/css/style.css" rel="stylesheet" type="text/css" media="screen">
 <script src="../main/scripts/jquery-1.11.1.min.js"></script>
 <script src="../main/scripts/metrics-elements-1.0.0.js"></script>


<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>Metrics Form</title>
</head>

<body>

    <div id="wrapper">
    	
	<script>
	document.body.onload=function()
	{
	  setDate();
	  fetch("group","refresh","id","members");
	}
	createTop("<?php print($user_check); ?>");
	createNavig();	
	</script>  
	
            
        <div id="maincontent">
            
	<script>
	createHeader("Facebook Query", 1);
	</script>
                
	<div class="databox_wide" id="projectlistbox">

	
	<form action="results.php" id="post" method="post">
<b>
Date from: <br/><input type="date" id="fromdate" name="fromdate" value="2014-01-01" onChange="checkDate()"/>
<br><br>
Date until: <br><input type="date" id="todate" name="todate" value="2014-01-01" onChange="checkDate()"/>
<span id="dateerr" style="background-color: #E39362"></span> 
<br><br>
Group ID: <br><input type="text" name="group" id="group" value="652060828245934" onchange="checkGroup()"/>
<select name="members" id="members"></select>
<span id="grouperr" style="background-color: #E39362"></span> 
<button id="addgroup" type="button" onclick="fetch('group','addgroup','addgroup','addgroup')">Add group to list</button>
<button id="update" type="button" onclick="fetch('group','update','group','update')">Update member list in DB</button>
<br><br>
Recent posts: <br><input id="count" name="count" type="number" value="5" min="1" onchange="checkRecent()"/>
<span id="recenterr" style="background-color: #E39362"></span> 
<br><br></b>
<input type="submit"/>
</form>
	
    </div>	
  
        </div>
    
	<br><br>
	<script>
	createFooter();
	</script>
	
    </div>
    
<script>

function fetch(source_elem,filename,param,target_elem) //allows producing all kinds of AJAX requests
{
  var val=document.getElementById(source_elem).value;
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      document.getElementById(target_elem).innerHTML=xmlhttp.responseText; //must have innerHTML; a text field would not
  }
  xmlhttp.open("GET",filename+".php?"+param+"="+val,true);
  xmlhttp.send();
}

function setDate()
{
  var today=new Date();
  var y=today.getFullYear().toString(),
  m=(today.getMonth()+1).toString(),
  d=today.getDate().toString();
  today=y+'-'+(m[1]?m:"0"+m[0])+'-'+(d[1]?d:"0"+d[0]); // padding
  document.getElementById("fromdate").setAttribute("max",today);
  document.getElementById("todate").setAttribute("max",today);
  document.getElementById("todate").value=today;
}

function checkGroup()
{
  var b=true;
  var el=document.getElementById("group").value;
  for (var i=0; i<el.length; i++)
    if ((el[i]<'0') || (el[i]>'9'))
	  b=false;
  if (!b)
	document.getElementById("grouperr").innerHTML="The group ID must contain digits only.";
  else document.getElementById("grouperr").innerHTML="";
  fetch("group","refresh","id","members");
}

function checkDate()
{
  var d1=document.getElementById("fromdate").value,
  d2=document.getElementById("todate").value;
  if ((d1>d2) && (d2!=""))
    document.getElementById("dateerr").innerHTML="The dates are in the wrong order.";
  else document.getElementById("dateerr").innerHTML="";  
}

function checkRecent()
{
  var el=document.getElementById("count").value;
  var el2=parseInt(el,10);
  if ((parseInt(el,10)==el)&& (el2>0))
    document.getElementById("recenterr").innerHTML="";
  else document.getElementById("recenterr").innerHTML="This field must be a positive integer.";
}
</script>
</body>
</html>