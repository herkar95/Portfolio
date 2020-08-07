'use strict';

jQuery(document).ready(function ($) {
  /* Initializes the script to animate sections of the page on scroll.
    See HTML for source */
  AOS.init({
    duration: 1000,
    offset: 300,
  });

  // Event handlers
  $(document).on('aos:in', ({ detail }) => {
    if (detail.id === 'about') {
      $('.progress-bar').addClass('animate-progress');
    }
  });
  $(document).on('aos:out', ({ detail }) => {
    if (detail.id === 'about') {
      $('.progress-bar').removeClass('animate-progress');
    }
  });
  AOS.refresh();
  /* Places the navigation at the top or the bottom, depending on screen size. */
  onResize();
  // Gets the current year. Used in footer for copyright
  let date = new Date();
  document.querySelector('#year').textContent = date.getFullYear();
  onScroll();

  /* Scroll to a certain section of the page using the navbar */
  $('#navbar a').on('click', function (event) {
    event.preventDefault();
    // Destination to scroll to
    let dest = $(this).attr('href');

    // Scroll to the very top if the user selects Home
    if (dest === '#intro') {
      $('html, body').stop().animate(
        {
          scrollTop: 0,
        },
        1000
      );
    }
    // Scroll to the top of the selected nav-item, minus 20 pixels on smaller screens
    else if ($(window).width() < 768) {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(dest).offset().top - 20,
          },
          1000
        );
    }
    // Scroll to the top of the selected nav-item, minus 80 pixels on medium to bigger screens
    else {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(dest).offset().top - 80,
          },
          1000
        );
    }
  });

  // Scroll to top when you click the logo in the navbar/footer
  $('a.navbar-brand').on('click', function () {
    $('html, body').stop().animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});

/* https://stackoverflow.com/questions/29175034/jquery-scroll-top-offset-for-active-class
  Changes the active class of the current a-element in the navbar, depending on where
  you are on the page */
$(window).scroll(function () {
  onScroll();
});

function onScroll() {
  let scroll_sections = [];
  $('#navbar a').each(function () {
    scroll_sections.push($(this).attr('href'));
  });

  for (let i = 0; i < scroll_sections.length; i++) {
    if ($(scroll_sections[i]).position().top <= $(window).scrollTop() + 200) {
      $('#navbar a.active').removeClass('active');
      $('#navbar a').eq(i).addClass('active');
    }
  }
}
/* Places the navigation at the top or the bottom, depending on screen size.*/
function onResize() {
  if ($(window).width() < 751) {
    $('nav').removeClass('fixed-top');
    $('nav').addClass('fixed-bottom');
    $('#footer').removeClass('d-block');
    $('#footer').addClass('d-none');
  } else {
    $('nav').removeClass('fixed-bottom');
    $('nav').addClass('fixed-top');
    $('#footer').removeClass('d-none');
    $('#footer').addClass('d-block');
  }
}

$(window).on('resize', onResize);
