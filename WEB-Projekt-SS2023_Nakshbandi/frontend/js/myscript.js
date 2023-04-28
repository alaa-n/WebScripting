//Starting point for JQuery init
$(document).ready(function () {
    loadAppointments();
    $("#info").fadeOut(0);
    $('#votingForm').fadeOut(0);
    $('#optionVotes').fadeOut(0);
    $('#btnVote').click(addUserVote);
    $('#hideInactive').click(hideInactiveApps);

    // handle voting form submission
    $("#votingForm").submit(function (e) {
        e.preventDefault(); // prevent form submission so that the page doesnt reload when vote is submitted
        submitVote($(this));
    });
});

function loadAppointments() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        cache: false,
        data: {
            method: "getAppointments"
        },
        dataType: "json",
        success: function (response) {
            if (response != null) {
                // console.log(response);
                $.each(response, function (i, appointment) {
                    var html = '<tr class="appointment hideInactive">';
                    html += '<th scope="row">' + (i + 1) + '</th>';
                    html += '<td>' + appointment.title + '</td>';
                    html += '<td> ' + appointment.location + '</td>';
                    var date = new Date(appointment.date);
                    var formattedDate = date.getDate() + ". " + date.toLocaleString('default', { month: 'short' }) + " " + String(date.getFullYear());
                    html += '<td>' + formattedDate + '</td>';
                    html += '<td><span class="status-badge ' + (appointment.status == 1 ? 'active' : 'inactive') + '">' + (appointment.status == 1 ? 'active' : 'inactive') + '</span></td>';
                    html += '<td><span class="badge bg-dark detailsBtn" data-id="' + appointment.id + '">Details</span></td>';
                    html += '<td><span class="badge bg-danger deleteBtn" data-id="' + appointment.id + '">Delete</span></td>';
                    html += '</tr>';

                    $('#appointmentTable').append(html);
                });
                // Add click event to the details button
                $('.detailsBtn').click(function () {
                    var appointmentId = $(this).data('id');
                    $('#all-appointments').fadeOut(0);
                    $('#hideInactive').fadeOut(0);
                    $("#info").fadeIn(100);
                    $('#votingForm').fadeIn(100);
                    loadAppointmentDetails(appointmentId);
                    loadAppointmentOptions(appointmentId);
                });
                $('.deleteBtn').click(function () {
                    var appointmentId = $(this).data('id');
                    deleteAppointment(appointmentId);
                })
            }
        },
        error: function (xhr, status, error) {
            console.log('Error loading appointments. ' + error);
            var html = '<tr><td colspan="6" class="text-center">No Appointments available!</td></tr>';
            $('#appointmentTable').append(html);
        }

    });
}


function loadAppointmentDetails(appointmentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        cache: false,
        data: { method: "getAppointmentById", id: appointmentId },
        dataType: "json",
        success: function (response) {
            //console.log(response);
            if (response != null) {
                // Remove previous appointment details
                $('#apppointment-info').empty();

                // Get the appointment object from the response
                var appointment = response;
                //console.log("appointment: ");
                //console.log(appointment);

                // Set the details in the card
                var html = '<p class="card-text" data-title="Title">' + appointment.title + '</p>';
                html += '<p class="card-text" data-title="Location">' + appointment.location + '</p>';
                var date = new Date(appointment.date);
                var formattedDate = date.getDate() + ". " + date.toLocaleString('default', { month: 'short' }) + " " + String(date.getFullYear());
                html += '<p class="card-text" data-title="Date">' + formattedDate + '</p>'
                html += '<p class="card-text" data-title="Duration">' + appointment.duration + '</p>';
                html += '<p class="card-text" data-title="Description">' + appointment.description + '</p>';
                var expDate = new Date(appointment.expirationDate);
                var formattedExpDate = expDate.getDate() + ". " + expDate.toLocaleString('default', { month: 'short' }) + " " + String(expDate.getFullYear());
                html += '<p class="card-text" data-title="Expiration">' + formattedExpDate + '<span class="status-badge ' + (appointment.status == 1 ? 'active' : 'inactive') + '">' + (appointment.status == 1 ? ' [active]' : ' [inactive]') + '</span> </p>';

                $('#apppointment-info').append(html);
            }
            $('#backToList').click(function () {
                $("#info").fadeOut(0);
                $('#votingForm').fadeOut(0);
                $('#optionsList').empty();
                $('#optionVotes').fadeOut(0);
                $('#voteList').empty();
                $('#all-appointments').fadeIn(100);
                $('#hideInactive').fadeIn(100);
                $('#username').prop('disabled', false);
                $('#comments').prop('disabled', false);
                $('#btnVote').prop('disabled', false);
            });
        },
        error: function (xhr, status, error) {
            console.log("Error loading appointment details. " + error);
        },
    });
}

