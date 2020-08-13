<?php

class Callsmodel extends CI_Model{
    
    function __construct() {
        parent::__construct();
        $this->load->library('email');
         $this->load->helper('email');
    }
    function gettechavailability(){
        $query = $this->db->query("select  staff.staffname, staff.phone,calls.location from staff left join calls on "
                . "staff.staffno = calls.technician where staff.post like '%field technician%' or staff.post like '%technician%' or "
                . "staff.post like '%pre-sales%' or staff.post='%snr%' and calls.status!='CLOSED'");
    }
    
    function getreferences($client,$ref,$csryear){
            $query ="";
        if($ref==="contract"){
            $query ="select contract_no, cont_descrip from contracts where client_no='".$client."'  order by start desc";
        }
        else{
             $query ="select csrno, description from supply_requests  where clientno='".$client."' and year(csrdate)='".$csryear."' order by csrdate desc";
        }
       $result = $this->db->query($query);
        return $result->result();
    }
    
    function checkcallnum($callno){
        $query = $this->db->query("select call_no from calls where call_no='".$callno."'");
        return $query->num_rows();
    }
    
    function createcall($calldata,$techdata){
       $techinfo = array();  $callno="";
       
       foreach($techdata as $row){
          $techinfo = array( "TECH"=>$row->techid);  
        }
        $maintech = current($techinfo);  
        $clientnotification ="";
        foreach ($calldata as $row){
            $callno = $row->callnum;
            $client = $row->client;
            $calldate = $row->calldate; 
            $contractno = $row->contractnum;
            $fault = $row->fault;
            $reportedby = $row->reportedby;
            $priority = $row->priority;
            $timeline = $row->timeline;
            $location = $row->location;
            $clientnotification = $row->clientnotify;
            $callinfo = array("CALL_DATE"=>$calldate,"CALL_NO"=>$callno,"TECHNICIAN"=>$maintech,"CONTRACT_NO"=>$contractno,"TO_DO"=>$fault
                    ,"REPORTEDBY"=>$reportedby,"LOCATION"=>$location,"PRIORITY"=>$priority,"RESOL_TIMELINE_DAYS"=>$timeline,"CLIENT"=>$client);
                  }
                  
            $this->db->insert("calls",$callinfo);      
          foreach($techdata as $row){
          $techinfo = array("CALLNO"=>$callno,"TECH"=>$row->techid);  
          $this->db->insert("calltechs",$techinfo);
          }
          
         
          $status = $this->db->affected_rows();
          
          if($status>0){
              $mailinglist=array();
              $query = $this->db->query("select email,email_1,email_2,email_3"
                      . " from clients where client_no=(select client_no from contracts where "
                      . "contract_no='".$contractno."')");
              $clientmails = $query->result();
              if($clientnotification==="YES"){
              foreach ($clientmails as $row){
                  if(valid_email($row->EMAIL)){
                       array_push($mailinglist,$row->EMAIL);
                  }
                   if(valid_email($row->EMAIL_1)){
                       array_push($mailinglist,$row->EMAIL_1);
                  }  
                  if(valid_email($row->EMAIL_2)){
                       array_push($mailinglist,$row->EMAIL_2);
                  }
                    if(valid_email($row->EMAIL_3)){
                       array_push($mailinglist,$row->EMAIL_3);
                  } 
              }
              }
              
               foreach($techdata as $row){
                  $techid = $row->techid;
                  $query2 = $this->db->query("select email from staff where staffno='".$techid."'");
                  $techmail = $query2->row()->EMAIL;
                    if(valid_email($techmail)){
                       array_push($mailinglist,$techmail);
                  } 
              }
            
          }
        return  $mailinglist;
    }
    
    function gettechdetails($techdata){
        $techdetails =array();
        foreach ($techdata as $row){
            $techid = $row->techid;
            $query2 = $this->db->query("select staffname, phone from staff where staffno='".$techid."'");
             $techname = $query2->row()->STAFFNAME;
             $techphone = $query2->row()->PHONE;
             $tech = array("staffname"=>$techname,"phone"=>$techphone);
             array_push($techdetails, $tech);
        }
        return $techdetails;
    }
    
    function getcalls(){
        $query = $this->db->query("select calls.call_no,calls.call_date,calls.to_do,clients.clientname,calls.location,calls.resol_timeline_days,calls.status,calls.reportedby,calls.priority,staff.staffname,calls.contract_no from calls left join staff on calls.technician=staff.staffno left join contracts on calls.contract_no=contracts.contract_no left join clients on calls.client=clients.client_no order by calls.call_date desc");
      $data = $query->result(); 
      //WHERE YEAR(CALLS.CALL_DATE)='".date('Y').
      return $data;
    }
    
