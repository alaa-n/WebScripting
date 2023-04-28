<?php
class Option
{
  public $option_id;
  public $appointment_id;
  public $date;
  public $time_from;
  public $time_till;
  public $status;

  function __construct($option_id, $appointment_id, $date, $time_from, $time_till, $status)
  {
    $this->option_id = $option_id;
    $this->appointment_id = $appointment_id;
    $this->date = $date;
    $this->time_from = $time_from;
    $this->time_till = $time_till;
    $this->status = $status;
  }
}
