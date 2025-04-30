document.addEventListener("DOMContentLoaded", () => {
  // Navbar Upload
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });

  // Footer Upload
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  const appointmentForm = document.getElementById("appointment-form");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      var valid = true;
      var errorMessage = '';

      // Name validation
      if ($('#name').val() === '') {
        valid = false;
        errorMessage += 'Name cannot be empty.\n';
      }

      // Email validation (.com format)
      // Email validation (any valid domain)
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if ($('#email').val() === '' || !emailPattern.test($('#email').val())) {
        valid = false;
        errorMessage += 'Please enter a valid email address.\n';
      }

      // Subject selection validation
      if ($('#subject').val() === '') {
        valid = false;
        errorMessage += 'You must select a subject.\n';
      }

      // Appointment date validation
      if ($('#appointment-date').val() === '' || $('#appointment-date').val() === 'Select date and time from the calendar') {
        valid = false;
        errorMessage += 'You must select an appointment date.\n';
      }

      // Message validation
      if ($('#message').val() === '') {
        valid = false;
        errorMessage += 'The message field cannot be empty.\n';
      }

      // If validation fails, show an alert
      if (!valid) {
        alert('Please correct the following errors:\n\n' + errorMessage);
        return;  // Prevent form submission if validation fails
      }

      // If form is valid, send data using fetch
      const formData = new FormData(appointmentForm);
      fetch(appointmentForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        if (response.ok) {
          // Open Modal when form is successfully submitted
          // ? jQuery Plugin for modal opening process
          $("#success-modal").fadeIn();
          
          appointmentForm.reset();
          selectedDay = null;
          selectedTime = null;
          document.getElementById("selected-date").textContent = "";
          document.getElementById("appointment-date").value = "";
          generateCalendar();
        } else {
          alert("Message could not be sent, please try again.");
        }
      })
        .catch((error) => console.error("Error:", error));
    });
  }
});
// Modal closure operations
$(document).ready(function() {
  $(".close-button").click(function() {
    $("#success-modal").fadeOut();
  });

  // If the user clicks outside the modal, it will close
  $(window).click(function(event) {
    if ($(event.target).is("#success-modal")) {
      $("#success-modal").fadeOut();
    }
  });
});

  // ? jQuery Plugin for the welcome section at the entrance (jQuery Animate)
  $(document).ready(function () {
    function floatText() {
        $("#welcome-text").animate({ top: "-=20px" }, 1500)
                          .animate({ top: "+=20px" }, 1500, floatText);
    }
    
    // Set location at startup
    $("#welcome-text").css("position", "relative");

    // Start the animation
    floatText();
});

// ? jQuery Plugin for client comment section (Slick Carousel)
$(document).ready(function(){
    $('.testimonial-slider').slick({
      autoplay: true,
      autoplaySpeed: 4000, // Every 4 seconds a slide
      arrows: false,       // Do not show next/prev buttons
      dots: false,         // If there are no small dot indicators at the bottom
      infinite: true,
      speed: 600,          // Transition animation duration
      fade: false,
      cssEase: 'linear'
    });
  });
  
// ? jQuery Plugin for professional psychological support section
$(document).ready(function () {
    // If the support section appears when the page is scrolled, start the animation
    $(window).on("scroll", function () {
        var section = $("#support-section");
        var sectionTop = section.offset().top;
        var windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > sectionTop + 100) {
            section.addClass("animate-support");
        }
    });
});
// ? jQuery Plugin for contact me
$(document).ready(function () {
  // Hide title and text at the beginning and position below
  $("#contact-title, #contact-intro").css({
      opacity: 0,
      transform: "translateY(50px)"
  });

  // Start the animation when the page loads
  $("#contact-title, #contact-intro").animate(
      { opacity: 1, top: "0" },
      {
          duration: 2000,
          step: function (now, fx) {
              if (fx.prop === "top") {
                  $(this).css("transform", `translateY(${50 - now * 50}px)`);
              }
          }
      }
  );
});

// ? jQuery Widget for frequently asked question section (Accordion)
$(function() {
  $("#faq-accordion").accordion({
      collapsible: true,
      active: false,
      heightStyle: "content"
  });
});

