<?php

class Homemodel extends CI_Model{
    
    function clients(){
        $query = $this->db->query("select client_no, clientname from clients order by clientname asc");
        $classdata = $query->result();
        return $classdata;
    }
    
   function countcsr($deptname){
      // $data = array();
 /*  if($deptname==="Sales"){
      $query2 = $this->db->query("SELECT COUNT(CSRNO) AS CSRNUM FROM SALES_SUPPLYREQ WHERE YEAR(CSRDATE)='".date('Y')."'");
        $data = $query2->result();   
     }else if ($deptname==="technical") {
        $query2 = $this->db->query("SELECT COUNT(CSRNO) AS CSRNUM FROM SUPPLY_REQUESTS WHERE YEAR(CSRDATE)='".date('Y')."'");
        $data = $query2->result();    
        } */
        
         $query2 = $this->db->query("select count(csrno) as csrnum from supply_requests where year(csrdate)='".date('Y')."' and department='".$deptname."'");
        $data = $query2->result(); 
        return $data;
   }
   
   function getstaff(){
 $query = $this->db->query("select staff.staffno, staff.staffname,staff.phone, users.status from staff left join users on staff.staffno = users.owner where users.status='active' order by staff.staffname asc");
       $result = $query->result();
       return $result;
   }
   
   function getclientlist(){
       $query = $this->db->query("select client_no, clientname,pobox,town,cont_person,mobile,email,date_added,status,email_1,email_2,email_3 from clients"
               . " order by clientname asc");
       $result = $query->result();
       return $result;
   }
   
  function updateclient($clientid,$clientname,$clientaddress,$clientcity,$phone,$clientcontact,$primaryemail,$extraemail1,$extraemail2,$extraemail3, $clientstatus ){
       $this->db->query("update clients set clientname=COALESCE('".$clientname."',clientname),pobox=COALESCE('".$clientaddress."',pobox),town=COALESCE('".$clientcity."',town),cont_person=COALESCE('".$clientcontact."',cont_person),"
               . "mobile=COALESCE('".$phone."',mobile),email=COALESCE('".$primaryemail."',email),status=COALESCE('".$clientstatus."',status),"
               . "email_1=COALESCE('".$extraemail1."',email_1),email_2=COALESCE('".$extraemail2."',email_1),email_3=COALESCE('".$extraemail3."',email_1) where client_no='".$clientid."'");
         $status =$this->db->affected_rows();
         
       if($this->db->affected_rows()<1){
           $clientdata = array("client_no"=>$clientid,"clientname"=>$clientname,"pobox"=>$clientaddress,"town"=>$clientcity,"cont_person"=>$clientcontact,
              "mobile"=> $phone,"email"=>$primaryemail,"status"=>$clientstatus,"email_1"=>$extraemail1,"email_2"=>$extraemail2,"email_3"=>$extraemail3);
          $this->db->set("date_added", "NOW()");
          $this->db->insert("clients",$clientdata);
           $status =$this->db->affected_rows();
           }
     
       return $status;
   }
   
   
   function getclientselect($clientno){
      $query = $this->db->query("select client_no,clientname,pobox,town,cont_person,mobile,email,email_1,email_2,email_3, status from clients where "
               . " client_no='".$clientno."'");
       $result = $query->result();
       return $result;
   }
   
   function deleteclient($clientid){
     $state =  $this->db->query("select clientno from supply_requests where clientno='".$clientid."'")->num_rows();
     if($state<1){
        $state = $this->db->query("select client from calls where client='".$clientid."'")->num_rows();
        
        if($state<1){
            $this->db->query("delete from clients where client_no ='".$clientid."'");
         $status = $this->db->affected_rows();
        }
         
     }else{        
       $status =0;
     }
     return $status;
   }
   
   function moduleaccess($userid){
     $query =  $this->db->query("select module_access.modulename, module_access.status,users.type from module_access left join users "
             . "on module_access.userid=users.owner where module_access.userid='".$userid."'");
       $data = $query->result();
       return $data;
   }
   
   function checkpageauth($userid,$pagename){
         $query =  $this->db->query("select status from module_access where userid='".$userid."' and modulename='".$pagename."'");
       $data = $query->result();$status="";
       foreach ($data as $row){
           $status = $row->status;
       }
       return $status;
   }
}
