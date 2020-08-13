var domain ="support.symphonykenya.com";
var $defaultTable =null ;
 var successiconUrl= 'http://'+domain+'/assets/images/icons/success.png';
  var failiconURL = 'http://'+domain+'/assets/images/icons/warning.png';
  var noaccessiconUrl = 'http://'+domain+'/assets/images/icons/noaccess.png';
  //var techtableclone = jQuery("#technicianstable").clone(true);
 var $callsTable;
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
    $(".datepicker").datepicker({ dateFormat: "dd MM,yy" }); 
    $("input.timepicker").timepicker({});
      $("form :input").attr("autocomplete", "off");
      
  $defaultTable = $('#supplylisttable').clone(true);
  //$callsTable = $('#callstable').clone(true);
   //populatecalls();

  
  $("#closelistbtn").click(function(){
       var dialogoverlay = document.getElementById('dialogoverlay'); 
         var dialogbox = document.getElementById('csrlistdiv');
         
        dialogbox.style.display = "none";
          dialogoverlay.style.display = "none";
          $("#csrlisttable").DataTable().destroy();
  });
});

$(document).ready(function(){
     var grandtotal=0;
    $("#supplylisttable").keyup(function(){
            var rows = $("table#supplylisttable >tbody >tr").length;
            var subtotal; 
             for(var i=1;i<=rows;i++){
                 var itemname = $("tr:nth-child("+i+") td:nth-child(5)").html();
                 var itemid = $("tr:nth-child("+i+") td:nth-child(3)").html();
                 //console.log("item id is "+itemid);
                 var qty =  parseFloat($("tr:nth-child("+i+") td:nth-child(6)").html());
                var unitbuyprice =  parseFloat($("tr:nth-child("+i+") td:nth-child(7)").html()); 
                  var marginrate =  parseFloat($("tr:nth-child("+i+") td:nth-child(8)").html());
                 //  var formatprice = numeral(unitprice).format('0,0.0');
                //$("tr:nth-child("+i+") td:nth-child(7)").text(formatprice);
                var vat = parseFloat($("tr:nth-child("+i+") td:nth-child(10)").html());
                 var unitsaleprice =0;
                 
       if(!isNaN(qty) && !isNaN(unitbuyprice)&&!isNaN(marginrate)){
            unitsaleprice = ((marginrate+100)/100)*unitbuyprice;
            $("tr:nth-child("+i+") td:nth-child(9)").text(unitsaleprice.toFixed(2));
            
        //  var formatsubtotal =  numeral(subtotal).format('0,0.0');
          //  $("tr:nth-child("+i+") td:nth-child(8)").text(formatsubtotal);
              if(!isNaN(vat)){
           var itemtotal = ((100+vat)/100)*(unitsaleprice)*qty;
             $("tr:nth-child("+i+") td:nth-child(11)").text(numeral(itemtotal).format('0,0.00'));
             
           grandtotal = grandtotal+itemtotal;
         //  $("#csrtotal").val(numeral(grandtotal).format('0,0.0'));
           
         }
         }
     
   }
    });

    $("#supplylisttable").keypress(function(e){
    if(e.keyCode===13){
      e.preventDefault();
            addrow();
        }
       });
});


$(document).ready(function(){
   $("#savebtn").click(function(e){
         
 $("#csrform").validate({
        rules:{
          clientname:{required:true},
            csrnumber:{required:true},
            description:{required:true,minlength:3},
            csrdate:{required:true},
            ponumber:{required:true,minlength:3},
            podate:{required:true},
            currency:{required:true},
            staffname:{required:true},
            deptmanager:{required:true},
            finmanager:{required:true},
            dirmanager:{required:true}
         },
        messages:{
            clientname:{required:"Client name required"},
            csrnumber:{required:"CSR number required"},
            description:{required:"Description required",minlength:"At least 3 characters"},
            csrdate:{required:"CSR date required"},
            ponumber:{required:"PO number required",minlength:" At least 3 characters"},
            podate:{required:"PO date required"},
            currency:{required:"Currency required"},
            staffname:{required:"Sales person required"},
            deptmanager:{required:"Dept. approval required "},
            finmanager:{required:"Finance approval required"},
            dirmanager:{required:"Director approval required"}
        },
        submitHandler:function(form,e){
            e.preventDefault();
              var department = $("#department option:selected").val();
              var clientname = $("#clientname option:selected").text();
            if(department ===""||department===null){
                Alert.render("Please select department!","Alert",failiconUrl); 
            }
            else{
            var itemslist = $("#supplylisttable tbody tr").length;
            if(itemslist<1){
                Alert.render("Add at least one item!","Alert",failiconUrl);
            }else{
                var csrtotal=0;
                for(var i=1;i<=itemslist;i++){
                 csrtotal = csrtotal +  numeral($("tr:nth-child("+i+") td:nth-child(10)").text()).value();
                }
                if(csrtotal<1){
                    Alert.render("Add at least one item!","Alert",failiconUrl); 
                }else{
                  Confirm.render("Save CSR for "+clientname+"?","csr");
                }
            }
        }
        }
    });
            
   });
    
           
   
});
function addrow(){
     var rows = $("table#supplylisttable >tbody >tr").length;
     console.log("items table rows "+rows);
      var extrarow = "<tr>\n\
<td><a class='deleterow' onclick='deleterow($(this))'><img src='http://"+domain+"/assets/images/icons/delete.png' width='20px' height='20px'></a></td>\n\
                        <td class='no'>"+(rows+1)+"</td>\n\
                        <td class='itemid'>"+(rows+1)+"</td>\n\
                        <td class='partno' contenteditable='true'></td>\n\
                        <td class='descr' contenteditable='true'></td>\n\
                        <td class='qty' contenteditable='true'></td>\n\
                        <td class='unitBP'contenteditable='true'></td>\n\
                        <td class='margin'contenteditable='true'></td>\n\
                       <td class='unitSPcell'contenteditable='false'></td>\n\\n\
                        <td class='vat' contenteditable='true'>16.00</td>\n\
                      <td class='itemtotal' contenteditable='false'>0.00</td></tr>";
     if(rows===0){
           $("#supplylisttable tbody").append(extrarow);
     }
     else{

      //console.log("row index is "+rows);
     
       var partno = $("tr:nth-child("+rows+") td:nth-child(4)").text();
       var descript = $("tr:nth-child("+rows+") td:nth-child(5)").text();
       var qty = $("tr:nth-child("+rows+") td:nth-child(6)").text();
       var unitprice = $("tr:nth-child("+rows+") td:nth-child(7)").text();
       var vat = $("tr:nth-child("+rows+") td:nth-child(9)").text();
       
      //console.log("cell data "+partno);
      if(partno.trim()===""){Alert.render("Please enter item part number","Alert",failiconUrl);}
      else if(descript.trim()===""){Alert.render("Please enter item description","Alert",failiconUrl);}
       else if(qty.trim()===""){Alert.render("Please enter item quantity","Alert",failiconUrl);}
        else if(unitprice.trim()===""){Alert.render("Please enter item unit price","Alert",failiconUrl);}
         else if(vat.trim()===""){Alert.render("Please enter item VAT percentage","Alert",failiconUrl);}
      else{
          $("#supplylisttable tbody").append(extrarow);
          $("tr:nth-child("+(rows+1)+") td:nth-child(4)").focus();
          }
  }  
         
}

