  $(document).ready(function(){
     // serviceclaims();
      getclientlist();
      
      var date = new Date();
      var random = Math.floor(Math.random()*100000);
      var clientno = "TSC-"+date.getFullYear()+"-"+random;
      $("#clientid").val(clientno);
  });
  
  $body = $("body");
  
  $(document).ajaxStart(function(){
      $("#loader").show();
  });
  
  $(document).ajaxComplete(function(){
       $("#loader").hide();
  });
  
  $(document).on({
      ajaxStart:function(){$body.addClass("loading");},
      ajaxStop: function(){$body.addClass("loading");}
  });

$(document).ready(function(){
    $("#claimtransporttype").change(function(){
       // alert("change detected");
        var transtype =     $("#claimtransporttype option:selected").val();
        if(transtype==="Public"){
            if($("#claimfare").css('display')==='none'){
                
                $("#claimfare").css({'display':'block'});
                  $("#farelabel").css({'display':'block'});
                  
                   $("#claimcompany").css({'display':'none'});
                  $("#compfarelabel").css({'display':'none'});
                  
                 $("#kmlabel").css({'display':'none'});    
                $("#claimkmtravelled").css({'display':'none'});
            }
        }
        else   if(transtype==="Company provided"){
            if($("#claimcompany").css('display')==='none'){
                
                $("#claimcompany").css({'display':'block'});
                  $("#compfarelabel").css({'display':'block'});
                  
                   $("#farelabel").css({'display':'none'});
                      $("#claimfare").css({'display':'none'});
                      
                        $("#kmlabel").css({'display':'none'});
                      $("#claimkmtravelled").css({'display':'none'});
            }
        }else  if(transtype==="Private"){
            if($("#claimkmtravelled").css('display')==='none'){
                
                $("#claimcompany").css({'display':'none'});
                  $("#compfarelabel").css({'display':'none'});
                  
                   $("#farelabel").css({'display':'none'});
                      $("#claimfare").css({'display':'none'});
                      
                        $("#kmlabel").css({'display':'block'});
                      $("#claimkmtravelled").css({'display':'block'});
            }
        }
    });
});



function serviceclaims(){
     $("#servicelisttable").DataTable().destroy();
    $.ajax({
        url:"calls/getservice",
        type:"get",
        async: false,
        dataType:"json",
        success:function(data){
            //console.log(data);
            var i=1;
            $("#servicelisttable").DataTable({
                processing: true,
                dom:'Bfrtip',
                buttons:[
                         {
                            extend: 'excelHtml5',
                            title: 'Sales Leads'
                        },
                            {
                             extend: 'csvHtml5',
                            title: 'Sales Leads'
                            },
                            {
                             extend: 'copyHtml5',
                             title: 'Sales Leads'
                            },
                         {
                             extend: 'pdfHtml5',
                             title: 'Sales Leads'
                            }
                   // 'copy','csv','excel','pdf','print'
                 ],
                data:data,
                createdRow: function(row,data,index){
                    $(row).attr('class','servicerow' );
                    $(row).attr('id',index).find('td').eq(1).attr('class','callnum');
                      $(row).attr('id',index).find('td').eq(2).attr('class','jobcardserial');
                    $(row).attr('id',index).find('td').eq(3).attr('class','servicedate');
                    $(row).attr('id',index).find('td').eq(4).attr('class','client');
                      $(row).attr('id',index).find('td').eq(5).attr('class','location');
                       $(row).attr('id',index).find('td').eq(7).attr('class','tech');
                   },
                columns:[
                    {mRender:function(){
                            return i++;
                    }},
                {data:"call_no"},
                {data:"service_no"},
                {mRender:function(data,type,row){
                        return moment(row.service_date).format('ddd Do MMM,YYYY');
                }},
                {data:"clientname"},
                {data:"location"},
                {mRender:function(data,type,row){
                       var claimstatus = row.status;
                        if(row.status===null|| typeof row.status ==='undefined'){
                             claimstatus = "NO CLAIM";
                        }
                        return claimstatus;
                }},
                {data:"staffname"} 
                ],
                 deferRender: true,
                 bFilter:true,
                 aFilter:true,
                 Filter:true,
                filter:true,
                autoWidth:false,
                bAutoWidth:false,
                pageLength:10,
                bLengthChange:true
            });
        }
    });
}
$(document).ready(function(){
      $("#searchservice").keyup(function(){
                 $("#servicelisttable").DataTable().search($(this).val()).draw();
             }); 
});

