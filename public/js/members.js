$(document).ready(function () {


  let userId = null;

  let projectId = null;


  //Get user name and render list of user's projects
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

    userId = data.id;

    $.get(`/api/projects/${userId}`, function (data) {


      if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

          var listEl = $("<li>");
          projectId = data[i].id;


          //Delete button
          var deleteBtn = $("<button>");
          deleteBtn.attr('id', 'delete-btn');

          //Update button
          var updateBtn = $("<button>");
          updateBtn.attr('id', 'update-btn');


          listEl.text(data[i].projectName).append(deleteBtn, updateBtn);

          $("#my-projects").append(listEl);



        }

      }

    });

  });


  //Render list of all projects in db
  $.get("/api/projects", function (data) {

    if (data.length !== 0) {

      for (var i = 0; i < data.length; i++) {

        var list2El = $("<li>");


        list2El.text(data[i].projectName);

        $("#all-projects").append(list2El);

      }

    }

  });


  //Create new project
  $("#create-btn").on("click", function (event) {
    event.preventDefault();

    const newProj = {
      projectName: $("#name").val().trim(),
      projectDesc: $("#desc").val().trim()
    };

    $.post(`/api/projects/${userId}`, newProj).then(function () {
      location.reload();
    });

  });


  //Update name and description of project


  //Delete project
  $("#delete-btn").on("click", function (event) {
    event.preventDefault(); {

      $.ajax({
        method: "DELETE",
        url: `/api/projects/${projectId}`
      })
        .then(function () {
          location.reload();
        });
    }
  });

});