/*DELETE TABLE ROW*/
/*function deleterow(row){
 
   var rows = $("table#supplylisttable >tbody >tr").length;
   
    var subtotal = parseFloat(row.closest('tr').find('td.itemsubtotal').text());
     //console.log("item total is "+subtotal);
    var grandtotal = parseFloat($("#totalsaletxt").val());
    grandtotal = grandtotal - subtotal;
    $("#totalsaletxt").val(grandtotal).text();
    row.closest('tr').remove();  
    for(var i=1;i<=rows;i++){
     $("tr:nth-child("+i+") td:nth-child(2)").html(i);
      }  
}*/


 $(document).ready(function(e){
     $("#department").on("change",function(){
      var department = $("#department option:selected").val();
   //  ////console.log("dept change activated :"+department);
  $("#deptnamespan").text(department.toUpperCase()+" DEPARTMENT");
   $("#deptnamespan1").text(department.toUpperCase()+" DEPARTMENT");
    $.ajax({
        async:true,
        url:"home/countcsr",
         type:"post",
        dataType:"json",
        data:{deptname:department},
        success:function(data){
           // //console.log("csr num "+data);
            var date = new Date();
           // //console.log(data[0]);
           var csrcount = data[0].csrnum;
           var csrnumber=0;
           if(csrcount<1){csrnumber=1;}else{csrnumber = parseFloat(data[0].csrnum)+1;}
           if(department==="Technical Service"){
               if(csrnumber>100){
                    $("#csrnumber").val("TS"+date.getFullYear()+"/"+csrnumber); 
               }
               else if(csrnumber>=10 && csrnumber<100){
                    $("#csrnumber").val("TS"+date.getFullYear()+"/0"+csrnumber);  
               }else  if(csrnumber<10){
                     $("#csrnumber").val("TS"+date.getFullYear()+"/00"+csrnumber);
               }
                
           }else if(department ==="Sales"){
                if(csrnumber>100){
                    $("#csrnumber").val("SI"+date.getFullYear()+"/"+csrnumber); 
               }
              else  if(csrnumber>=10 && csrnumber<100){
                     $("#csrnumber").val("SI"+date.getFullYear()+"/0"+csrnumber); 
                }else  if(csrnumber<10){
                     $("#csrnumber").val("SI"+date.getFullYear()+"/00"+csrnumber);
               }
                 
           }
         }
    });
     });
 
 

});
 /* UPDATE BROWSER URL ON A HREF CLICK */
 $(document).ready(function(e){
       $('.menuitem').click(function(e){
            e.preventDefault();
            var value = $(this).attr('id');
            window.location.replace(value); // it replaces id to url without refresh
        });
});  
 /* END OF UPDATE BROWSER URL ON A HREF CLICK */ 

$(document).ready(function(){
    $.ajax({
        url:"home/clients",
        type:"post",
        dataType:"json",
        success:function(data){
          //  //console.log("client data "+data[0].CLASSNAME);
            $.each(data, function(index, value){
             var classoption ="<option value="+value.client_no+">"+value.clientname+"</option>";   
             $("#clientname").append(classoption);            
           
            });
        }
    });
    
     $.ajax({
     url:"home/getstaff",
     type:"post",
     dataType:"json",
     success:function(data){
         $.each(data, function(index, value){
             var staffoption ="<option value="+value.staffno+" data-phone="+value.phone+">"+value.staffname+"</option>";   
             $("#staffname").append(staffoption); 
              $("#deptmanager").append(staffoption); 
               $("#finmanager").append(staffoption); 
                $("#dirmanager").append(staffoption); 
            }); 
     }
 });
 
    
   
});

