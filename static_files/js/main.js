$(document).ready(function () {
  $(".modal-container").hide();
  $(".weather_data").hide();
  $("#error").hide();
});

function showWeather(data, text) {
  let temp_data = data.main;
  let weather_data = data.weather[0];
  let icon = weather_data.icon + ".svg";
  let imgURL = "/static/animated/" + icon;
  let degree = Math.abs(temp_data.temp - 273.15).toFixed(0);
  let title2 = "(" + data.name + ", " + data.sys.country + ")";

  $(".title").html(text);
  $(".title2").html(title2);
  $("img").attr("src", imgURL);
  $("#discription").html(weather_data.main);
  $("#degree").html(degree + "&deg;");
  $(".weather_data").fadeIn();
  $("#error").fadeOut();
  $(".container").css("overflow", "auto");
}

$("#microphone, #try_again").on("click", function () {
  $("#listening").html("Listening...... ");
  $("#try_again").hide();
  $(".modal-container").show();
  $(".microphone-div").css("animation-play-state", "running");

  $.ajax({
    type: "POST",
    url: "get_weather_details_with_mic",
    dataType: "json",
    data: {
      command: "start",
      csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
    },
    success: function (response) {
      let data = response.data;

      if (data == "Unable") {
        $(".microphone-div").css("animation-play-state", "initial");
        $(".microphone-div").css("animation-play-state", "initial");
        $(".microphone-div").css("animation-play-state", "initial");
        $(".microphone-div").css("animation-play-state", "paused");

        $(".text #listening").html("Unable to recognise");

        $("#try_again").show();
      } else if (data !== "not found") {
        $("#input_text").val(response.text);
        $(".modal-container").hide();
        showWeather(data, response.text);
      } else {
        $("#input_text").val(response.text);
        $(".modal-container").hide();
        $(".weather_data").fadeOut();
        $("#error").fadeIn();
        $(".container").css("overflow", "hidden");
      }
    },
    error: function (response) {},
  });
});

$(".modal-container").on("click", function () {
  $(".modal-container").hide();

  $.ajax({
    type: "POST",
    url: "get_weather_details_with_mic",
    dataType: "json",
    data: {
      command: "stop",
      csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
    },
    success: function () {},
    error: function () {},
  });
});

$(".modal-container .modal").on("click", function (e) {
  e.stopPropagation();
});

$("#input_text").on("keypress", function (e) {
  if (e.which === 13) {
    let input = $(this).val();
    if (input !== "") {
      $.ajax({
        type: "POST",
        url: "get_weather_details",
        dataType: "json",
        data: {
          input_text: input,
          csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (response) {
          let data = response.data;

          if (data !== "not found") {
            showWeather(data, response.text);
          } else {
            $(".weather_data").fadeOut();
            $("#error").fadeIn();
            $(".container").css("overflow", "hidden");
          }
        },
        error: function (response) {},
      });
    }
  }
});