$(document).ready(function(){
   // var table1  = $("#servicelisttable").DataTable();
    //table1.rows().every(function(rowId,tableLoop,rowLoop){
         $("#servicelisttable").on("click",".servicerow", function(){
       var claimcallno = $(this).closest("tr").find("td:eq(1)").text();
       var serviceno = $(this).closest("tr").find("td:eq(2)").text();
       var srevicedate = $(this).closest("tr").find("td:eq(3)").text();
       var client = $(this).closest("tr").find("td:eq(4)").text();
       var location = $(this).closest("tr").find("td:eq(5)").text();
       var status = $(this).closest("tr").find("td:eq(6)").text();
       
       //console.log(" claim status"+status);
       if(status ==='CLAIMED'){
             Alert.render("Job Card No. "+serviceno+" has been claimed!","Alert",failiconUrl);
           $("#claimform")[0].reset();
       }else{
            $("#claimcallno").val(claimcallno);
             $("#claimserviceno").val(serviceno);
        $("#claimservicedate").val(srevicedate);
           $("#claimclient").val(client);
              $("#claimlocation").val(location);
        
       }  
             
         });
         
});

$(document).ready(function(){
    $("#claimform").validate({
        rules:{
            claimcallno:{required:true},
            claimserviceno:{required:true},
            claimtransporttype:{required:true},
            claimkmtravelled:{required:true,number:true},
            claimfare:{required:true,number:true},
            claimlunch:{required:true,number:true},
            claimdinner:{required:true,number:true},
            claimaccomodation:{required:true,number:true},
            claimpetties:{required:true,number:true},
            claimothers:{required:true,number:true},
            claimlaundry:{required:true,number:true}
        },
        messages:{
             claimcallno:{required:"Call number required"},
            claimserviceno:{required:"Job card number required!"},
            claimtransporttype:{required:"Transport type required"},
            claimkmtravelled:{required:"Kilometer travelled required",number:"Must be a number"},
            claimfare:{required:"PSV fare required",number:"Must be a number"},
            claimlunch:{required:"Lunch claim required",number:"Must be a number"},
            claimdinner:{required:true,number:"Must be a number"},
            claimaccomodation:{required:"Accomodation claim required",number:"Must be a number"},
            claimpetties:{required:"Petties claim required",number:"Must be a number"},
            claimothers:{required:"Other claims required",number:"Must be a number"},
             claimlaundry:{required:"Laundry claim required",number:"Must be a number"}
        },
        submitHandler:function(form,e){
            e.preventDefault();
            var claimserviceno = $("#claimserviceno").val();
            Confirm.render("Create mileage claim for job card number "+claimserviceno+"?","createclaim","","");
        }
    });
});

function createClaim(){
    var claimcallno = $("#claimcallno").val();
    var claimserviceno = $("#claimserviceno").val();
   var  claimtransporttype = $("#claimtransporttype").val();
   var claimkmtravelled = $("#claimkmtravelled").val();
   var claimfare = $("#claimfare").val();
   var claimlunch = $("#claimlunch").val();
   var claimdinner = $("#claimdinner").val();
   var claimaccomodation = $("#claimaccomodation").val();
   var claimpetties = $("#claimpetties").val();
   var claimothers = $("#claimothers").val();
   var claimlaundry = $("#claimlaundry").val();
   
   var claims = {"call_no":claimcallno,"service_no":claimserviceno,"km":claimkmtravelled,"psvfare":claimfare,"bfast":"0",
      "lunch":claimlunch,"dinner":claimdinner,"accomod":claimaccomodation,"laundry":claimlaundry,"petties":claimpetties,"others":claimothers,
  "status":"UNCLAIMED","date_claimed":"N/A","claimno":"N/A"};
    
    var claimdata = JSON.stringify(claims);
    //console.log(claimdata);
   $.ajax({
       url:"calls/createclaim",
       type:"post",
       dataType:"json",
       data:{"claimdata":claimdata},
       success:function(status){
        //console.log(status);
           if(status>0){
               Alert.render("Claim created successfully!","Alert",successiconUrl);
               serviceclaims();
               $("#claimform")[0].reset();
           }
           else{
              Alert.render("Claim was not created!","Alert",failiconUrl); 
           }
       }
   });
}