function openTab(evt,tabid){
    var i;
    var x = document.getElementsByClassName("tabcontainer");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
        // //console.log("tab hidden"); 
         document.getElementById(tabid).style.display = "block";
    }
    populatecalls();
    serviceclaims();
}

$(document).ready(function(){
    $("#dialogbox").keyup(function(event){
        if(event.keyCode===13){
            document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        }
    });
});

$(document).ready(function(){
    $(".tabhead").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});



function confirmDialog(){
    this.render = function(dialog,op,data){
        ////console.log("confirmation dialog initiated.");
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay =  document.getElementById("dialogoverlay");
         var postdialogoverlay =  document.getElementById("postdialogoverlay");
        var dialogbox = document.getElementById("dialogbox");
        
        // style the dialog overlay window
        dialogoverlay.style.display = "block";
         dialogoverlay.style.height = winH+"px";
          dialogoverlay.style.width = winW+"px";
          
         postdialogoverlay.style.display = "block";
         postdialogoverlay.style.height = winH+"px";
          postdialogoverlay.style.width = winW+"px";
          //Style the dialog box;
           dialogbox.style.left = (winW/2) - (550 * .5)+"px";
           dialogbox.style.top = "200px";
           dialogbox.style.display = "block";
           
     document.getElementById("dialogboxhead").innerHTML = "Confirm";
     document.getElementById("dialogboxbody").innerHTML = dialog;
   document.getElementById('dialogboxfoot').innerHTML = '<button class="okBtn" onclick="Confirm.yes(\''+op+'\',\''+data+'\',)">Yes</button> <button class="noBtn" onclick="Confirm.no()">No</button>';
  $(".okBtn").focus();
    };
    
    this.no = function(){
        document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
          document.getElementById("postdialogoverlay").style.display = "none";
        $("#searchtxt").focus();
    };

this.yes = function(op,data){
     document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
          document.getElementById("postdialogoverlay").style.display = "none";
    if(op === "csr"){
        $(createCSR);
         // $("#searchtxt").focus();
    }
    else if(op==='deletecsr'){
        deleteCsrselect();
    }
 else if(op === 'newcall'){
    $(openCall); 
 }
 else if(op === 'deletecall'){
   calldeletion(data); 
 }  
 else if(op ==='serviceentry'){
     $(serviceEntry); 
 }
  else if(op ==='createclaim'){
     $(createClaim); 
 }
 else if(op ==='newclient'){
     updateclients(); 
 }
 else if(op ==='deleteclient'){
     deleteclientselect(data); 
 }
};
}
var Confirm = new confirmDialog();


function createCSR(){
    var department = $("#department option:selected").val();
    var clientid = $("#clientname option:selected").val();
    var csrnum = $("#csrnumber").val();
    var description = $("#description").val();
var csrdate = moment($("#csrdate").val()).format('YYYY-MM-DD');
    var ponum = $("#ponumber").val();
var podate = moment($("#podate").val()).format('YYYY-MM-DD');
    var currency = $("#currency option:selected").val();
     var salesperson =  $("#staffname option:selected").text();
       var deptmanager =  $("#deptmanager option:selected").text();
          var finmanager =  $("#finmanager option:selected").text();
             var dirmanager =  $("#dirmanager option:selected").text();
          
      var rows = $("#supplylisttable tbody tr").length; 
      var grandtotal=0, grandtotalBP=0, itemSP=0, grandtotalSP=0, grandmargin=0, marginrate=0; 
      
           for(var i=1;i<=rows;i++){
               var itemtotal = parseFloat($("tr:nth-child("+i+") td:nth-child(11)").text().replace(",",""));
               grandtotal =grandtotal+itemtotal;
               var itemBp = parseFloat($("tr:nth-child("+i+") td:nth-child(7)").text().replace(",",""));
               grandtotalBP = parseFloat(grandtotalBP) +itemBp;
               
               itemSP  = parseFloat($("tr:nth-child("+i+") td:nth-child(9)").text().replace(",",""));
               grandtotalSP = grandtotalSP + itemSP;
               grandmargin = grandtotalSP - grandtotalBP;
               
               marginrate = (grandmargin/grandtotalBP)*100;
           }
      
       $.ajax({
             url:"supplyrequests/createcsr",
             type:"post",
             dataType:"text",
             async:false,
             data:{department:department,clientid:clientid,csrnum:csrnum,description:description,csrdate:csrdate,ponum:ponum,podate:podate,
                      currency:currency,salesperson:salesperson,deptmanager:deptmanager,finmanager:finmanager,dirmanager:dirmanager,csrvalue:grandtotal,grandtotalBP:grandtotalBP,marginrate:marginrate},
             success:function(csrdetailstatus){
              //  console.log("status: "+data);
               //  if(data>0)
                var csritemstatus=0;
                     var csrvalue=0; var itemtotal;
                     for(var i=1;i<=rows;i++){
                           itemtotal = numeral(parseFloat($("tr:nth-child("+i+") td:nth-child(10)").text().replace(",",""))).value();
                          csrvalue = csrvalue+itemtotal;  
                          var itemid =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(3)").text();
                            var  partno = $("#supplylisttable tr:nth-child("+i+") td:nth-child(4)").text();
                             var descript = $("#supplylisttable tr:nth-child("+i+") td:nth-child(5)").text();
                             var qty =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(6)").text();
                             var unitBP =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(7)").text();
                             var margin  =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(8)").text();
                             var unitSP  =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(9)").text();
                             var vat =  $("#supplylisttable tr:nth-child("+i+") td:nth-child(10)").text();
                           //  //console.log("item details: "+partno+" "+descript+" "+qty+" "+unitcost+" "+vat);
                                $.ajax({
                                    url:"supplyrequests/additems",
                                    type:"post",
                                    dataType:"json",
                                    async:false,
                                    data:{department:department,csrnum:csrnum,partno:partno,descript:descript,qty:qty,unitBP:unitBP,margin:margin,unitSP:unitSP,vat:vat,itemid:itemid},
                                    success:function(status){
                                       // console.log(data);
                                      csritemstatus = status;
                                    }
                                });
                             }
                                     if(csritemstatus>0 ||csrdetailstatus>0 ){
                                            Alert.render("CSR saved successfully!","Alert",successiconUrl);
                                          $("#csrform")[0].reset();
                                        $('#supplylisttable').replaceWith($defaultTable.clone(true));
                                             //  printCSR();                                  
                                           }
                
             }
         });  
     
   
}

