<?php include 'navbar.php';?> 

<div class="main_container">
    <fieldset id="newclients">
        <legend>New Client</legend>
        <form id="clientform" action="" method="post">
            <fieldset id="clientleftdiv">
             <legend>Client Info</legend>
            <label>Client ID</label><input type="text" placeholder="Client number" id="clientid" name="clientid" class="readonly" readonly="true"/>
            <label>Client Name</label><input type="text" placeholder="Client Name" id="clientname" name="clientname"/>
            <label>Address</label><input type="text" placeholder="Address" id="clientaddress" name="clientaddress"/>
              <label>City</label><input type="text" placeholder="City" id="clientcity" name="clientcity"/>
               <label>Phone</label><input type="text" placeholder="020 XXXX XXX" id="phone" name="phone"/>
        </fieldset>
            
            <fieldset id="clientcenterdiv">
                <legend>Contact Info</legend>
            <label>Contact</label><input type="text" placeholder="John Doe" id="clientcontact" name="clientcontact" class="" />
            <label>Primary Email</label><input type="text" placeholder="johndoe@example.com" id="primaryemail" name="primaryemail"/>
            <label>Extra Email</label><input type="text" placeholder="janedoe@example.com" id="extraemail1" name="extraemail1"/>
              <label>Extra Email 2</label><input type="text" placeholder="janedoe@example.com" id="extraemail2" name="extraemail2"/>
               <label>Extra Email 3</label><input type="text" placeholder="janedoe@example.com" id="extraemail3" name="extraemail3"/>
        </fieldset>
            <fieldset id="clientrightdiv">
                 <legend>Status & Save</legend>
                 <label>Status</label>
                 <select id="clientstatus" name="clientstatus">
                     <option value="">Select Status</option>
                       <option value="Active">Active</option>
                         <option value="Inactive">Inactive</option>
                 </select>
                 <input type="submit" value="Save" id="clientsaveBtn"/>
                
                 <span id="viewclientspan">View Clients</span><input type="checkbox" id="showclientscheck"/>
            </fieldset>
                
        </form>
    </fieldset>
    
    <fieldset id="clientslist">
        <legend>Clients </legend>
        <input type="text" placeholder="Search..." id="searchclient" name="searchclient"/>
        <table id="clientslisttable">
            <thead>
                <tr>
                    <th></th>
                    <th>No</th>
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Telephone</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
        </table>
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


 

