<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Supplyrequests extends MY_Sessions{
    
    
    function __construct() {
        parent::__construct();
        $this->load->model("supplyreqmodel");
    }
   public function index(){
	 if(!$this->is_logged_in()){
              redirect('login');
            }  
	}
    
   /* function checkcsrnum(){
        $csrnum = $this->input->post("csrnum");
        $department = $this->input->post("department");
        $status = $this->supplyreqmodel->checkcsrnum($csrnum,$department);
        echo $status;
    }*/
    
    function createcsr(){
         $csrnum = $this->input->post("csrnum");
         $dept = $this->input->post("department");
        $clientid = $this->input->post("clientid");
        $description= $this->input->post("description");
        $csrdate = $this->input->post("csrdate");
        $ponum= $this->input->post("ponum");
        $podate = $this->input->post("podate");
        $currency = $this->input->post("currency");
        $salesperson = $this->input->post("salesperson");
        $deptmanager = $this->input->post("deptmanager");
        $finmanager = $this->input->post("finmanager");
        $dirmanager = $this->input->post("dirmanager");
        $csrvalue = $this->input->post("csrvalue");
        $marginrate = $this->input->post("marginrate");
        $grandtotalBP  = $this->input->post("grandtotalBP");
         $status = $this->supplyreqmodel->checkcsrnum($csrnum,$dept);
       
        if($status<1){
          $csrdata = array("clientno"=>$clientid,"csrno"=>$csrnum,"description"=>$description,"csrdate"=>$csrdate,
              "ponum"=>$ponum,"podate"=>$podate,"currency"=>$currency,"csrvalue"=>$csrvalue,"soldby"=>$salesperson,"invoice_no"=>"NA","dept_approval"=>$deptmanager,
              "fin_approval"=>$finmanager,"dir_approval"=>$dirmanager,"totalbp"=>$grandtotalBP,"margin"=>$marginrate,"department"=>$dept); 
           $status = $this->supplyreqmodel->createcsr($dept,$csrdata);
           
    }else{
         $csrdata = array("clientno"=>$clientid,"description"=>$description,"csrdate"=>$csrdate,
              "ponum"=>$ponum,"podate"=>$podate,"currency"=>$currency,"csrvalue"=>$csrvalue,"soldby"=>$salesperson,"invoice_no"=>"NA","dept_approval"=>$deptmanager,
              "fin_approval"=>$finmanager,"dir_approval"=>$dirmanager,"totalbp"=>$grandtotalBP,"margin"=>$marginrate,"department"=>$dept);
         
          $status = $this->supplyreqmodel->updatecsr($csrnum,$csrdata);
    }
       echo $status;
    }
    
    function additems(){
    //  department:department,csrnum:csrnum,partno:partno,descript:descript,qty:qty,unitcost:unitcost,vat:vat  
        //$dept = $this->input->post("department");
        $itemid =  $this->input->post("itemid");
        $csrnum = $this->input->post("csrnum");
        $partno = $this->input->post("partno");
        $descript = $this->input->post("descript");
        $qty = $this->input->post("qty");
        $unitBP = $this->input->post("unitBP");
        $unitSP = $this->input->post("unitSP");
        $margin = $this->input->post("margin");
        $vat = $this->input->post("vat");
        
        $itemnumstatus = $this->supplyreqmodel->checkitemid($itemid);
     
      if($itemnumstatus<1){
       $data = array("csrno"=>$csrnum,"partno"=>$partno,"description"=>$descript,"qty"=>$qty,"unitcost"=>$unitSP,"margin"=>$margin,"markuprate"=>$margin,"unitbp"=>$unitBP,"vat"=>$vat);
      $status = $this->supplyreqmodel->additems($data);
        }else
            {
              $data = array("csrno"=>$csrnum,"partno"=>$partno,"description"=>$descript,"qty"=>$qty,"unitcost"=>$unitSP,"margin"=>$margin,"markuprate"=>$margin,"unitbp"=>$unitBP,"vat"=>$vat);
              $status = $this->supplyreqmodel->updateitems($itemid,$data);
        }
     // echo json_encode($data);
      echo $status;
    }
    
    function deleteitem(){
       $itemid = $this->input->post("itemid");
       $csrno =  $this->input->post("csrno");
       $grandtotal =  $this->input->post("grandtotal");
       $status = $this->supplyreqmodel->deleteitem($itemid,$csrno,$grandtotal);
       echo $status;
    }
    function getcsrlist(){
        $dept = $this->input->post("dept");
        $data = $this->supplyreqmodel->getcsrlist($dept);
        echo json_encode($data);
    }
    function getcsrselect(){
     $csrno = $this->input->post("csrno");
     $data = $this-> supplyreqmodel->getcsrselect($csrno);
     echo json_encode($data);
    }
    function getcsritems(){
        $csrno = $this->input->post("csrno");
        $csritems = $this->supplyreqmodel->getcsritems($csrno);
        echo json_encode($csritems);
    }
    
    function deleteCsr(){
        $csrno =  $this->input->post("csrno");
        $dept  =  $this->input->post("dept");
        $status = $this->supplyreqmodel->deleteCsr($csrno,$dept);
        echo $status;
    }
}