function viewCSR(){
     var dept =  $("#department option:selected").val();
     if(dept ===""||dept===null){
         Alert.render("Select department ","Alert",failiconUrl);
     }else{
      var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay =  document.getElementById("dialogoverlay");
        var dialogbox = document.getElementById("csrlistdiv");
        
        // style the dialog overlay window
        dialogoverlay.style.display = "block";
         dialogoverlay.style.height = winH+"px";
          dialogoverlay.style.width = winW+"px";
          //Style the dialog box;
          dialogbox.style.left = (winW/2) - (1230 * .5)+"px";
           dialogbox.style.top = "20px";
           dialogbox.style.display = "block";
           
           $(getcsrs);
       }
}

 function getcsrs(){
    $("#csrlisttable").DataTable().destroy();
    var dept =  $("#department option:selected").val();
    //console.log("selected dept "+dept);
    $.ajax({
        url:"supplyrequests/getcsrlist",
        type:"post",
        dataType:"json",
        data:{dept:dept},
        success:function(data){
              var i=1;
         $("#csrlisttable").DataTable({ 
             processing: true,
                dom:'Bfrtip',
                buttons:[
                         {
                            extend: 'excelHtml5',
                            title: 'CSR LIST'
                        },
                            {
                             extend: 'csvHtml5',
                            title: 'CSR LIST'
                            },
                            {
                             extend: 'copyHtml5',
                             title:  'CSR LIST'
                            },
                         {
                             extend: 'pdfHtml5',
                             title: 'CSR LIST'
                            }
                   
                 ],
             data: data,
              createdRow: function(row,data,index){
                    $(row).attr('class',"csrdatarow");
                    $(row).attr('id',index).find('td').eq(1).attr('class','csrclient');
                      $(row).attr('id',index).find('td').eq(2).attr('class','csrnum');
                    $(row).attr('id',index).find('td').eq(3).attr('class','csrdescrip');
                    $(row).attr('id',index).find('td').eq(4).attr('class','csrdate');
                     
                         $(row).attr('id',index).find('td').eq(5).attr('class','podate');
                          $(row).attr('id',index).find('td').eq(6).attr('class','ponum');
                            $(row).attr('id',index).find('td').eq(7).attr('class','csrvalue');
                              $(row).attr('id',index).find('td').eq(8).attr('class','soldby');
                                $(row).attr('id',index).find('td').eq(9).attr('class','invoiceno');
                                
                  },
             columns:[
                 {mRender:function(){
                         return i++;
                 }},
             {data:"clientname"},
              {data:"csrno"},
               {data:"description"},
                {mRender:function(data,type,row){
                         var csrdate = row.csrdate;
                         return moment(csrdate).format("ddd Do MMM,YYYY");
                 }},
                 {mRender:function(data,type,row){
                         var podate = row.podate;
                         return moment(podate).format("ddd Do MMM,YYYY");
                 }},
                  {data:"ponum"},
                   {mRender:function(data,type,row){
                           var csrvalue = parseFloat(row.csrvalue);
                           return row.currency+" "+numeral(csrvalue).format("0,0.0");
                   }},
                {data:"soldby"},
                 {data:"invoice_no"}
                 ],
             pageLength:10,
             bLengthChange:false,
             bAutoWidth:false,
             autowidth:false
        
         });   
        }
        
    });
}

$(document).ready(function(){
      $("#csrsearch").keyup(function(){
                 $("#csrlisttable").DataTable().search($(this).val()).draw();
                      }); 
});

//PRINT THE CSR

function printCSR(){
    var clientname = $("#clientname option:selected").text();
    var csrnum = $("#csrnumber").val().replace("/","-");

    $.ajax({
      type:"post",
      url:"printcsr",
      data:{"csrnum":csrnum},
      success:function(data){

      }
    });

   /*  var dept = $("#department option:selected").text();
    var doc = new jsPDF();
   doc.setFontType("bold");doc.setFontSize(25); doc.text(dept.toString().toUpperCase()+" DEPARTMENT",100,10,'center');
   doc.setFontType("bold");doc.setFontSize(20); doc.text("Customer Supply Request",100,18,'center');
   
doc.setFontSize(10);// var date = new Date();
doc.setFontType("normal");doc.text("Date: "+moment(moment().toDate()).format("ddd Do MMM,YYYY")+"",40,25,'right');
 doc.text("CSR No: "+csrnum+"",40,30,'right');

doc.setFontType("bold"); doc.setFontSize(12); doc.text("CUSTOMER NAME & ADDRESS",60,40,'center');
 doc.setFontType("normal"); doc.setFontSize(10);doc.text("Client: "+clientname+".",60,45,'right');
 doc.text("Address: P.O. Box xxxx",60,52,'right');
   doc.save(csrnum+" "+clientname+".pdf");
    doc.output('dataurlnewwindow');*/
}




