<?php

class Calls extends MY_Sessions{
    function __construct() {
        parent::__construct();
        $this->load->model("callsmodel");
        $this->load->library("email");
    }
    
   public function index(){
	 if(!$this->is_logged_in()){
              redirect('login');
            }  
	} 
    
    function gettechavailability(){
        $data = $this->callsmodel->gettechavailability();
        echo json_encode($data);
    }
    
    function getreference(){
        $ref = $this->input->post("reference");
        $client = $this->input->post("client");
        $csryear = $this->input->post("csryear");
        $data = $this->callsmodel->getreferences($client,$ref,$csryear);
        echo json_encode($data);
    }
    function checkcallnum(){
        $callno = $this->input->post("callnum");
        $status = $this->callsmodel->checkcallnum($callno);
        echo $status;
    }
    
    function createcall(){
      $calldata = json_decode(stripslashes($this->input->post("calldata")));
      $techdata = json_decode(stripslashes($this->input->post("techdata")));
      $mailist = $this->callsmodel->createcall($calldata,$techdata);
      
      $status =0;
    if(count($mailist)>0){
          foreach ($calldata as $row){
            $callno = $row->callnum;
            $calldate = $row->calldate; 
            $contractno = $row->contractnum;
            $fault = $row->fault;
            $reportedby = $row->reportedby;
            $priority = $row->priority;
            $timeline = $row->timeline;
            $location = $row->location;
            $clientname = $row->clientname;
            $days = $row->days;
            $messagetoclient= $row->message;
           }
     // $techdetails = $this->callsmodel->gettechdetails($techdata);     
           
     // $x= count($techdata);
           $this->email->set_mailtype('html');
             $email_message ="<div style='width=250px; min-height=100px; height:auto;>"
                 . "<p style='font-size:18px; color:blue; white-space:pre;'>Dear Sir/Madam,</p></div>";
         $email_message .="<div style='width=250px; min-height=100px; height:auto;>"
                 . "<p style='font-size:15px; color:#0a69fb; white-space:pre;'>".$messagetoclient."</p></div>";
         
           $email_message .="<div style='width=250px; height=500px; border-radius:4px; border:1px solid #0a69fb;  box-shadow:2px 5px 20px #555;'>"
           . "<div style='width:100%; height:50px; background:#0a69fb'><h2 style='color:#fff; text-align:center;'> Service Ticket ".$callno." ".$clientname.".</h2></div>"
                   . "<table style='width=100%;  color:#0a69fb; height=auto;' border-collapse:collapse;><thead><tr><td colwidth=10;></td><td colwidth=20;></td></tr></thead>"
                   . "<tbody><tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Client Name</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$clientname."</td></tr>"
                   . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Service Reference</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$contractno."</td></tr>"
                    . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff;'>Site Location</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$location."</td></tr>"
                    . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Fault Reported</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$fault."</td></tr>"
                    . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Reported By</td><td style='border:1px solid #0a69fb;font-size:18px;'> ".$reportedby."</td></tr>"
                    . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Call Date</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$calldate."</td></tr>"
                    . "<tr><td colspan='2' style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Assigned To</td></tr>";
                  foreach($techdata as $row){
                        $techname = $row->techname;
                        $techphone = $row->phone;
                        $techid = $row->techid;
                      $email_message .="<tr><td colspan='2' style='border:1px solid #0a69fb;font-size:18px;'>Name: ".$techname." ID: ".$techid." Phone: ".$techphone."</td></tr>";
                     }
                   $email_message .= "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Priority</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$priority."</td></tr>"
                    . "<tr><td style='border:1px solid #0a69fb;font-size:18px; background:#0a69fb;color:#fff'>Closure Timeline</td><td style='border:1px solid #0a69fb;font-size:18px;'>".$days."</td></tr>"
                   . "</tbody></table>"
                   . "<div style='width:100%; height:50px; background:#0a69fb;'><h4 style='color:#fff; text-align:center;'>This service ticket is auto-generated. </h4></div>"
                   . "</div>";
        
          $this->email->from("jasewe@symphony.co.ke","Customer Support");
          $this->email->to($mailist);
          $this->email->cc("service@symphony.co.ke");
          $this->email->subject("".$callno.": ".$fault." AT ".$clientname.", ".$location);
          $this->email->message($email_message);
          
          if($this->email->send()){
              $status =1;
          }
      }
      echo $status;
    }
    
    function getcalls(){
        $data = $this->callsmodel->getcalls();
        echo json_encode($data);
    }
    
    function deletecall(){
        $callno = $this->input->post("callno");
        $status = $this->callsmodel->deletecall($callno);
        echo $status;
    }
    
  function getcalltechs(){
      $callnum = $this->input->post("callnum");
      $data = $this->callsmodel->getcalltechs($callnum);
      echo json_encode($data);
  }
  function countservice(){
     $callnum = $this->input->post("callnum");
     $data = $this->callsmodel->countservice($callnum);
     echo json_encode($data);
  }
  
  function checkserviceno(){
      $serviceno = $this->input->post("jobcardserial");
       $status = $this->callsmodel->checkserviceno($serviceno);
       echo $status;
  }
  
  function serviceentry(){
      $servicedata = json_decode(stripslashes($this->input->post("servicedata")));
      $findingsdata = json_decode(stripslashes($this->input->post("findingsdata")));
      $recommendationdata = json_decode(stripslashes($this->input->post("recommendationdata")));
     $status = $this->callsmodel->serviceentry($servicedata,$findingsdata,$recommendationdata);
      echo $status;
  }
  
  function setclientid(){
      $callno = $this->input->post("callno");
      $contractno = $this->input->post("contractno");
      $status = $this->callsmodel->setclientid($callno,$contractno);
      echo $status;
  }
  
  function getservicedetails(){
      $callnum = $this->input->post("callnum");
      $data = $this->callsmodel->getservicedetails($callnum);
      echo json_encode($data);
  }
  
  function getservice(){
      $result = $this->callsmodel->getservice();
      echo json_encode($result);
  }
  
  function createclaim(){
      $claimdata = json_decode(stripslashes($this->input->post("claimdata"))); 
      $status = $this->callsmodel->createclaim($claimdata);
     // echo $status;
      echo json_encode($status);
  }
}