// ? ? jQuery Plugin for calendar (Datetimepicker Plugin)
$(function() {
  $("#appointment-date").datetimepicker({
      dateFormat: "dd.mm.yy",  // Date format: 27.04.2025
      timeFormat: "HH:00",  // No minutes, only hours
      minDate: 0,           // No dates before today can be selected
      stepHour: 1,          // Step by 1 hour for hour selection
      firstDay: 1,          // Monday as the first day of the week
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],  // Short day names (Sun, Mon, etc.)
      monthNames: ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"],  // Month names
      beforeShow: function(input, inst) {
          setTimeout(function () {
              $('.ui-datepicker').css('background-color', '#6cafb8');  // Set background color
          }, 0);
      },
      onSelect: function(selectedDateTime) {
          var selectedDate = $(this).datetimepicker('getDate');
          var now = new Date();

          if (selectedDate.toDateString() === now.toDateString()) {
              // If the selected date is today
              var currentHour = now.getHours(); // Get the current hour
              if (now.getMinutes() > 0) currentHour += 1; // If minutes are greater than 0, add 1 hour
              // If it is 19:00 or later today, you cannot make an appointment today.
              if (currentHour >= 19) {
                alert("Appointments cannot be made today, working hours are over.");
                $(this).val(""); // Seçimi temizle
                return;
              }
              // Only the hours after today can be selected (between 9-19)
              var startHour = Math.max(currentHour, 9); // Current time or 9
              $(this).datetimepicker('option', 'hourMin', startHour);
              $(this).datetimepicker('option', 'hourMax', 19);  // Set maximum hour to 19 (7 PM)
          } else {
              // If a future date is selected, available hours are between 09:00 and 19:00
              $(this).datetimepicker('option', 'hourMin', 9);  // Set minimum hour to 9:00 AM
              $(this).datetimepicker('option', 'hourMax', 19);  // Set maximum hour to 7:00 PM
          }
      }
  });
});

// ? jQuery Plugin for "My Areas of Expertise"(Tooltip)
$(document).ready(function () {
  $('.expertise-box').each(function() {
    var tooltipText = $(this).find('.tooltip').text();
    $(this).qtip({
      content: { text: tooltipText },
      style: { 
          classes: 'qtip-shadow custom-qtip',
          tip: {
              corner: true
          },
          widget: false
      },
      position: { 
          my: 'top center', 
          at: 'bottom center'
      },
      show: {
          delay: 100,
          effect: function() {
              $(this).fadeIn(500);
          }
      },
      hide: {
          fixed: true,
          delay: 300,
          effect: function() {
              $(this).fadeOut(500);
          }
      }
    });
  });
});


// ? jQuery Widget for email address (Autocomplete)
$(function() {
  var domains = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", 
    "aol.com", "mail.com", "zoho.com", "protonmail.com", "yandex.com",
    "gmx.com", "inbox.com", "live.com", "msn.com", "me.com"
  ];

  $("#email").autocomplete({
    source: function(request, response) {
      var term = request.term;
      var atIndex = term.indexOf('@');

      // If the user typed @
      if (atIndex > -1) {
        var name = term.slice(0, atIndex);    // @ before (username)
        var domainPart = term.slice(atIndex + 1); // Posts after @
        
        var filteredDomains = $.grep(domains, function(domain) {
          return domain.indexOf(domainPart) === 0;  // Domains starting with the text
        });

        var suggestions = $.map(filteredDomains, function(domain) {
          return name + "@" + domain;  // Username + @ + completed domain
        });

        response(suggestions);
      } else {
        // If @ is not written, we do not give suggestions.
        response([]);
      }
    },
    minLength: 1
  });
});

// ? jQuery Widget for more information section on the about me page (Dialog)
$(document).ready(function() {
  $("#dialog").dialog({
    autoOpen: false,
    modal: true
  });

  $("#open-dialog").click(function() {
    $("#dialog").dialog("open");
  });
});

// ? jQuery Widget for adjusting stress level in online appointment (Slider)
$(function() {
  // Slider Initialization
  $("#slider").slider({
      value: 50,
      min: 0,
      max: 100,
      slide: function(event, ui) {
          $("#slider-value").text(ui.value);
      }
  });
});

