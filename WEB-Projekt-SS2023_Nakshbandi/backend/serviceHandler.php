<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $method = isset($_GET["method"]) ? $_GET["method"] : false;
    $param = isset($_GET["id"]) ? array("id" => $_GET["id"]) : false;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    error_log("post");
    foreach($_POST as $param_name => $param_val){
        error_log($param_name . $param_val);
    }
    $method = isset($_POST["method"]) ? $_POST["method"] : false;
    if(isset($_POST["username"]) && isset($_POST["comment"]) && isset($_POST["optionIds"])){
        $param = array("username" => $_POST["username"], "comment" => $_POST["comment"], "optionIds" => $_POST["optionIds"]);
    } else {
        $param = false;
    }
}

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);
if ($result == null) {
    response("GET", 400, null);
} else {
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        response("GET", 200, $result);
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        response("POST", 200, $result);
    }
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "JSON error: " . json_last_error_msg();
    }
}
