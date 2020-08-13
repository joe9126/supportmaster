<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Supplyreqmodel extends CI_Model{
    function __construct() {
        parent::__construct();
    }

    function checkcsrnum($csrnum){
        $query = $this->db->query("select csrno from supply_requests where csrno='".$csrnum."'");
             $status = $query->num_rows();
          return $status;      
    }
    
    function createcsr($dept,$csrdata){
       /* if($dept==="technical"){
            $this->db->insert('supply_requests',$csrdata);
        }else if($dept==="sales"){
            $this->db->insert('sales_supplyreq',$csrdata);
        } */
         $this->db->insert('supply_requests',$csrdata);
        return $this->db->affected_rows();
    }
    
    function updatecsr($csrnum,$csrdata){
                
         $this->db->where("csrno",$csrnum);
         $this->db->update("supply_requests",$csrdata);
         return $this->db->affected_rows();
    }
    
     function additems($data){
              $this->db->insert('csritems',$data);
                 return $this->db->affected_rows();
        }
        
  function getcsrlist($dept){
      $data =null;
 if($dept !=="" || $dept!==null){
 $query = $this->db->query("select supply_requests.clientno,clients.clientname,supply_requests.csrno, supply_requests.description,supply_requests.csrdate,supply_requests.podate,".
"   supply_requests.ponum,supply_requests.currency,supply_requests.csrvalue,supply_requests.soldby,supply_requests.num,supply_requests.invoice_no  from supply_requests ".
"left join clients on supply_requests.clientno=clients.client_no where department='".$dept."' order by supply_requests.csrno desc
");   
          $data = $query->result();
          }else{
                $query = $this->db->query("select supply_requests.clientno,clients.clientname,supply_requests.csrno, supply_requests.description,supply_requests.csrdate,supply_requests.podate, supply_requests.ponum,supply_requests.currency,supply_requests.csrvalue,supply_requests.soldby,supply_requests.num,supply_requests.invoice_no  from supply_requests left join clients on supply_requests.clientno=clients.client_no order by supply_requests.csrno desc");   
                 $data = $query->result();
            }
            
            return $data;
        }
        
        function getcsrselect($csrno){
            $data =  ($this->db->query(" select supply_requests.clientno,clients.clientname,supply_requests.csrno, supply_requests.description,"
                    . "supply_requests.csrdate,supply_requests.podate,supply_requests.ponum,supply_requests.currency,supply_requests.csrvalue,"
                    . "supply_requests.soldby,supply_requests.num,supply_requests.invoice_no,supply_requests.dept_approval,supply_requests.fin_approval,
                        supply_requests.dir_approval from supply_requests 
                        left join clients on supply_requests.clientno=clients.client_no where supply_requests.csrno='".$csrno."'")->result());
          
            return $data;
        }
        function getcsritems($csrno){
              $csritems = $this->db->query("select partno, description,qty,unitcost,id,vat,unitbp,markuprate from csritems where csrno='".$csrno."'")->result();
              return $csritems;
        }
        
    function checkitemid($itemid){
        $query = $this->db->query("select id from csritems where id='".$itemid."'");
         
        $status = $query->num_rows();
      
       return $status;
    }    
    
    function updateitems($itemid,$data){
        $this->db->where("id",$itemid);
        $this->db->update("csritems",$data);
        return $this->db->affected_rows();
    }
    
    
    function deleteitem($itemid,$csrno,$grandtotal){
        $this->db->query("delete from csritems where id='".$itemid."'");
        $status = $this->db->affected_rows();
        if($this->db->affected_rows()>0){
            
             $this->db->set("csrvalue",$grandtotal);
            $this->db->where("csrno",$csrno);
            $this->db->update("supply_requests");
           
            $status = $this->db->affected_rows();
             if($status<1){
                 
                  $this->db->set("csrvalue",$grandtotal);
                $this->db->where("csrno",$csrno);
                 $this->db->update("supply_requests");
               
                 $status = $this->db->affected_rows();
             }
        }
        return $status;
    }
    
    function deleteCsr($csrno,$dept){
      $this->db->from('csritems');
           $this->db->where("csrno",$csrno);
       $status =  $this->db->delete(); 
        if($status === TRUE){
              $this->db->from('supply_requests');
           $this->db->where("csrno",$csrno);
       $status =  $this->db->delete(); 
        }
       if($status === TRUE){$execstatus =1;}else{$execstatus =0;}
      return  $execstatus;
    }
    }
