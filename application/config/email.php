<?php
defined('BASEPATH') OR exit('no direct script access allowed');

   $config = array(
    'protocol' => 'smtp', // 'mail', 'sendmail', or 'smtp'
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => '587',
      //'SMTPAuth' => true,
     //'starttls' => TRUE,
    'smtp_user' => 'jasewe@symphony.co.ke',
    'smtp_pass' => '28788529@Owaga',
    'smtp_crypto' => 'tls', //can be 'ssl' or 'tls' for example
    'mailtype' => 'text', //plaintext 'text' mails or 'html'
    'smtp_timeout' => '120', //in seconds
    'charset' => 'utf-8',
   // 'wordwrap' => TRUE,
    'newline'=>"\r\n"
          
    );