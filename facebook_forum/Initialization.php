<?php
	include('../Login/session.php');
?>

<!DOCTYPE HTML>
<html>
<head>

 <link href="../main/css/style.css" rel="stylesheet" type="text/css" media="screen">
 <script src="../main/scripts/jquery-1.11.1.min.js"></script>
 <script src="../main/scripts/SiteElements.js"></script>


<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>Metrics Form</title>
</head>

<body>

    <div id="wrapper">
    	
	<script>
	document.body.onload=function()
	{
	  setDate();
	  fetch();
	}
	createTop("<?php print($user_check); ?>");
	createNavig();	
	</script>  
	
            
        <div id="maincontent">
            
	<script>
	createHeader("Facebook Query", 1);
	</script>
                
	<div class="databox_wide" id="projectlistbox">

	
	<form action="login.php" id="post" method="post">
<b>
Date from: <br/><input type="date" id="fromdate" name="fromdate" value="2014-01-01" onChange="checkDate()"/>
<br><br>
Date until: <br><input type="date" id="todate" name="todate" value="2014-01-01" onChange="checkDate()"/>
<span id="dateerr" style="background-color: #E39362"></span> 
<br><br>
Group ID: <br><input type="text" name="group" id="group" value="652060828245934" onchange="checkGroup()"/>
<select name="members" id="members"></select>
<span id="grouperr" style="background-color: #E39362"></span> 
<button id="update" type="button" onclick="refreshGroup()">Update member list in DB</button>
<button id="addgroup" type="button" onclick="addGroup()">Add group to list</button>
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

function fetch()
{
  var val=document.getElementById("group").value;
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      document.getElementById("members").innerHTML=xmlhttp.responseText;
  }
  xmlhttp.open("GET","refresh.php?id="+val,true);
  xmlhttp.send();
}

function refreshGroup()
{
  var xmlhttp=new XMLHttpRequest();
  var val=document.getElementById("group").value;
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      document.getElementById("update").innerHTML=xmlhttp.responseText;
  }
  xmlhttp.open("GET","update.php?group="+val,true);
  xmlhttp.send();
}

function addGroup()
{
  var xmlhttp=new XMLHttpRequest();
  var val=document.getElementById("group").value;
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      document.getElementById("addgroup").innerHTML=xmlhttp.responseText;
  }
  xmlhttp.open("GET","addgroup.php?addgroup="+val,true);
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
  fetch();
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