 <?php include 'header.php';?>
<!-- Load an icon library to show a hamburger menu (bars) on small screens -->
<div class="topnav" id="myTopnav">
  <a href="javascript:void(0);" class="active menuitem">Home</a>  
  <a href="javascript:void(0);" class="menuitem" id="calls" style="display: none;">Calls</a>
  <a href="javascript:void(0);" class="menuitem" id="clients" style="display: none;">Clients</a>
  <a href="javascript:void(0);" class="menuitem" id="contracts" style="display: none;">Contracts</a>
  <a href="javascript:void(0);" class="menuitem" id="gatepass" style="display: none;">Gate Pass</a>
  <a href="javascript:void(0);" class="menuitem" id="parts" style="display: none;">Parts</a>
  <a class='menuitem' id='settings' style="display: none;">Settings</a>
  <a class="menuitem" id="login"><?php echo $this->session->userdata('staffname')." | ";?>
     <img class="logoutpng" src="<?php echo base_url();?>assets/images/icons/logout2.png"> 
  </a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <div class="fa fa-bars">test</div>
  </a>
</div> 