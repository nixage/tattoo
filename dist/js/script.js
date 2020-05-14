$(document).ready(function() {
  
  /*===========================================*/
  /*===========================================*/
  const $burger = $('.header-menu-burger');
  const $headerMenu = $('.header-menu');
  const $body = $('body')
  $burger.on('click', openMenuBurger)
  function openMenuBurger(){
  	$body.toggleClass('lock')
  	$burger.toggleClass('active')
  	$headerMenu.toggleClass('active')
  }
  /*===========================================*/
  /*===========================================*/
  /*============================================*/
  function ibg() {
    $.each($('.ibg'), function(index, val) {
      if ($(this).find('img').length > 0) {
        $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
      }
    });
  }
  ibg();
  /*============================================*/
  const arrMoveElement = [];
  if ($('*[data-move]')) {
    $.each($('*[data-move]'), function(index, element) {
      if ($(this).data('move') != '' && $(this).data('move') != null) {
        $(this).attr('data-move-index', index)
        arrMoveElement[index] = {
          'parent': $(this).parent(),
          'index': $(this).index(),
        }
      }
    })
  }

  function dynamicAdaptive() {
    const w = $(window).outerWidth();
    $.each($('*[data-move]'), function(index, el) {
      if ($(this).data('move') != '' && $(this).data('move') != null) {
        const data = $(this).data('move').split(',');
        const parent = $('.' + data[0]);
        const idx = data[1];
        const size = data[2];
        if (w < size) {
          if (!$(this).hasClass('js-move-done' + size)) {
            if (idx > 0) {
              if ($(parent).children().eq(idx - 1).length !== 0) {
                $(this).insertAfter(parent.find($(parent).children().eq(idx - 1)))
              } else {
                parent.append($(this))
              }
            } else {
              $(this).prependTo(parent)
            }
            $(this).addClass('js-move-done' + size)
          }
        } else {
          if ($(this).hasClass('js-move-done' + size)) {
            console.log(1)
            dynamicAdaptiveBack($(this))
            $(this).removeClass('js-move_done' + size);
          }
        }
      }
    })
  }

  function dynamicAdaptiveBack(el) {
    const originalIndex = el.data('move-index');
    const element = arrMoveElement[originalIndex];
    const parentElement = element['parent'];
    const indexElement = element['index'];
    if (indexElement > 0) {
      if ($(parentElement).children().eq(indexElement - 1).length !== 0) {
        el.insertAfter(parentElement.find($(parentElement).children().eq(indexElement - 1)))
      } else {
        parentElement.append(el)
      }
    } else {
      el.prependTo(parentElement)
    }
  }
  $(window).resize(function() {
    dynamicAdaptive()
  })
  dynamicAdaptive()
  /*============================================*/
  const select = $('.select');
  const selectList = $('.select__list');
  const selectTitle = $('.select__title');
  const selectInput = $('.select__input');
  select.on('click', '.select__title', function() {
    if (selectTitle.hasClass('open')) {
      selectTitle.removeClass('open')
      selectList.fadeOut()
    } else {
      selectTitle.removeClass('open');
      selectList.fadeOut();
      selectTitle.addClass('open');
      selectList.fadeIn();
    }
  })
  select.on('click', '.select__item', function() {
    selectTitle.removeClass('open');
    selectTitle.text($(this).text());
    selectTitle.addClass('selected')
    selectInput.val($(this).text());
    selectList.fadeOut();
  })
  $(document).click(function(e) {
    if (!$(e.target).closest('.select').length) {
      selectTitle.removeClass('open');
      selectList.fadeOut();
    }
  });
  /*============================================*/
  $('.parent-container').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    delegate: 'a',
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });
  /*============================================*/
  $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    gutter: 10,
    columnWidth: '.grid-sizer',
  });
  $('.grid-reverse').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    gutter: 10,
    columnWidth: '.grid-sizer',
    originLeft: false

  });
  const mainScreenButton = $('.main-screen__button');
  mainScreenButton.on('click', function(){
    $('html, body').animate({
      scrollTop: $(".contact-form").offset().top
   }, 2000);
  })
});