$(document).ready(function(){
    $("#staffname").change(function(){
        var techid =$("#staffname option:selected").val();
        var techname = $("#staffname option:selected").text();
        var phone = $(this).find(':selected').data('phone');
    // alert("staff name: "+techname+" id: "+techid+" phone: "+phone);
        var rows = parseFloat($("#technicianstable tbody tr").length);
        var newrow ="<tr>\n\
<td><a class='deleterow' onclick='deleterow($(this))'><img src='http://"+domain+"/assets/images/icons/delete.png' width='20px' height='20px'></a></td>\n\
\n\<td>"+(rows+1)+"</td><td style='display:none;'>"+techid+"</td><td>"+techname+"</td><td style='display:none;'>"+phone+"</td></tr>";
        for(var i=0; i<=rows;i++){
            var tech = $("tr:nth-child("+i+") td:nth-child(2)").text();
            //console.log("tech listed"+tech);
            if(tech !==techid){
                $("#technicianstable tbody").append(newrow);
                break;
            }else{
                Alert.render("Technician already exists on list!","Alert",failiconURL);
                break;
            }
        }
        
    });
    
    
    $.ajax({
        url:"calls/gettechavailability",
        type:"post",
        dataType:"json",
        success:function(data){
            var i=1;
            $("techavailtable").DataTable({
                data:data,
                columns:[
                    {mRender:function(){
                            return i++;
                    }},
                {data:"staffname"},
                {data:"phone"},
                {data:"site"},
                {mRender:function(){
                        return "available";
                }}
                ]
            });
        }
    });
});

function deleterow(row){
 
   var rows = $("table#salestable >tbody >tr").length;
    var itemid = parseFloat(row.closest('tr').find('td.itemid').text());
    var itemdescrip = parseFloat(row.closest('tr').find('td.description').text());
    //Confirm.render("Delete "+itemdescrip+"?","itemdelete",itemid);
    var csrno = $("#csrnumber").val();
      var subtotal = parseFloat(row.closest('tr').find('td.itemsubtotal').text());
     //console.log("item total is "+subtotal);
    var grandtotal = parseFloat($("#totalsaletxt").val());
    grandtotal = grandtotal - subtotal;
    $("#totalsaletxt").val(grandtotal).text();
    
   // var dept = $("#")
    $.ajax({
        url:"supplyrequests/deleteitem",
        type:"post",
        dataType:"text",
        async:false,
        data:{itemid:itemid,grandtotal:grandtotal,csrno:csrno},
        success:function(status){
            if(status>0){
            row.closest('tr').remove();  
    for(var i=1;i<=rows;i++){
     $("tr:nth-child("+i+") td:nth-child(2)").html(i);
      } 
      Alert.render("Item deleted successfully!","Alert",successiconUrl);
      }else{
            row.closest('tr').remove();  // Alert.render("Item not deleted!","Alert",failiconUrl);
      }
        }
        
    });
  
   
       
}

function generateCallnum(){
      var date = new Date();
    var random = Math.floor(Math.random()*10000)+1;
    var year = date.getFullYear();
    var month = parseFloat(date.getMonth())+1;
    var callnumber = "CALL"+year+"/"+month+"-"+random;
    //console.log(" call number: "+callnumber);
    $("#callnum").val(callnumber);
      $("#callnum").css({
          "font-weight":"bold",
          "text-align":"center"
      });
}
$(document).ready(function(){
  
      $(generateCallnum);
       var date = new Date();
      var year = date.getFullYear();
      var currentyear = parseFloat(year);
      
                for(var i=currentyear;i>=1990;i--){
                   // //console.log("year: "+i);
                    var yearoption ="<option value="+i+">"+i+"</option>";
                     $("#csryear").append(yearoption);
                }
                
      $("#reference").change(function (){
           $("#refdescription").empty();
           var reference =  $("#reference option:selected").val();
           
           if(reference==="contract"){
               $("#yearlabel").css({"display":"none"});
                $("#csryear").css({"display":"none"});
                $(getReferences(""));
           }else{
               $("#yearlabel").css({"display":"block"});
                $("#csryear").css({"display":"block"});  
           }
      });
      
      $("#csryear").change(function(){
          var csryear = $("#csryear option:selected").val();
          $("#refdescription").empty();
          getReferences(csryear);
      });
      
      $("#refdescription").change(function(){
          var refnumber =   $("#refdescription option:selected").val();
          $("#refnumber").val(refnumber);
          
      });
});


