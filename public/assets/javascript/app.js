// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     // for (var i = 0; i < data.length; i++) {
//     //   // Display the apropos information on the page
//     //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     // }
//   });

$("#scrapeArticles").on("click", function () {
    $("#articles").empty();

    $.ajax({
        method: "GET",
        url: "/scrape/"
    }).then(function (data) {
        console.log("This is my scrape");
    });
});

$("#getArticles").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/articles/"
    }).then(function (data) {
        console.log("Displaying articles");
        for (var i = 0; i < 15; i++) {
            $("#articles").append("<h4>" + data[i].title + "</h4>");
            $("#articles").append("<a href='https://www.cbr.com'" + data[i].link + "'>Click Here for article</a>");
            $("#articles").append("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal' data-id='" + data[i]._id + "'>Make a Note</button>");
            $("#articles").append("<hr class='hr-primary'></hr>");
        };
    });

    // Whenever someone clicks a p tag
    $(document).on("click", "button", function () {
        // // Empty the notes from the note section
        // $("#notes").empty();
        // // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                $("#title").html("<h5>" + data.title + "</h5>");
                // A textarea to add a new note body
                $("#note").html("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $(".modal-save").html("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Note</button>");
                $(".modal-delete").html("<button type='button' class='btn btn-danger' data-id=" + data.note._id + "' id='delete-note'>Delete</button>");

                // If there's a note in the article
                if (data.note)
                    console.log(data.note); {
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    $(document).on("click", "#delete-note", function () {
        var thisId = $("#savenote").attr("data-id");
        var bodyinput = $("#savenote").attr("bodyinput")

        $.ajax({
                method: "DELETE",
                url: "/notes/" + thisId,
                data: {
                    body : bodyinput
                }
            })
            .then(function (data) {
                console.log(data);
                $("#notes").empty();
            });
    });
});