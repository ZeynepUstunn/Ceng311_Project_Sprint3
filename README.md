# Ceng311_Project_Sprint3
# Aybüke Üstün | Psychologist Web Application
This interactive web application presents the professional services of psychologist Aybüke Üstün. 
It includes various sections such as psychological support information, online appointment forms, and user testimonials.

Used jQuery-UI Widgets:
1.Accordion (Online Appointment page)
Usage: Display FAQ questions in an expandable/collapsible format.
Code: $("#faq-accordion").accordion();

2.Autocomplete (Online Appointment page)
Usage: Provides email auto-completion suggestions in the contact form.
Code: $("#email").autocomplete({ source: availableEmails });

3.Datetimepicker (Online Appointment page)
Usage: Allows users to select a date and time for appointments from a calendar.
Code: $("#appointment-date").datetimepicker({ ... }) 
- *Note: Requires the timepicker addon plugin.*

4.Dialog (About Me page)
Usage: Information box in the "About Me" section.
Code: $("#dialog").dialog({ autoOpen: false, modal: true });

5.Slider (Online Appointment page)
Usage: Displays and updates a numerical value in the user interface.
Code: `$("#slider").slider({ value: 50, min: 0, max: 100, slide: function(event, ui) { $("#slider-value").text(ui.value); } });`

6.Modal (Online Appointment page)
Usage: Display confirmation message after submitting the appointment request form. (Online Appointment Request)
Code: $("#appointment-modal").fadeIn();

Used  External jQuery Plugins:
1.Slick Carousel (Home page - Testimonials section)
Usage: Displays user testimonials in a sliding carousel.
Code: $('.testimonial-slider').slick({ ... })

2.QTip2 Tooltip (Home page - Expertise section)
Usage: Shows additional information when hovering over expertise boxes.
Code: $(this).qtip({ ... })

3.Page Animations (animate and fade effects)
Usage:
o Animation of the welcome text (#welcome-text).
o Modal show/hide (#success-modal).
o Contact page entrance animations.
Code Examples:
o $("#welcome-text").animate({ top: "10px" }, 1000);
o $("#success-modal").fadeIn();






