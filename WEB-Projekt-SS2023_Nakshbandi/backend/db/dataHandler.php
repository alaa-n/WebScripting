<?php
include("./models/appointment.php");
include("./models/option.php");
include("./models/selection.php");
include("config.php");

class DataHandler
{
    private $conn;

    function __construct()
    {
        $this->conn = new mysqli("localhost", "bif2webscriptinguser", "bif2021", "bif2webscriptinguser");
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getAppointments()
    {
        // returns all appointments from the database
        $query = "SELECT * FROM appointments";
        $result = $this->conn->query($query);
        if ($result->num_rows > 0) {
            $appointments = array();
            while ($row = $result->fetch_assoc()) {
                $appointment = new Appointment($row['appointment_id'], $row['title'], $row['location'], $row['date'], $row['voting_expiry_date'], $row['status'], $row['description'], $row['duration'], $this->getOptionsForAppointment($row['appointment_id']));
                array_push($appointments, $appointment);
            }
            error_log(json_encode($appointments));
            return $appointments;
        } else {
            error_log(json_encode("ERROR GETTING APOINTMENTS"));
            return null;
        }
    }

    public function getAppointmentById($id)
    {
        // returns an appointment by ID from the database
        $query = "SELECT * FROM appointments WHERE appointment_id = $id";
        $result = $this->conn->query($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $appointment = new Appointment($row['appointment_id'], $row['title'], $row['location'], $row['date'], $row['voting_expiry_date'], $row['status'], $row['description'], $row['duration'], $this->getOptionsForAppointment($row['appointment_id']));
            return $appointment;
        } else {
            return null;
        }
    }

    public function getOptionsForAppointment($appointmentId)
    {
        $query = "SELECT * FROM options WHERE appointment_id = $appointmentId";
        $result = $this->conn->query($query);
        if ($result->num_rows > 0) {
            $options = array();
            while ($row = $result->fetch_assoc()) {
                $option = new Option($row["option_id"], $row["appointment_id"], $row["date"], $row["time_from"], $row["time_till"], $row["status"]);
                array_push($options, $option);
            }
            return $options;
        } else {
            return null;
        }
    }

    public function getOptionVotes($optionId)
    {
        $query = "SELECT * FROM selection WHERE option_id = $optionId";
        $result = $this->conn->query($query);
        if ($result->num_rows > 0) {
            $votes = array();
            while ($row = $result->fetch_assoc()) {
                $vote = new Selection($row["selection_id"], $row["option_id"], $row["username"], $row["comment"]);
                array_push($votes, $vote);
            }
            return $votes;
        } else {
            return null;
        }
    }

    public function addUserVote($username, $comment, $optionIds)
    {
        $success = true;
        $this->conn->begin_transaction();
        try {
            foreach ($optionIds as $optionId) {
                $stmt = $this->conn->prepare("INSERT INTO selection (option_id, username, comment) VALUES (?, ?, ?)");
                $stmt->bind_param("iss", $optionId, $username, $comment);
                $stmt->execute();
                $stmt->close();
            }
            $this->conn->commit();
        } catch (Exception $e) {
            $success = false;
        }
        return $success;
    }

    public function deleteAppointment($appointmentId)
{
    $this->conn->begin_transaction();
    try {
        // Step 1: Delete selections for the appointment's options
        $stmt = $this->conn->prepare("DELETE FROM selection WHERE option_id IN (SELECT option_id FROM options WHERE appointment_id = ?)");
        $stmt->bind_param("i", ($appointmentId));
        $stmt->execute();
        $stmt->close();

        // Step 2: Delete the appointment's options
        $stmt = $this->conn->prepare("DELETE FROM options WHERE appointment_id = ?");
        $stmt->bind_param("i", ($appointmentId));
        $stmt->execute();
        $stmt->close();

        // Step 3: Delete the appointment itself
        $stmt = $this->conn->prepare("DELETE FROM appointments WHERE appointment_id = ?");
        $stmt->bind_param("i", ($appointmentId));
        $stmt->execute();
        $stmt->close();

        $this->conn->commit();
        return true;
    } catch (Exception $e) {
        $this->conn->rollback();
        return false;
    }
}

}
