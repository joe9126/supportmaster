<?php include 'navbar.php';?>

<div class="main_container">
    <div class="tabcontroller">
         <button class="tabhead active" onclick="openTab(event,'supplyrequests')"> Supply Requests</button>
        <button class="tabhead" onclick="openTab(event,'sla')">Service Level Agreements</button>
        <button class="tabhead" onclick="openTab(event,'billingreq')">Billing Requests</button>
    </div>
    
    <div class="tabcontainer" id="supplyrequests">
        <div id="deptselector" style="width: auto; clear: both;">
            <select id="department" name="department" >
             <option value="">Select Department</option>
              <option value="Technical Service">Technical Service</option>
             <option value="Sales">Sales</option>
        </select> 
            <label id="deptnamespan" >NO DEPT. SELECTED</label>
        </div>
        
      <div class="deptcontainer" id="salesdept" style="display: block;">
        <form id="csrform" method="post" action="">   
            <div id="clientdetails">
                 <label>CSR No</label>
                 <input type="text" placeholder="CSR Number" id="csrnumber" name="csrnumber"/>
                 
                 <label>Client Name </label>
                <select id="clientname" name="clientname">
                    <option value="">Select Client</option>
                </select>
                          
                        
                 <label>Description</label>
                 <input type="text" placeholder="Description" id="description" name="description"/>
                
               <label>CSR Date</label>
               <input type="text" placeholder="CSR Date" id="csrdate" name="csrdate" class="datepicker"/> 
               <input type="button" id="printcsrBtn" value="Print" onclick="printCSR()"/>
            </div>  
            
            <div id="csrcenterdiv">
                <label>PO Number</label>
               <input type="text" placeholder="PO Number" id="ponumber" name="ponumber" />
                
               <label>PO Date</label>
               <input type="text" placeholder="PO Date" id="podate" name="podate" class="datepicker"/>
               
               <label>Currency</label>
                <select id="currency" name="currency">
                    <option value="">Select Currency</option>
                     <option value="KES">KES</option>
                      <option value="USD">USD</option>
                       <option value="EURO">EURO</option>
                </select>
                <label>Sales Person </label>
                <select id="staffname" name="staffname">
                    <option value="">Select Sales Person</option>
                </select>
                
               
            </div>
            
            <div id="csrrightdiv">
                 <label>Dept Approval </label>
                <select id="deptmanager" name="deptmanager">
                    <option value="">Select Dept Manager</option>
                </select>
                
                 <label>Fin. Approval </label>
                <select id="finmanager" name="finmanager">
                    <option value="">Select Finance Approval</option>
                </select>
                 
                 <label>Dir. Approval </label>
                <select id="dirmanager" name="dirmanager">
                    <option value="">Select Dept Approval</option>
                </select>
                <label >CSR Total</label>
                <input type="text" value="0.00" id="csrtotal" name="csrtotal" readonly="true" style="width: 195px;"/>
                               
                <input type="submit" value="Save" id="savebtn"/>
                <input type="button" value="Delete" id="updatebtn" onclick="deleteCsr()"/>
                 <input type="button" value="View List" id="viewcsrlistbtn" onclick="viewCSR()"/>
            </div>
        </form>   
            <div id="csritemsdiv">
                <fieldset id="purchaselistfset">
                    <legend>Supply Items</legend>
                    <div id="tablediv">
                        <table id="supplylisttable">
                            <thead>
                                <tr>
                                 <th col width="8">
                                     <a class='deleterow' onclick='addrow($(this))'><img src='http://support.symphonykenya.com/assets/images/icons/addicon.png' width='20px' height='20px'></a>   
                                 </th>
                                 <th>No</th>
                                 <th>Item ID</th> 
                                 <th>Part No</th> 
                                 <th>Description</th>
                                 <th>Qty</th>
                                 <th>Unit B.P</th> 
                                 <th>Markup %</th> 
                                 <th>Unit S.P</th>  
                                 <th>VAT %</th>
                                 <th>Total</th>
                                </tr>
                            </thead>
                            <tbody id="csrtablebody">
                                <tr>
                                     <td><a class='deleterow' onclick='deleterow($(this))'><img src='http://support.symphonykenya.com/assets/images/icons/delete.png' width='20px' height='20px'></a></td>
                                    <td class="no">1</td>
                                    <td class="itemid"contenteditable="true"></td>
                                    <td class="partno" contenteditable="true"></td>
                                    <td class="descr" contenteditable="true"></td>
                                     <td class="qty" contenteditable="true"></td>
                                    <td class="unitBP" contenteditable="true"></td>
                                    <td class="margin" contenteditable="true">0.00</td> 
                                    <td class="unitSPcell"  contenteditable="false">0.00</td>
                                    <td class="vat" contenteditable="true">16.00</td>
                                    <td class="itemtotal" contenteditable="false">0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                    
            </div>
        </div>
     
        
       
    </div>
    
    <div class="tabcontainer" id="sla">
          <p>SLA's</p>
    </div>
    
    <div class="tabcontainer" id="billingreq">
          <p>billing requests</p>
    </div>
    
    
</div>
    
<div id="dialogoverlay"></div>
<div id="postdialogoverlay"></div>

<div id="alertdialogbox">
  <div>
    <div id="alertdialogboxhead"></div>
    <div id="alertdialogboxbody"></div>
    <div id="alertdialogboxfoot"></div>
  </div>
</div>

<div id="dialogbox">
  <div>
    <div id="dialogboxhead"></div>
    <div id="dialogboxbody"></div>
    <div id="dialogboxfoot"></div>
  </div>
</div>
  

<div id="csrlistdiv">
   
    <fieldset id="csrlistholderdiv">
         <legend>Supply Requests</legend>
     <div id="csrupperdiv">
          <label id="deptnamespan1" name="deptnamespan1" >NO DEPT. SELECTED</label>
          <input type="text" class="searchtext" id="csrsearch" name="csrsearch" placeholder="Search..."/>
     </div>
     <div id="csrlowerdiv">
         <table id="csrlisttable">
             <thead>
                 <tr>
                     <th>No</th>
                     <th class="csrclient">Client</th>
                     <th>CSR No</th>
                     <th class="csrdescrip">Description</th>
                     <th>CSR Date</th>
                      <th>PO Date</th>
                     <th>PO No</th>
                     <th>Value VAT Incl.</th>
                     <th>Sales Person</th>
                     <th>Invoice No.</th>                     
                 </tr>
             </thead>
             <tbody>   </tbody>
         </table>
         <input type="button" value="Close" id="closelistbtn"/>
     </div> 
    </fieldset>
</div> 
<div class="modal" id="loader"></div>
   
