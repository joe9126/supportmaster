<?php include 'header.php';?>

<div id="logindiv">
    <div id="usericondiv"></div>
    <div id="logininputsdiv">
        <form id="loginform" name="loginform" action="" method="post">
            <input type="text" placeholder="Email" id="username" name="username"/><br>
            <input type="password" placeholder="Password" id="password" name="password"/><br>
         <input type="submit" value="Login" id="loginbtn"/>
        </form>
        <!-- <br><br><a id="resetpwordspan" href="<?php echo base_url();?>index.php/resetpassword">Forgot password?</a>-->
    </div>
</div>


<div id="dialogoverlay"></div>

<div id="alertdialogbox">
  <div>
    <div id="alertdialogboxhead"></div>
    <div id="alertdialogboxbody"></div>
    <div id="alertdialogboxfoot"></div>
  </div>
</div>
<div class="modal" id="loader"></div>
