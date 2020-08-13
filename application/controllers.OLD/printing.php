<?php

/**
 * 
 */
class Printing extends CI_Controller
{
	function __construct(){
		parent::__construct();
		$this->load->library('Pdf');
	}
	
	function Header(){
		   // Logo
   		 $this->Image('logo.png',10,6,30);
		$this->SetFont('Arial','B',14);
		$this->Cell(276,5,'TECHNICAL SERVICE DEPT',0,0,'C');
		$this->ln();
		$this->SetFont('Times','',12);
		$this->Cell(276,10,'Customer Supply Request',0,0,'C');
		$this->ln(20);
	}
	function Footer(){
		$this->SetY(-15);
		$this->SetFont('Arial','',8);
		 // Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
	}
}
$pdf = new Printing();
//$pdf->AliasNbPages();
$pdf->AddPage('L','A4',0);
$pdf->Output('File.pdf','I');