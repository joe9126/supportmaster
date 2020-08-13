<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'libraries/fpdf182/fpdf.php');
require_once(APPPATH.'libraries/fpdf182/fpdf.css');

/**
 * 
 */
class Pdf extends FPDF
{
	
	function __construct()
	{
		parent::__construct();
	}
}