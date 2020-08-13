 var successiconUrl= 'http://'+domain+'/assets/images/icons/success.png';
  var failiconUrl= 'http://'+domain+'/assets/images/icons/warning.png';
  
$(document).ready(function(){
    $("#loginform").validate({
        rules:{
            username:{required:true},
            password:{required:true}
        },
        messages:{
             username:{required:"Email is required!"},
            password:{required:"Password is required!"}
        },
        submitHandler:function(form,e){
            e.preventDefault();
            var username = $("#username").val();
            var password =$("#password").val();
            $.ajax({
                url:"home/authenticate",
                type:'post',
                dataType:'json',
                data:{username:username, password:password},
                success:function(data){
                    console.log(data);
                    if(data.accountstatus==="DEACTIVATED"){
                        Alert.render("Account locked. Contact administrator!","Access Denied",failiconUrl); 
                    }
                    /*else if(data.usertype==="USER"){
                       Alert.render("You are not authorised. Contact Admin!","Unauthorised Access",failiconUrl);  
                    }*/
                   else if(data.status ==="loggedin"){
                       $("#logindiv").hide();
                     Loginalert.render("Login Successful, "+data.staffname+". ","Welcome",successiconUrl);
                    }else{
                        Alert.render("Email or password is incorrect","Access Denied",failiconUrl);
                    }
                }
            });
        }
    });
});


function CustomAlert(){
	this.render = function(dialogmessage,popupTilte,iconUrl){
	var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('alertdialogbox');
            
            dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
            dialogbox.style.left = (winW/2) - (550 * .5)+"px";
             
               
	    dialogbox.style.top = "200px";
	    dialogbox.style.display = "block";
            
		document.getElementById('alertdialogboxhead').innerHTML = popupTilte;
	    document.getElementById('alertdialogboxbody').innerHTML = dialogmessage;
            $('#alertdialogboxbody').css("background-image", "url("+iconUrl+")"); 
		document.getElementById('alertdialogboxfoot').innerHTML = '<button class="okBtn" onclick="Loginalert.ok()">OK</button>';
                $(".okBtn").focus();
	};
	this.ok = function(){
               document.getElementById('alertdialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
              window.location.replace("dashboard");
	};
}
var Loginalert = new CustomAlert();



function MessageAlert(){
	this.render = function(dialog,popupTilte,iconUrl){
	var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('alertdialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "200px";
	    dialogbox.style.display = "block";
            
		document.getElementById('alertdialogboxhead').innerHTML = popupTilte;
	    document.getElementById('alertdialogboxbody').innerHTML = dialog;
            $('#alertdialogboxbody').css("background-image", "url("+iconUrl+")"); 
		document.getElementById('alertdialogboxfoot').innerHTML = '<button class="okBtn" onclick="Alert.ok()">OK</button>';
                $(".okBtn").focus();
	};
	this.ok = function(){
		document.getElementById('alertdialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
                $("#searchtxt").focus();
	};
}
var Alert = new MessageAlert();