    function deletecall($callno){
       $this->db->query("delete from claims where call_no='".$callno."'");
      $this->db->query("delete from service where call_no='".$callno."'");
      $this->db->query("delete from calls where call_no='".$callno."'");

     $status =  $this->db->affected_rows();   
      
     return $status;
    }
    
    
    function getcalltechs($callnum){
        $query = $this->db->query("select  calltechs.tech, staff.staffname from calltechs left join staff on "
                . " calltechs.tech = staff.staffno  "
                . " where calltechs.callno='".$callnum."'");
        $result = $query->result();
        if($query->num_rows()<1){
          $query = $this->db->query("select  calls.technician, staff.staffname from calls left join staff on "
                . " calls.technician = staff.staffno where calls.call_no='".$callnum."'");  
           $result = $query->result();
        }
        return $result;
    }
    function countservice($callnum){
        $query = $this->db->query("select count(call_no) as timesattended from service where call_no='".$callnum."'");
        $result = $query->result();
        return $result;
    }
    
    function checkserviceno($serviceno){
        $query = $this->db->query("select service_no from service where service_no='".$serviceno."'");
        $result = $query->num_rows();
        return $result;
    }
    
    function serviceentry($servicedata,$findingsdata,$recommendationdata){
        
        foreach ($servicedata as $row){
           $callnum = $row->call_no;
            $serviceno = $row->service_no;
            $servicedate = $row->service_date;
            $starttime  = $row->from2;
            $endtime = $row->to2;
            $location = $row->location;
            $description = $row->equip_descrip;
            $model = $row->equip_model;
            $serial = $row->serial;
            $action = $row->action;
            $callstatus = $row->status; 
            $town = $row->town;

        }
         $serviceentry = array("CALL_NO"=>$callnum,"SERVICE_NO"=>$serviceno,"SERVICE_DATE"=>$servicedate,"FROM2"=>$starttime,
                        "TO2"=>$endtime,"LOCATION"=>$location,"TOWN"=>$town,"EQUIP_DESCRIP"=>$description,"EQUIP_MODEL"=>$model,"SERIAL"=>$serial,"ACTION"=>$action,
                         "STATUS"=>$callstatus);
         
      $this->db->insert("service",$serviceentry);
        $status = $this->db->affected_rows();
        if($status>0){
            $callno=""; $callstatus="";
            
            foreach ($servicedata as $row){
                $callno =$row->CALL_NO;
                $callstatus =$row->STATUS;
            }
            $this->db->query("update calls set status='".$callstatus."',location='".$location."' where call_no='".$callno."'");
            
            foreach ($findingsdata as $row){
               $serviceno = $row->SERVICE_NO;
               $findings = $row->findings;
               $findingsentry = array("SERVICE_NO"=>$serviceno,"findings"=>$findings);
            }            
            $this->db->insert("service_findings",$findingsentry);
            
             foreach ($recommendationdata as $row){
               $serviceno = $row->SERVICE_NO;
               $recommendation = $row->recommendations;
               $recommendationsentry = array("SERVICE_NO"=>$serviceno,"recommendations"=>$recommendation);
            }
            $this->db->insert("service_recommendations",$recommendationsentry);
            
            
           $this->db->query("insert into claims(call_no, service_no) values('".$callno."','".$serviceno."')");
           $status =  $this->db->affected_rows();
        }
        return $status;
    }

    
    function getservicedetails($callnum){
     $query =   $this->db->query("select service_no,service_date,from2,to2,location,town,equip_descrip,equip_model,serial,action,status from service where call_no='".$callnum."'");
        $data = $query->result();
        return $data;
    }
    
    function getservice(){
       
        
        if(strcasecmp($this->session->userdata("usertype"), "USER")===0){
           $query = $this->db->query("select service.service_no,calls.call_no,service.service_date,clients.clientname,service.location,"
            ."claims.status,staff.staffname from service left join calls on service.call_no=calls.call_no "
                ."left join clients on calls.client=clients.client_no left join staff on calls.technician = staff.staffno "
                ." left join claims on service.service_no=claims.service_no where calls.technician ='".$this->session->userdata("userid")."' order by service.service_date desc");
 
        }else{
             $query = $this->db->query("select service.service_no,calls.call_no,service.service_date,clients.clientname,service.location,"
            ."claims.status,staff.staffname from service left join calls on service.call_no=calls.call_no "
                ."left join clients on calls.client=clients.client_no left join staff on calls.technician = staff.staffno "
                ." left join claims on service.service_no=claims.service_no order by service.service_date desc");
        }
        $data = $query->result();
        return $data;
        }
        
        function createclaim($claimdata){
           // foreach ($claimdata as $row)
             $serviceno = $claimdata->service_no;
              $updatedata =  get_object_vars($claimdata);
            unset($updatedata["call_no"]); unset($updatedata["service_no"]);
            
           
           $this->db->where("SERVICE_NO",$serviceno);
           $this->db->update("claims",$updatedata);
             $status = $this->db->affected_rows(); 
             
           if($status<1){
              $this->db->insert("claims",$claimdata);
            $status = $this->db->affected_rows(); 
           }
         
           return $status;
           // return $claimdata;
        }
    
}