$(document).ready(function(){
    $("#clientform").validate({
        rules:{
            clientid:{required:true},
            clientname:{required:true,minlength:3},
            clientaddress:{required:true,minlength:3},
            clientcity:{required:true,minlength:3},
            phone:{required:true, number:true},
            clientcontact:{required:true},
            primaryemail:{required:true,email:true},
            extraemail1:{email:true},
            extraemail2:{email:true},
            extraemail3:{email:true}
            
        },
        messages:{
              clientid:{required:"Client ID required",minlength:"At least 3 characters long"},
            clientname:{required:"Client name required",minlength:"At least 3 characters long"},
            clientaddress:{required:"Client address required",minlength:"At least 3 characters long"},
            clientcity:{required:"City required",minlength:"At least 3 characters long"},
            phone:{required:"Phone required", number:"Must be numeric"},
            clientcontact:{required:"Contact person required"},
            primaryemail:{required:"Primary email required",email:"Valid email required"},
            extraemail1:{email:"Valid email required"},
            extraemail2:{email:"Valid email required"},
            extraemail3:{email:"Valid email required"}
            
        },
        submitHandler:function(form,e){
            e.preventDefault();
            Confirm.render("Save "+$("#clientname").val()+" details?","newclient","","");
            }
    });
});

function updateclients(){
      var clientname = $("#clientname").val();
      var clientid = $("#clientid").val();
       var clientaddress =  $("#clientaddress").val();
         var   clientcity= $("#clientcity").val();
          var  phone = $("#phone").val();
           var clientcontact=  $("#clientcontact").val();
           var  primaryemail=  $("#primaryemail").val();
          var  extraemail1 =  $("#extraemail1").val();
         var   extraemail2 =  $("#extraemail2").val();
          var  extraemail3 = $("#extraemail3").val();
          var clientstatus = $("#clientstatus option:selected").val();
          
      $.ajax({
                url:"home/updateclient",
                type:"post",
                dataType:"text",
                data:{clientid:clientid,clientname:clientname,clientaddress:clientaddress,clientcity:clientcity,phone:phone,clientcontact:clientcontact,
               primaryemail:primaryemail,extraemail1:extraemail1,extraemail2:extraemail2,extraemail3:extraemail3,clientstatus:clientstatus },
                success:function(status){
                if(status>0){
                    Alert.render("Client details saved successfully!","Alert",successiconUrl);
                    $("#clientform")[0].reset(); getclientlist();
                }else{
                    Alert.render("Client details not saved!","Alert",failiconUrl); 
                }
                 
                }
            }
           );
}

