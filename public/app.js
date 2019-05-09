$.getJSON("./articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#newarticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      }   
});

$(document).on("click", "p", function() {
    $("#savedarticles").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);
        $("#savedarticles").append("<h2>" + data.title + "</h2>");
        $("#savedarticles").append("<input id='titleinput' name='title' >");
        $("#savedarticles").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#savedarticles").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#newarticles", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#savedarticles").empty();
      });
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  