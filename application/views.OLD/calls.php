<?php include 'navbar.php'?> 
<div class="main_container">
     <div class="tabcontroller">
         <button class="tabhead active" onclick="openTab(event,'newcall')">New Service Call</button>
        <button class="tabhead" onclick="openTab(event,'managecalls')">Manage Calls</button>
        <button class="tabhead" onclick="openTab(event,'claims')">Mileage Claims</button>
    </div>
    <div class="tabcontainer" id="newcall">
        <form id="newcallform" name="newcallform" action="" method="post">
            
        <fieldset id="callsfieldset">
            <legend>Call Details</legend>
            
            <label>Call Number</label>
            <input type="text" id="callnum" name="callnum" readonly="true" placeholder="Call Number" class="readonly"/>
            
             <label>Call Date</label>
             <input type="text" id="calldate" name="calldate" class="datepicker" placeholder="Call Date"/>
             
              <label>Client</label>
              <select id="clientname" name="clientname" id="clientname">
                    <option value="">Select Client</option>
                </select>
              
              <label>Reference</label>
              <select id="reference" name="reference" id="reference">
                  <option value="">Select Reference</option>
                   <option value="contract">Contract</option>
                    <option value="csr">CSR</option>
              </select>
              
              <label id="yearlabel" style="display: none">Select Year</label>
              <select id="csryear" style="display: none;">
                  <option value="">Select Year</option>
              </select>
              
               <label>Description</label>
               <select id="refdescription" name="refdescription" id="refdescription">
                  <option value="">Select Description</option>
              </select>
               
              <label>REF Number</label>
              <input type="text" id="refnumber" name="refnumber" placeholder="REF Number" readonly="true" class="readonly"/>
               
               
        </fieldset>
        
        <fieldset id="jobdetails">
            <legend>Work Details</legend>
            
            <label>Fault</label>
            <textarea type="text" rows="5" cols="25" id="fault" name="fault" placeholder="Fault Reported ..."  ></textarea>
            <label>Location</label>
            <input type="text" id="location" name="location" placeholder="Location"/>
            
            <label>Reported By</label>
            <input type="text" id="reportedby" name="reportedby" placeholder="Reported By"/>
            
            <label>Priority</label>
             <select id="priority" name="priority">
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
              </select>
            
            <label>Timeline</label>
             <select id="resoltimeline" name="resoltimeline" >
                 <option value="">Select Timeline</option>
                 <option value="1">One Day</option>
                  <option value="2">Two Days</option>
                   <option value="3">Three Days</option>
                   <option value="4">Longer</option>
              </select>
             
        </fieldset>
        <fieldset id="callnotification">
            <legend>Notification & Save</legend>
            <label>Assigned To</label>
             <select id="staffname" name="staffname" >
                 <option value="">Select Technician</option>
             </select>
             <div id="techtablediv">
                     <table id="technicianstable" name="technicianstable">
                         <thead>
                           <tr>
                               <th></th><th>No</th><th style="display: none">ID</th><th>Technician</th><th style="display: none;">Phone</th>
                            </tr>
                        </thead>
                        <tbody id="techtablebody"></tbody>
                 </table>
             </div>
            
             
            <label id="notelable">Notify Client</label>
            <label class="checkbox">
                <input type="checkbox" id="clientnotification_YES" name="clientnotification" value="YES" />Yes<br>
                          
            </label>
            
            
            
        </fieldset>
      
        <fieldset id="techavailability">
            <legend>Optional Message to Client</legend>
              
              <textarea id="message" rows="5" cols="90" name="message" placeholder="Custom message to client..."></textarea>
        </fieldset>
            <fieldset id="submitfieldset">
                              <input type="submit" id="opencallbtn" value="Open Call"/>

            </fieldset>
       </form>
    </div>
    
    
    <div class="tabcontainer" id="managecalls"><!-- MANAGE CALLS TAB -->
        <div id="callslistdiv">
            <div id="upperdiv">
                 <input type="text" class="searchtext" id="callsearch" name="callsearch" placeholder="Search..."/>
            </div>
            <div id="lowerdiv">
                <fieldset>
                    <legend>Calls List</legend>
                     <table id="callstable" name="callstable">
                         <thead>
                             <tr>
                                 <th></th><th></th><th>No</th><th>Technician</th><th style="width:120px;">Call Date</th><th>Call No</th><th>Activity</th><th>Client</th><th>Location</th>
                                 <th>Priority</th><th>Timeline</th><th>Status</th><th>Reported By</th>
                            </tr>
                        </thead>
                      <tbody></tbody>
                      <tfoot></tfoot>
            </table>
                </fieldset>
            </div>
        </div>
    </div>
    
    <!-- MILEAGE CLAIMS DIV-->
    <div class="tabcontainer" id="claims">
        <div id="createclaim">
            <form id="claimform" action="" method="post">
            <fieldset id="claimleftdiv">
                <legend>Service Details</legend>
                <label>Call No</label><input type="text" id="claimcallno" name="claimcallno" placeholder="Call number"/>
                <label>Service No</label><input type="text" id="claimserviceno" name="claimserviceno" placeholder="Job Card number"/>
                  <label>Service Date</label><input type="text" id="claimservicedate" name="claimservicedate" class="readonly" readonly="true"/>
                <label>Client</label><input type="text" id="claimclient" name="claimclient" class="readonly" readonly="true"/>
                 <label>Location</label><input type="text" id="claimlocation" name="claimlocation" class="readonly" readonly="true"/>
                
            </fieldset>
            <fieldset id="claimscenterdiv">
                <legend>Transport & Meals Claims </legend>
                <label >Transport</label>
                <select id="claimtransporttype" name="claimtransporttype">
                    <option value="">Select Transport</option>
                     <option value="Company provided">Company provided</option>
                     <option value="Public">Public</option>
                     <option value="Private">Private</option>
                </select>
                <label id="kmlabel">KM Travelled</label><input type="text" id="claimkmtravelled" name="claimkmtravelled" value="0.00"/>
                <label id="farelabel">PSV Fare</label><input type="text" id="claimfare" name="claimfare" value="0.00"/>
                <label id="compfarelabel">Trans. Claim</label><input type="text" id="claimcompany" name="claimcompany" value="0.00" class="readonly" readonly="true"/>
                <label id="lunchlabel">Lunch</label><input type="text" id="claimlunch" name="claimlunch" value="0.00"/>
                    <label id="dinnerlabel">Dinner</label><input type="text" id="claimdinner" name="claimdinner" value="0.00"/>
            </fieldset>
            
            <fieldset id="claimrightdiv">
                <legend>Expense Claim</legend>
                   
                    <label id="accomlabel">Accomodation</label><input type="text" id="claimaccomodation" name="claimaccomodation" value="0.00"/>
                    <label id="pettylabel">Petties</label><input type="text" id="claimpetties" name="claimpetties" value="0.00"/>
                    <label id="laundrylabel">Laundry</label><input type="text" id="claimlaundry" name="claimlaundry" value="0.00"/>
                     <label id="otherlabel">Others</label><input type="text" id="claimothers" name="claimothers" value="0.00"/>
                     
                      <input type="submit" id="createclaimbtn" value="Create Claim"/>
            </fieldset>
        </form>   
        </div>
        
        <div id="servicelistdiv">
            <fieldset id="servicelistfieldset">
                <legend>Service List</legend>
                <input type="text" placeholder="Search..." id="searchservice" name="searchservice"/>
                <table id="servicelisttable" name="servicelisttable">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Call Number</th>
                            <th>Service No</th>
                            <th>Service Date</th>
                            <th>Client</th>
                            <th>Location</th>
                            <th>Claim Status</th>
                            <th>Technician</th>
                        </tr>
                    </thead>
                    <tbody> </tbody>
                    <tfoot></tfoot>
                </table>
            </fieldset>
        </div>
    </div>
