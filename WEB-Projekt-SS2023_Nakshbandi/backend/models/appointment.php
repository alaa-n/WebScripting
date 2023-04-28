<?php
class Appointment
{
  public $id;
  public $title;
  public $location;
  public $date;
  public $expirationDate;
  public $status;
  public $description;
  public $duration;
  public $options;

  function __construct($id, $title, $location, $date, $expirationDate, $status, $description, $duration, $options)
  {
    $this->id = $id;
    $this->title = $title;
    $this->location = $location;
    $this->date = $date;
    $this->expirationDate = $expirationDate;
    $this->status = $status;
    $this->description = $description;
    $this->duration = $duration;
    $this->options = $options;
  }
}
