<?php
class Selection
{
  public $selection_id;
  public $option_id;
  public $username;
  public $comment;

  function __construct($selection_id, $option_id, $username, $comment)
  {
    $this->selection_id = $selection_id;
    $this->option_id = $option_id;
    $this->username = $username;
    $this->comment = $comment;
  }
}
