<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }
    function handleRequest($method, $params)
    {
        error_log("handle request");
        error_log("method: " . $method);
        switch ($method) {
            case "getAppointments":
                $res = $this->dh->getAppointments();
                break;
            case "getAppointmentById":
                $res = $this->dh->getAppointmentById($params['id']);
                break;
            case "getOptionsForAppointment":
                $res = $this->dh->getOptionsForAppointment($params['id']);
                break;
            case "getOptionVotes":
                $res = $this->dh->getOptionVotes($params['id']);
                break;
            case "addUserVote":
                $res = $this->dh->addUserVote($params['username'], $params['comment'], $params['optionIds']);
                break;
            case "deleteAppointment":
                $res = $this->dh->deleteAppointment($params['id']);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
