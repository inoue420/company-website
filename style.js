$(document).ready(function() {

  // scroll - anim anchor
  var topBtn = $('.m-pagetop');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 100);
  return false;
  });

  // inview animation - fadeinUp, slideLeft
  $('.is-fadeinUp, .is-slideLeft').addClass('u-hidden');
    $(window).scroll(function(){
    var windowHeight = $(window).height(),
        topWindow = $(window).scrollTop();
    $('.is-fadeinUp, .is-slideLeft').each(function(){
      var objectPosition = $(this).offset().top;
      if(topWindow > objectPosition - windowHeight + 130) {
        var is_fadeinUp = $(this).hasClass('is-fadeinUp'),
            is_slideLeft = $(this).hasClass('is-slideLeft');
            if (is_fadeinUp) {
              $(this).addClass('u-fadeinUp');
          } else {
              $(this).addClass('u-slideLeft');
          }
      }
    });
  });

});



$(function() {
  // burger menu
  $('.c-navIcon').click(function(){
    $(this).toggleClass('active');
    $(".c-globalNav_list").slideToggle('fast');
    return false;
  });

  // news - tab menu
  $('.c-tabPrimary_content > div').hide();
  $('.c-tabPrimary_content > div').first().slideDown();
  $('.c-tabPrimary_btn span').click(function(){
    var thisclass=$(this).attr('class');
    var active = $('.c-tabPrimary_btn span').index(this);
    $('.tab_panel').eq(active).fadeIn();
    $('.c-tabPrimary_btn span').removeClass('selected');
    $(this).addClass('selected');
    $('#is-tabFocus').removeClass().addClass('#is-tabFocus').addClass(thisclass);
    $('.c-tabPrimary_content > div').each(function(){
      if($(this).hasClass(thisclass)){
        $(this).fadeIn(800);
      }
      else{
        $(this).hide();
      }
    });
  });

  // form agree
  $('#is-submitDoc').attr("disabled","disabled");
  $('.is-agreeDoc').click(function(){
      if($(this).prop('checked') == false){
           $('#is-submitDoc').attr("disabled","disabled");
      }
      else {
          $('#is-submitDoc').removeAttr('disabled');
      }
  });
});
