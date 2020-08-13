<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class home extends MY_Sessions {

function __construct() {
    parent::__construct();
    $this->load->model("loginmodel");
        $this->load->model("homemodel");
}
	public function index(){
	 if(!$this->is_logged_in()){
              redirect('login');
            }  
	}
        
        function userlogin(){
            $this->load->view('login');
        }
        function authenticate(){
            $username = $this->input->post("username");
            $password = $this->input->post("password");
           $userinfo = $this->loginmodel->authenticate($username,$password); 
            $status ="invalidlogin";
            if(strcasecmp($userinfo['email'], $username)===0 && $userinfo['password']=== md5($password)){
               $sessiondata = array("userid"=>$userinfo['userid'],"staffname"=>$userinfo['staffname'],"email"=>$userinfo["email"],"usertype"=>$userinfo["usertype"],"logged_in"=>TRUE);
               $this->session->set_userdata($sessiondata);  
               $status = "loggedin";
            }
             $data = array("status"=>$status,"staffname"=>$userinfo['staffname'],"accountstate"=>$userinfo['status'],"usertype"=>$userinfo['usertype'],"userid"=>$userinfo['userid']);
            echo json_encode($data);
        }
        function dashboard(){
             $this->load->view('dashboard');
        }
        
        function contracts(){
            if($this->is_logged_in()===TRUE){
                
                $this->load->view('contracts');
            }else{
                redirect('login');
            }
             
        }
        
       function calls(){
                 if(!$this->is_logged_in()){
                     redirect('login');
                }
                else{
                $pagename = $this->input->post("page");   
                $userid = $this->session->userdata("userid");
                $status = $this->homemodel->checkpageauth($userid,$pagename);
              $this->load->view('calls');
             /* if($status>0){   
                  //$this->load->view('calls');
                  }else{
                    $status = 0;  
                  }   */    
                }
                echo $status;
       }
       
        function clients(){
             $data = $this->homemodel->clients();
            echo json_encode($data);
        }
        function countcsr(){
            $deptname = $this->input->post("deptname");
            $data = $this->homemodel->countcsr($deptname);
            echo json_encode($data);
        }
        
        function getstaff(){
            $data = $this->homemodel->getstaff();
            echo json_encode($data);
        }
        
        function error_404(){
            redirect('pagenotfound');
        }
        
        function checkusertype(){
            $usertype=$this->session->userdata('usertype');
            echo $usertype;
        }
        
        function loadclients(){
          
              if($this->is_logged_in()===TRUE){
                  $this->load->view('clients');
            }else{
                redirect('login');
            }
        }
        
        function updateclient(){
            $clientid = $this->input->post("clientid");
            $clientname = $this->input->post("clientname");
           // $clientaddress= $this->input->post("clientaddress");
            $clientcity= $this->input->post("clientcity");
            $phone= $this->input->post("phone");
            $clientcontact = $this->input->post("clientcontact");
              $primaryemail= $this->input->post("primaryemail");
              $clientaddress = $this->input->post("clientaddress");
              $extraemail1 = $this->input->post("extraemail1");
              $extraemail2 = $this->input->post("extraemail2");
              $extraemail3 = $this->input->post("extraemail3");
              $clientstatus  = $this->input->post("clientstatus");
            $status = $this->homemodel->updateclient($clientid,$clientname,$clientaddress,$clientcity,$phone,$clientcontact,$primaryemail,
                  $extraemail1,$extraemail2,$extraemail3, $clientstatus );
            echo $status;
        }
        
        function getclientlist(){
            $result = $this->homemodel->getclientlist();
            echo json_encode($result);
        }
        
        function getclientselect(){
            $clientno = $this->input->post("clientno");
            $result = $this->homemodel->getclientselect($clientno);
            echo json_encode($result);
        }
        
        function deleteclient(){
            $clientid = $this->input->post("clientid");
            $status = $this->homemodel->deleteclient($clientid);
            echo $status;
        }
        
        function moduleaccess(){
            $userid = $this->session->userdata("userid");
            $data = $this->homemodel->moduleaccess($userid);
            echo json_encode($data);
        }
}
