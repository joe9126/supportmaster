<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Loginmodel extends CI_Model{
    function __construct() {
        parent::__construct();
        
    }
    
 function authenticate($username,$password){
 $query = $this->db->query("select users.owner,users.username,users.password,users.type,users.status, staff.email, staff.staffname from users left join staff on users.owner=staff.staffno where staff.email='".$username."' and users.password='".md5($password)."'");
           
       $staffname='';   $userid =''; $status=''; $username1=''; $password1=''; $email=''; $usertype='';
foreach($query->result() as $row){
        $userid .=''.$row->owner.'';
                $status.=''.$row->status.'';
                $username1.=''.$row->username.'';
                $password1.=''.$row->password.'';
        $staffname .=''.$row->staffname.'';
                 $email .=''.$row->email.''; 
                 $usertype=$row->type;
     }

         
$userinfo = array('userid'=>$userid, 'username'=>$username1,'password'=>$password1,'staffname'=>$staffname,'status'=>$status,'email'=>$email,'usertype'=>$usertype);
	return $userinfo;
    }
}