$(document).ready(function(){
    $("#clientslisttable").on("click",".clientrow",function(){
        var clientno = $(this).closest("tr").find("td:eq(2)").text();
        $.ajax({
            url:"home/getclientselect",
            type:"post",
            dataType:"json",
            async:false,
            data:{clientno:clientno},
            success:function(data){
                $("#clientid").val(data[0].client_no);
                $("#clientname").val(data[0].clientname);
                $("#clientaddress").val(data[0].pobox);
                $("#clientcity").val(data[0].town);
                $("#phone").val(data[0].mobile);
                $("#clientcontact").val(data[0].cont_person);
                $("#primaryemail").val(data[0].email);
                $("#extraemail1").val(data[0].email_1);
                $("#extraemail2").val(data[0].email_2);
                $("#extraemail3").val(data[0].email_3);
                 $("#clientstatus option:selected").val(data[0].status); $("#clientstatus option:selected").text(data[0].status);
            }
        });
    });
});
function getclientlist(){
    $("#clientslisttable").DataTable().destroy();
    $.ajax({
        url:"home/getclientlist",
        type:"get",
        dataType:"json",
        success:function(data){
            var i=1;
            $("#clientslisttable").DataTable({
                data:data,
                createdRow:function(row,data,index){
                     $(row).attr('class','clientrow' );
                      $(row).attr('id',index).find('td').eq(1).attr('class','deleteicon');
                     $(row).attr('id',index).find('td').eq(2).attr('class','clientid');
                       $(row).attr('id',index).find('td').eq(3).attr('class','clientname');
                         $(row).attr('id',index).find('td').eq(4).attr('class','address');
                           $(row).attr('id',index).find('td').eq(5).attr('class','city');
                            $(row).attr('id',index).find('td').eq(6).attr('class','phone');
                             $(row).attr('id',index).find('td').eq(7).attr('class','contact');
                               $(row).attr('id',index).find('td').eq(8).attr('class','email');
                },
                columns:[
                   {mRender:function(){
                      return i++;    
                   }},
               {mRender:function(){
               var deletebtn = "<a class='' onclick='deleteclient($(this))'><img src='http://support.symphonykenya.com/assets/images/icons/delete.png' width='20px' height='20px'></a>";
               return deletebtn;
                   }},
               {data:"client_no"},
               {data:"clientname"},
               {data:"pobox"},
               {data:"town"},
               {data:"mobile"},
               {data:"cont_person"},
               {data:"email"},
               {data:"status"}
                ],
            pageLength:15,
            bLengthChange:true,
           autoWidth:false,
           bAutoWidth:false,
           filter:true
            });
        }
    });
}

function deleteclient(row){
     var clientid = row.closest('tr').find('td.clientid').text();
     var clientname = row.closest('tr').find('td.clientname').text();
     Confirm.render("Delete "+clientname+"?","deleteclient",clientid);
}


function deleteclientselect(clientid){
    $.ajax({
        url:"home/deleteclient",
        type:"post",
        dataType:"text",
        data:{clientid:clientid},
        success:function(status){
            if(status>0){
                Alert.render("Client details deleted successfully!","Alert",successiconUrl);
                  $("#clientform")[0].reset(); getclientlist();
            }else{
                 Alert.render("Client details canot deleted. Associated data found!","Alert",failiconUrl);
            }
        }
    });
}

$(document).ready(function(){
    $("#searchclient").keyup(function(){
        $("#clientslisttable").DataTable().search($(this).val()).draw();
    });
});



