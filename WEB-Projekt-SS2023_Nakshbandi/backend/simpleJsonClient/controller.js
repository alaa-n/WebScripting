// B E A R B E I T E T
//Starting point for JQuery init
$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
        e.preventDefault(); // prevent form submission
        loadAppointmentDetails($("#appointmentSelect").val());
    });

    // handle voting form submission
    $("#voteForm").submit(function (e) {
        e.preventDefault(); // prevent form submission
        submitVote($(this));
    });
});

function loadAppointmentDetails(appointmentId) {
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "getAppointmentDetails", param: appointmentId},
        dataType: "json",
        success: function (response) {
            // update appointment details on the page
            $("#appointmentTitle").text(response.title);
            $("#appointmentLocation").text(response.location);
            $("#appointmentDate").text(response.date);
            $("#appointmentDeadline").text(response.deadline);

            // display voting form
            $("#voteForm").show();
            $("#voteForm input[name='appointmentId']").val(appointmentId);
            $("#voteForm input[name='name']").val("");
            $("#voteForm input[type='checkbox']").removeAttr("checked");
            $("#voteForm textarea[name='comment']").val("");

            // hide search results
            $("#searchResult").hide();
        }
    });
}

function submitVote(form) {
    $.ajax({
        type: "POST",
        url: "../serviceHandler.php",
        cache: false,
        data: form.serialize(),
        dataType: "json",
        success: function (response) {
            if (response.success) {
                // display success message and hide voting form
                $("#voteForm").hide();
                $("#voteSuccessMessage").show();
            } else {
                // display error message
                alert("Error: " + response.message);
            }
        }
    });
}