</div>


<div id="serviceentrydiv"><!-- SERVICE ENTRY DIV-->
    <fieldset id="serviceentryfieldset">
        <legend>Service Entry</legend>
        <fieldset id="callsdetails">
            <legend>Call Details</legend>
             <label>Call Number</label>
             <input type="text" id="servicecallnum" class="readonly" readonly="true"/>
             <label>Call Date</label>
             <input type="text" id="servicecalldate" class="readonly" readonly="true"/>
             <label>Client</label>
             <input type="text" id="servicecall_client" class="readonly" readonly="true"/>
             <label>Site</label>
             <input type="text" id="servicecallsite" class="readonly" readonly="true"/>
             <label>Fault</label>
             <input type="text" id="servicecallfault" class="readonly" readonly="true"/>
             <label>Reported By</label>
             <input type="text" id="servicecallreportedby" class="readonly" readonly="true"/>
             <label>Assigned To</label>
             <table id="callassignedtotable">
                 <thead>
                     <tr><th>No</th><th>Technician</th></tr>
                 </thead>
                 <tbody id="callsassignedtablebody"></tbody>
             </table>
              
             <label>Attended </label>
             <input type="text" id="callattended" class="readonly" readonly="true"/>
             <label>Status</label>
             <input type="text" id="servicecallstatus" class="readonly" readonly="true"/>
             <input type="button" value="Exit" id="serviceexitBtn" onclick="closeServiceentry()"/>
        </fieldset>
        
        <fieldset id="servicedetails">
            <legend>Service Details</legend>
            <form id="callserviceform" name="callserviceform" action="" method="post"> 
            <div id="service_leftdiv">
                <label>Job Card No</label>
                <input type="text" id="jobcardserial" name="jobcardserial" placeholder="Job Card Number"/>
                <label>Start Time</label>
                <input type="text" id="callfrom" name="callfrom" placeholder="Start Time" class="timepicker"/>
                 <label>Equip Model</label>
                <input type="text" id="equipmodel" name="equipmodel" placeholder="Equipment Model" />
                
                 <label>Description</label>
                <input type="text" id="equipdescription" name="equipdescription" placeholder="E.g 20 kVA UPS" />
                
                 <label>Town</label>
                 <select id="servicetown" name="servicetown">
                     <option value="">Select Town</option>
                     <option value="NAIROBI">NAIROBI</option>
                     <option value="MOMBASA">MOMBASA</option>
                     <option value="KISUMU">KISUMU</option>
                     <option value="NAKURU">NAKURU</option>
                     <option value="Others">Others</option>
                 </select>
            </div>
            
            <div id="service_rightdiv">
                <label>Start Date</label>
                <input type="text" id="servicedate" name="servicedate" placeholder="Service Start Date" class="datepicker"/>
                
                <label>End Time</label>
                <input type="text" id="callto" name="callto" placeholder="End Time" class="timepicker"/>
                <label>Serial No</label>
                <input type="text" id="equipserial" name="equipserial" placeholder="Equipment Serial Number" />
                
                <label>Location</label>
                <input type="text" id="equiplocation" name="equiplocation" placeholder="Site Location" />
                <label>Attachment</label>
                <input type="file" id="attachment" name="attachment" accept="application/pdf" />
            </div>
            <div id="actiontakendiv">
                <label>Action Taken</label>
                <textarea type="text" cols="65" rows="5" id="actiontaken" name="actiontaken" placeholder="Action taken at site..."></textarea>
            </div>
            <div id="findingsdiv">
                <label>Findings</label>
                <textarea type="text" cols="65" rows="3" id="findings" name="findings" placeholder="Issues noted at site..."></textarea>
            </div>
            <div id="recommendationsdiv">
                <label>Recommendations</label>
                <textarea type="text" cols="65" rows="3" id="recommendation" name="recommendation" placeholder="Recommendations and conclusion..."></textarea>
            </div>
            
            <div id="callstatusdiv">
                <label>Call Status</label>
                <select id="service_callstatus" name="service_callstatus">
                     <option value="">Select Status</option>
                       <option value="CLOSED">Closed</option>
                         <option value="TO CONTINUE">To Continue</option>
                           <option value="AWAITING PARTS">Awaiting Parts</option>
                           <option value="NO ACCESS">No Access Granted</option>
                           <option value="NO WORK">No Work Done</option>
                 </select>
                
                <input type="submit" id="servicesubmitBtn" name="servicesubmitBtn" value="Save"/>
            </div>
        </form>    
        </fieldset>
    </fieldset>
   
</div>



<div id="postdialogoverlay"></div>
<div id="dialogoverlay"></div>


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
<div class="modal" id="loader"></div>