function getReferences(csryear){
    var reference =  $("#reference option:selected").val();
    var client = $("#clientname option:selected").val();
    
    $.ajax({
               url:"calls/getreference",
               type:"post",
               dataType:"json",
               data:{client:client,reference:reference,csryear:csryear},
               success:function(data){
                     var options;
                   options ="<option value=''>Select Description</option>";
                   $("#refdescription").append(options);
                     $.each(data,function(index, value){
                         
                           if(reference==="contract"){
                                  options ="<option value="+value.contract_no+">"+value.cont_descrip+"</option>";
                           }else{
                                options ="<option value="+value.csrno+">"+value.description+"</option>";
                             } 
                               $("#refdescription").append(options);
                     });
                  }
           });
}
$(document).ready(function(){
    $("#newcallform").validate({
        rules:{
            callnum:{required:true},
            calldate:{required:true},
            clientname:{required:true},
            reference:{required:true},
            refdescription:{required:true},
            refnumber:{required:true},
            fault:{required:true},
            priority:{required:true},
             reportedby:{required:true, minlength:3},
            staffname:{required:true},
            location:{required:true},
            resoltimeline:{required:true}
        },
        messages:{
            callnum:{required:"Call number required"},
            calldate:{required:"Call date required"},
            clientname:{required:"Client name required"},
            reference:{required:"Reference required"},
            refdescription:{required:"Description required"},
            refnumber:{required:"Ref number required"},
            fault:{required:"Fault required"},
            priority:{required:"Priority required"},
            reportedby:{required:"Reported by required", minlength:"At least 3 characters long"},
            staffname:{required:"Assigned to is required"},
             location:{required:"Location is required"},
             resoltimeline:{required:"Timeline required"}
        },
        submitHandler:function(form,e){
            e.preventDefault();
            var clientname =  $("#clientname option:selected").text();
            var callnum =$("#callnum").val();
            $.ajax({
                url:"calls/checkcallnum",
                type:"post",
                dataType:"text",
                data:{callnum:callnum},
                success:function(state){
                 if(state>0){
                     var winH = window.innerHeight;
                 var postdialogoverlay = document.getElementById('postdialogoverlay');
                 postdialogoverlay.style.display = "block";
	         postdialogoverlay.style.height = winH+"px";
                     Alert.render("Call number "+callnum+" already exists!","Alert",failiconURL);
                 } else{
                     Confirm.render("Open new call for "+clientname+"?","newcall");
                 }  
                }
            });
            
        }
    });
});

$(document).ready(function(){
   $("#clientnotification_YES").change(function(){
      // alert("change detected");
      if( $("#techavailability").css('display')==='none'){
          $("#techavailability").css({"display":"block"});
           $("#opencallbtn").css({"margin-top":"80px"});
      }else{
           $("#techavailability").css({"display":"none"});
            $("#opencallbtn").css({"margin-top":"5px"});
      }
    });
});


//OPEN NEW CALL 
function openCall(){
      var clientnotify="NO";
   
      $("input[name='clientnotification']:checked").each(function(){
          clientnotify = this.value;
      });
      if(clientnotify===null){
          clientnotify="NO";
      }
      var callnum =$("#callnum").val();
      var calldate = moment($("#calldate").val()).format("YYYY-MM-DD");
      var client=  $("#clientname option:selected").val();
      var clientname=  $("#clientname option:selected").text();
      var contractnum =$("#refnumber").val();
      var fault = $("#fault").val();
      var reportedby =$("#reportedby").val();
      var priority = $("#priority option:selected").val();
      var timeline = $("#resoltimeline option:selected").val();
        var days = $("#resoltimeline option:selected").text();
      var location = $("#location").val();
      var technicians = [];
      var message = $("#message").val();
      
      if(typeof message==='undefined' || message===''){
          message="None";
      }
      var rows = $("#technicianstable tbody tr").length;
      var techname;
      for(var i=1;i<=rows;i++){
          var techid = $("#technicianstable tr:nth-child("+i+") td:nth-child(3)").text();
           techname  = $("#technicianstable tr:nth-child("+i+") td:nth-child(4)").text();
           var phone  = $("#technicianstable tr:nth-child("+i+") td:nth-child(5)").text();
          var technician ={"techid":techid,"techname":techname,"phone":phone};
          technicians.push(technician);
      }
    
     // //console.log("notification state: "+clientnotify);
      var callinfo =[{"callnum":callnum,"calldate":calldate,"client":client,"contractnum":contractnum,"fault":fault,"reportedby":reportedby,
          "priority":priority,"timeline":timeline,"location":location,"clientname":clientname,"days":days,"clientnotify":clientnotify,"message":message}];
  
      var techdata = JSON.stringify(technicians);
      var calldata = JSON.stringify(callinfo);
      //console.log(calldata);
      $.ajax({
          url:"calls/createcall",
          type:"post",
          async:false,
          dataType:"text",
          cache:false,
          data:{calldata:calldata,techdata:techdata},
          success:function(status){
              //console.log(status);
          if(status>0){
 
                 $(populatecalls);
                 $(generateCallnum);
 
                  document.getElementById("newcallform").reset();
                 $("#technicianstable tbody").empty();
                  Alert.render("Call opened successfully","Alert",successiconUrl);
             } else{
                  Alert.render("Call was not opened!","Alert",failiconURL); 
                } 
          },error:function(){
               Alert.render("Call was not opened!","Alert",failiconURL);   
          }
      });
}


