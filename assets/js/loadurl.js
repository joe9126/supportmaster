$(document).ready(function(){
    var pathname = window.location.pathname ;
    var page = pathname.substring(pathname.lastIndexOf("/")+1);
   // console.log(page);
   
   $.ajax({
       url:"home/"+page,
       type:"post",
       dataType:"text",
       async:false,
       data:{page:page},
       success:function(status){
           console.log(status);
           if(status<1){
               window.location.replace("dashboard");
               Alert.render("Unauthorised Access! Contact administrator!","Access Denied",noaccessiconUrl);
           }
       }
   });
});


