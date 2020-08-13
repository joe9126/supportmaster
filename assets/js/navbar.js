/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


    
$(document).ready(function(){
    $("#myTopnav.menuitem").click(function(event){
       event.preventDefault(); 
    });
});

$(document).ready(function(){
     $(".topnav.menuitem").click(function(event){
       event.preventDefault(); // prevent browser refresh
    //  alert("linked clikced");
    
      var menuitem = $(this).attr('id');
       
       
         $.ajax({
        url:"home/moduleaccess",
        type:"post",
        dataType:"json",
       async:false, 
       success:function(data){
          // console.log(data);
          $.each(data, function(index,value){
            // console.log(value.type);
            if(value.type==="ADMINISTRATOR"||value.type==="Administrator"){
              window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });
            }else{
           if(value.modulename==="contracts"&&value.status>0){
             window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });           
           }else{
               Alert.render("Unauthorised Access! Contact Administrator!","Access Denied",noaccessiconUrl);
           }  
           if(value.modulename==="clients"&&value.status>0){
           window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });          
           }
            if(value.modulename==="calls"&&value.status>0){
             window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });          
           }else{
               Alert.render("Unauthorised Access! Contact Administrator!","Access Denied",noaccessiconUrl);
           }
            if(value.modulename==="gatepass"&&value.status>0){
            window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });            
           }else{
               Alert.render("Unauthorised Access! Contact Administrator!","Access Denied",noaccessiconUrl);
           }
            if(value.modulename==="parts"&&value.status>0){
           window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });          
           }else{
               Alert.render("Unauthorised Access! Contact Administrator!","Access Denied",noaccessiconUrl);
           }
            if(value.modulename==="settings"&&value.status>0){
            window.location.replace(menuitem); // it replaces id to url without refresh
                $(this).addClass('active').siblings().removeClass('active');
                $("#container").load(this.href, function(){ });          
           }else{
               Alert.render("Unauthorised Access! Contact Administrator!","Access Denied",noaccessiconUrl);
           }
       }
          });
       }
    });
    
       
   });
  
});