//$(document).ready(function(){
function populatecalls(){
 $("#callstable tbody tr").remove();   
$("#callstable").DataTable().destroy(); 
$.ajax({
        url:"calls/getcalls",
        type:"post",
        async:false,
        cache:false,
        dataType:"json",
        success:function(data){
            var i=1;
      $("#callstable").DataTable({
              data:data,
              createdRow: function(row,data,index){
                    $(row).attr('id',index).find('td').eq(5).attr('class','td-callno');
                    $(row).attr('id',index).find('td').eq(4).attr('class','td-calldate');
                       $(row).attr('id',index).find('td').eq(3).attr('class','td-techname');
                         $(row).attr('id',index).find('td').eq(6).attr('class','td-activity');
                          $(row).attr('id',index).find('td').eq(7).attr('class','td-client');
                            $(row).attr('id',index).find('td').eq(8).attr('class','td-location');
                              $(row).attr('id',index).find('td').eq(12).attr('class','td-reportedby');
                                $(row).attr('id',index).find('td').eq(9).attr('class','td-priority');
                                  $(row).attr('id',index).find('td').eq(11).attr('class','td-status');
                  },
              columns:[
                  {mRender:function(){
              var update = "<a class='updatecall' onclick='updatecall($(this))'><img src='http://"+domain+"/assets/images/icons/update.png' width='20px' height='20px'></a>";    
                  return update;
                      }},
                  {mRender:function(){
                   var update = "<a class='deleterow' onclick='deletecall($(this))'><img src='http://"+domain+"/assets/images/icons/delete.png' width='20px' height='20px'></a>";    
                  return update;       
                  }},
                  {mRender:function(){return i++;}},
                  {data:"staffname"},
                  {mRender:function(data,type,row){
                   return  moment(row.call_date).format("ddd Do MMM,YYYY");     
                  }},
              {data:"call_no"},
             {data:"to_do"},
              {data:"clientname"},
              {data:"location"},
              {data:"priority"},

              {mRender:function(data,type,row){
                  var days = parseFloat(row.resol_timeline_days);
                  var timeline="";
                  if(days===1){
                      timeline = 1+" Day";
                  }else  if(days>1 && days<4){
                     timeline = days+" Days"; 
                  }else{
                         timeline = days+" Days or more";   
                  }
                  return timeline;
              }},
              {mRender:function(data,type,row){
                      var status = row.status;
                      if(status !=="CLOSED"){
                      var callstate = "<a class='notclosed'>"+status+"</a>";      
                      }else{
                           var callstate = "<a class='closed'>"+status+"</a>";   
                      }
                      return callstate;
              }},
              {data:"reportedby"}
              ],
               pageLength:15,
             bLengthChange:false,
             bAutoWidth:false,
             autowidth:false
          });  
        }
    });
}

//});

$(document).ready(function(){
     $("#callsearch").keyup(function(){
                 $("#callstable").DataTable().search($(this).val()).draw();
      });  

});

function deletecall(row){
  var client = row.closest('tr').find('td.td-client').text();
   var callno = row.closest('tr').find('td.td-callno').text();
  var usertype = function(){
      var temp;
      $.ajax({
          url:"home/checkusertype",
          type:"post",
          async:false,
          dataType:"text",
          success:function(usertype){
              temp = usertype;
          }
      });
      return temp;
  }();
  
  if(usertype ==="Administrator"){
     Confirm.render("Delete call no. "+callno+" for "+client+"? ","deletecall",callno);  
  }else{
      Alert.render("You are not authorised!","Access Denied",failiconUrl);
  }
      
}

function calldeletion(callno){
   
  $.ajax({
        url:"calls/deletecall",
        type:"post",
        dataType:"text",
       // async:false,
        data:{"callno":callno},
        success:function(status){
            //console.log(status);
            if(status>0){
                  //$('#callstable').replaceWith($callsTable.clone(true));
             /*var tableRow = $("td").filter(function() {
                     return $(this).text() ===callno;
                }).closest("tr");*/
                
                //$("table#callstable tr:eq("+tableRow+")").remove();
               populatecalls();
                Alert.render("Call deleted successfully!","Alert",successiconUrl);
          
            }else{
                 Alert.render("Call not deleted. Try again!","Alert",failiconURL); 
            }
        }
    });
}

function updatecall(row){
    $("#callserviceform")[0].reset();
       var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay =  document.getElementById("dialogoverlay");
        var dialogbox = document.getElementById("serviceentrydiv");
        
        // style the dialog overlay window
        dialogoverlay.style.display = "block";
         dialogoverlay.style.height = winH+"px";
          dialogoverlay.style.width = winW+"px";
          //Style the dialog box;
          dialogbox.style.left = (winW/2) - (1215 * .5)+"px";
           dialogbox.style.top = "20px";
           dialogbox.style.display = "block";
           
        var callnum = row.closest('tr').find('td.td-callno').text(); //console.log("call num is "+callnum);
        var calldate = row.closest('tr').find('td.td-calldate').text();
        var client = row.closest('tr').find('td.td-client').text();
        var site = row.closest('tr').find('td.td-location').text();
        var fault = row.closest('tr').find('td.td-activity').text();
        var reportedby = row.closest('tr').find('td.td-reportedby').text();
        var status = row.closest('tr').find('td.td-status').text();
        var timesattended = function(){
            var temp;
            $.ajax({
                url:"calls/countservice",
                type:"post",
                async:false,
                dataType:"json",
                data:{callnum:callnum},
                success:function(count){
                   temp = count[0].timesattended;   
                   //console.log("times attended "+temp);
                }
            });
            return temp;
        }();
        
        //  //console.log("times attended2 "+timesattended);
         $("#callsassignedtablebody").empty();
        $.ajax({
            url:"calls/getcalltechs",
            type:"post",
            dataType:"json",
            async:false,
            data:{callnum:callnum},
            success:function(data){
                var i=1;
                $.each(data,function(index,value){
                    var tr="<tr><td>"+i+"</td><td>"+value.staffname+"</td></tr>";
                    $("#callsassignedtablebody").append(tr);
                });
            }
        });
        
        $("#servicecallnum").val(callnum); $("#servicecalldate").val(calldate);$("#servicecall_client").val(client);
        $("#servicecallsite").val(site);$("#servicecallfault").val(fault);$("#servicecallreportedby").val(reportedby);
        $("#servicecallstatus").val(status);$("#callattended").val(timesattended+" times");
     if(timesattended>0){
        $.ajax({
            url:"calls/getservicedetails",
            type:"post",
            dataType:"json",
            async:false,
            data:{callnum:callnum},
            success:function(data){
              $.each(data,function(index,value){
                 $("#jobcardserial").val(value.service_no);
                    $("#equipmodel").val(value.equip_model);
                      $("#equipdescription").val(value.equip_descrip);
                        $("#equipserial").val(value.serial);
                          $("#actiontaken").val(value.action);
                          $("#equiplocation").val(value.location);

              });
            }
        });
     }
}