function loadAppointmentOptions(appointmentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        cache: false,
        data: { method: "getOptionsForAppointment", id: appointmentId },
        dataType: "json",
        success: function (response) {
            //console.log("Options: ");
            //console.log(response);
            if (response != null) {
                $('#optionsList').empty();
                var html = '<ul class="list-group">';
                $.each(response, function (i, option) {
                    html += '<li class="list-group-item">';
                    var date = new Date(option.date);
                    var formattedDate = date.getDate() + ". " + date.toLocaleString('default', { month: 'short' }) + " " + String(date.getFullYear());
                    var formattedTime = option.time_from.substring(0, 5) + "-" + option.time_till.substring(0, 5);
                    var checkboxDisabled = "";
                    if (option.status == 0) {
                        checkboxDisabled = "disabled";
                    }
                    html += '<div class="form-check d-flex align-items-center">';
                    html += '<input class="form-check-input me-2" type="checkbox" value="" id="option_' + option.option_id + '" ' + checkboxDisabled + '>';
                    html += '<label class="form-check-label me-auto" for="option_' + option.option_id + '">' + formattedDate + '<br>' + formattedTime + '</label>';
                    html += '<span class="badge bg-dark rounded-pill viewVotesBtn ms-3" option-id="' + option.option_id + '">View Votes</span></div>';
                    html += '</li>';

                })
                html += '</ul>';
                if (response[0].status == 0) {
                    $('#username').prop('disabled', true);
                    $('#comments').prop('disabled', true);
                    $('#btnVote').prop('disabled', true);
                }
            }
            $('#optionsList').append(html);

            // Add event listener for viewVotesBtn buttons
            $('.viewVotesBtn').click(function () {
                var optionId = $(this).attr('option-id');
                loadVotes(optionId);
                $('#optionVotes').fadeIn(100);
            });
        },
        error: function (xhr, status, error) {
            console.log("Error loading appointment options. " + error);
        },
    })
}


function loadVotes(optionId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        cache: false,
        data: { method: "getOptionVotes", id: optionId },
        dataType: "json",
        success: function (response) {
            //console.log(response);
            if (response != null) {
                $('#voteList').empty();
                var html = '<ul class="list-group list-group-flush">';
                $.each(response, function (i, vote) {
                    html += '<li class="list-group-item"> <strong>' + vote.username + '</strong>' + (vote.comment ? ' ~ commented: ' + vote.comment : '') + '</li>';
                })
                html += '</ul>';
                $('#voteList').append(html);
            }
        },
        error: function (xhr, status, error) {
            $('#voteList').empty();
            var html = '<p colspan="6" class="text-center">No votes yet!</p>';
            $('#voteList').append(html);
        },
    })
}

function addUserVote() {
    var username = $('#username').val();
    var comment = $('#comments').val();
    var selectedOptions = [];
    $('input[type=checkbox]:checked').each(function () {
        selectedOptions.push(parseInt($(this).attr('id').split('_')[1]));
    });

    if (username == "") {
        alert("Please enter a username.");
        return;
    }

    if (selectedOptions.length == 0) {
        alert("Please select at least one option.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        data: {
            method: "addUserVote",
            username: username,
            comment: comment,
            optionIds: selectedOptions
        },
        success: function (response) {
            console.log(response);
            if (response) {
                var toast = `<div class="toast-container position-fixed bottom-0 end-0 p-3">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto text-success"> Success </strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Vote submitted successfully!
                                </div>
                            </div>
                        </div>`;
                $('body').append(toast);
                $('.toast').toast('show');
                // clear the form
                $('#username').val('');
                $('#comments').val('');
                // uncheck the checkboxes
                $('input[type=checkbox]').prop('checked', false);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error submitting vote. " + error);
            var toast = `<div class="toast-container position-fixed bottom-0 end-0 p-3">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto text-danger">Error - ${error}</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Failed to submit vote!
                                </div>
                            </div>
                        </div>`;
            $('body').append(toast);
            $('.toast').toast('show');
        }

    });

}

function deleteAppointment(appointmentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/WEB-Projekt-SS2023_Nakshbandi/backend/serviceHandler.php",
        cache: false,
        data: { method: "deleteAppointment", id: appointmentId },
        dataType: "json",
        success: function (response) {
            if (response) {
                console.log(response);
                var toast = `<div class="toast-container position-fixed bottom-0 end-0 p-3">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto text-success"> Success </strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Appointment deletes successfully.
                                </div>
                            </div>
                        </div>`;
                $('body').append(toast);
                $('.toast').toast('show');
            }
            $('#appointmentTable').fadeOut(0);
            $('#appointmentTable').empty();
            loadAppointments();
            $('#appointmentTable').fadeIn(100);
        },
        error: function (error) {
            console.log("Error deleting appointment. " + error);
            var toast = `<div class="toast-container position-fixed bottom-0 end-0 p-3">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto text-danger">Error - ${error}</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Failed to delete appointment!
                                </div>
                            </div>
                        </div>`;
            $('body').append(toast);
            $('.toast').toast('show');
        }
    })
}

function hideInactiveApps() {
    var hideInactiveCheckbox = $('#flexSwitchCheckDefault');
    var hideInactive = hideInactiveCheckbox.is(":checked");
    var appointments = $('.appointment');

    if (hideInactive) {
        appointments.each(function () {
            if ($(this).find('.status-badge').text() === 'inactive') {
                $(this).fadeOut(0);
            }
        });
    } else {
        appointments.fadeIn(0);
    }
}
