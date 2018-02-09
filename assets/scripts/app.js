jQuery(document).ready( function($) {
  $(document).foundation();
  $('.testify').slick({
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    speed: 800
  });
  $('.smiles').slick({
    pauseOnHover: true,
    lazyLoad: 'ondemand',
    arrows: true,
    nextArrow: '<i class="fa fa-arrow-right"></i>',
    prevArrow: '<i class="fa fa-arrow-left"></i>',
  });
});