//get selected CSR
$(document).ready(function(){
    $("#csrlisttable").on("click",".csrdatarow",function(){
         var csrnum = $(this).closest("tr").find("td:eq(2)").text();
        
     document.getElementById("csrlistdiv").style.display = "none"; 
     document.getElementById("dialogoverlay").style.display = "none";
      document.getElementById("postdialogoverlay").style.display = "none"; 
     //  alert(" csr num:"+csrno);
       $("#csrnumber").val( csrnum); 
     $.ajax({
         url:"supplyrequests/getcsrselect",
         type:"post",
         dataType:"json",
         async:false,
         data:{csrno:csrnum},
         success:function(data){
         var i=0;
          $.each(data,function(index,value){
              // console.log(value.csrno);
             $("#csrnumber").val(value.csrno);   $("#clientname option:selected").val(value.clientno); $("#clientname option:selected").text(value.clientname);
             $("#description").val(value.description);  $("#csrdate").val(value.csrdate);
               $("#ponumber").val(value.ponum); $("#podate").val(value.podate);
                 $("#currency option:selected").val(value.currency);   $("#currency option:selected").text(value.currency); 
                 $("#staffname option:selected").val(value.soldby);   $("#staffname option:selected").text(value.soldby); 
                 $("#deptmanager option:selected").val(value.dept_approval);  $("#deptmanager option:selected").text(value.dept_approval); 
                   $("#finmanager option:selected").val(value.fin_approval);  $("#finmanager option:selected").text(value.fin_approval); 
                     $("#dirmanager option:selected").val(value.dir_approval);  $("#dirmanager option:selected").text(value.dir_approval); 
                 $("#csrtotal").val(numeral(value.csrvalue).format("0,0.00"));
             
          i++;});
     
           $.ajax({
                      url:"supplyrequests/getcsritems",
                      type:"post",
                      dataType:"json",
                      data:{csrno:csrnum},
                      async:false,
                      success:function(data){
                       //   console.log(data); 
                       var i=1;
                        $("#csrtablebody").empty();
                      

                   $.each(data,function(index,value){
                          let itemtotal=0;
                              var deleteicon = "<a class='deleterow' onclick='deleterow($(this))'><img src='http://support.symphonykenya.com/assets/images/icons/delete.png' width='20px' height='20px'></a>";
              var subtotal = parseFloat(value.unitcost)*parseFloat(value.qty); 
             // console.log("vat "+(1+ parseFloat(value.vat)/100));
             var unitbp = value.unitbp;
            itemtotal  = (subtotal)*(1 + (parseFloat(value.vat)/100)).toFixed(2);
              var tr = "<tr><td>"+deleteicon+"</td><td>"+i+"</td><td class='itemid'>"+value.id+"</td><td contenteditable='true'>"+value.partno+"</td><td class='description' contenteditable='true'>"+value.description+"</td><td contenteditable='true'>"+value.qty+"</td><td contenteditable='true'>"+value.unitbp+"</td><td contenteditable='true'>"+value.margin+"</td><td>"+value.unitcost+"</td><td contenteditable='true'>"+value.vat+"</td><td>"+numeral(itemtotal).format("0,0.00")+"</td></tr>";
              $("#csrtablebody").append(tr);
                         i++; });
                      }
                  });
         }
     });
    });
});

function deleteCsr(){
    var csrno = $("#csrnumber").val();
   var dept = $("#department option:selected").val();
   if(dept ===""||dept===null){
          Alert.render("Select department!","Alert",failiconUrl);
   }
    else if(csrno ===""||csrno===null){
        Alert.render("CSR number is required!","Alert",failiconUrl);
    }else{
        Confirm.render("Delete CSR No. "+csrno+"?","deletecsr","");
    }
}

function deleteCsrselect(){
     var csrno = $("#csrnumber").val();
      var dept = $("#department option:selected").val();
     $.ajax({
         url:"supplyrequests/deleteCsr",
         type:"post",
         async:false,
         dataType:"text",
         data:{csrno:csrno,dept:dept},
         success:function(status){
             if(status>0){
                 Alert.render("CSR No "+csrno+" deleted successfully!","Alert",successiconUrl);
                 $("#csrform")[0].reset();
                 //window.location.reload(false);
             }
         }
     });
}

$(document).ready(function(){
    $.ajax({
        url:"home/moduleaccess",
        type:"get",
        dataType:"json",
       async:false, 
       success:function(data){
           console.log(data);
          $.each(data, function(index,value){
             console.log(value.type);
            if(value.type==="ADMINISTRATOR"||value.type==="Administrator"){
                 $("a#contracts").css({"display":"block"});
                 $("a#clients").css({"display":"block"}); 
                 $("a#calls").css({"display":"block"}); 
                 $("a#gatepass").css({"display":"block"});
                 $("a#parts").css({"display":"block"}); 
                 $("a#settings").css({"display":"block"}); 
            }else{
           if(value.modulename==="contracts"&&value.status>0){
             $("a#contracts").css({"display":"block"});               
           }  
           if(value.modulename==="clients"&&value.status>0){
            $("a#clients").css({"display":"block"});              
           }
           if(value.modulename==="calls"&&value.status>0){
            $("a#calls").css({"display":"block"});              
           }
       }
          });
       }
    });
});