function closeServiceentry(){
     var dialogoverlay =  document.getElementById("dialogoverlay");
      dialogoverlay.style.display = "none";
        var dialogbox = document.getElementById("serviceentrydiv");
        dialogbox.style.display = "none";
}


$(document).ready(function(){
  $("#callserviceform").validate({
    rules:{
        jobcardserial:{required:true,minlength:3},
        callfrom:{required:true},
        equipmodel:{required:true,minlength:3},
        equipdescription:{required:true,minlength:3},
        servicetown:{required:true},
        servicedate:{required:true},
        callto:{required:true},
        equipserial:{required:true,minlength:3},
        equiplocation:{required:true,minlength:3},
       // attachment:{},
        actiontaken:{required:true,minlength:10},
        /*findings:{},
        recommendation:{},*/
        service_callstatus:{required:true}
    },
    messages:{
         jobcardserial:{required:"Job card serial required" ,minlength:"At least 3 characters long"},
        callfrom:{required:"Start time required"},
        equipmodel:{required:"Equipment model required",minlength:"At least 3 characters long"},
        equipdescription:{required:"Equipment description required",minlength:" At least 3 characters long"},
        servicetown:{required:"Service town required" },
        servicedate:{required:"Service date required"},
        callto:{required:"End time required"},
        equipserial:{required:"Serial number required",minlength:"At least 3 characters long"},
        equiplocation:{required:"Service location required",minlength:" At least 3 characters long"},
       // attachment:{},
        actiontaken:{required:"Action taken required",minlength:"At least 20 characters"},
        /*findings:{},
        recommendation:{},*/
        service_callstatus:{required:"Call status required"}
    },
    submitHandler:function(form,e){
        e.preventDefault();
        var callnum = $("#servicecallnum").val();
        //alert(" save initiated");
        // Confirm.render("Delete service call for "+client+"? ","deletecall",callno);
        Confirm.render("Save service details for Call No. "+callnum+" ?","serviceentry","none");
    }
  });
});


function serviceEntry(){
    var callnum = $("#servicecallnum").val();
    var jobcardserial = $("#jobcardserial").val();
    var servicedate = $("#servicedate").val();
    var starttime =  $("#callfrom").val();
    var endtime =  $("#callto").val();
    var equipmodel =  $("#equipmodel").val();
    var equipserial =  $("#equipserial").val();
    var description =  $("#equipdescription").val();
    var location =  $("#equiplocation").val();
    var town =  $("#servicetown option:selected").val();
    var actiontaken = $("#actiontaken").val();
    var findings = $("#findings").val();
    var recommendations = $("#recommendation").val();
    var servicestatus = $("#service_callstatus option:selected").val();
    
     if(findings===null){findings==="NA";}
    if(recommendations===null){recommendations==="NA";}
  
   
   var dbcallstatus = $("#servicecallstatus").val();
   if(dbcallstatus==="CLOSED"){
       Alert.render("This call is closed. Change status to update!","Alert",failiconURL);
   }else{
      var dbservicenostatus = function(){
       var temp;
       $.ajax({
            url:"calls/checkserviceno",
            type:"post",
            dataType:"text",
            async:false,
            data:{jobcardserial:jobcardserial},
            success:function(status){
                temp = status;
            }
             });
       return temp; }(); 
   if(dbservicenostatus >0){
      Alert.render("Job card serial number must be unique!","Alert",failiconURL);
   }
   else{
     var servicedetials = [{"CALL_NO":callnum,"SERVICE_NO":jobcardserial,"SERVICE_DATE":moment(servicedate).format('YYYY-MM-DD'),"FROM2":starttime,"TO2":endtime,
         "EQUIP_MODEL":equipmodel,"SERIAL":equipserial,"EQUIP_DESCRIP":description,"LOCATION":location,"TOWN":town, "ACTION":actiontaken,
      "STATUS":servicestatus}];

  var findingsdetails=[{"SERVICE_NO":jobcardserial,"findings":findings}];
  var recommendationdetails = [{"SERVICE_NO":jobcardserial,"recommendations":recommendations}];
  
   var servicedata = JSON.stringify(servicedetials);
   var findingsdata = JSON.stringify(findingsdetails);
   var recommendationdata =  JSON.stringify(recommendationdetails);
       $.ajax({
           url:"calls/serviceentry",
           type:"post",
           dataType:"text",
           data:{servicedata:servicedata,findingsdata:findingsdata,recommendationdata:recommendationdata},
           success:function(status){
               //console.log(status);
               if(status>0){
                   Alert.render("Service details saved successfully!","Alert",successiconUrl); 
                   $("#callserviceform")[0].reset();
                     document.getElementById('serviceentrydiv').style.display = "none";
               }else{
                    Alert.render("An error occured!","Alert",failiconURL); 
               }
           }
       });
   }
   }
   
}

