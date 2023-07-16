$(document).ready(function(){
	
	//Slides
	
	$('.container__slides').slick({
		speed: 800,
		/* adaptiveHeight: true, */
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow:'<button type="button" class="slick-prev"><img src="icons/left-solid.png" alt="left"></button>',
		nextArrow:'<button type="button" class="slick-next"><img src="icons/right-solid.png" alt="right"></button>',
		responsive: [
			{
				breakpoint: 993,
				settings: {
				 /*  dots: true, */
				  arrows: false,
				  dotsClass: 'slick-dots'
				}
			}
		]
	});

	//Catalog

	$('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
		$(this)
		  .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
		  .closest('div.container').find('div.catalog_items').removeClass('catalog_items_active').eq($(this).index()).addClass('catalog_items_active');
	  });

	$('.catalog_link').each(function(i){
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog_content').eq(i).toggleClass('catalog_content_active');
			$('.catalog_info').eq(i).toggleClass('catalog_info_active');
		});
	});

	$('.catalog_back').each(function(i){
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog_content').eq(i).toggleClass('catalog_content_active');
			$('.catalog_info').eq(i).toggleClass('catalog_info_active');
		});
	});

	//Modal

	$('[data-modal=phoneconsultation]').on('click', function() {
		$('.overlay, #phoneconsultation').fadeIn('slow');
	});

	$('.modal_close').on('click', function() {
		$('.overlay, #phoneconsultation, #order, #thanks').fadeOut('slow');
	});

	$('.catalog_btn').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal_h3').text($('.catalog_tittle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//Forms

	function valideForms(form) {
		$(form).validate ({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "ошибка",
					minlength: jQuery.validator.format("Введи {0} символа")
				},
				email: {
					  required: "We need your email to contact you",
					  email: "Your email address must be in the format of name@domain.com"
				}
			}
		});
	}

	valideForms('#checkform');
	valideForms('#phoneconsultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax ({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#phoneconsultation, #order').fadeOut();
			$('overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	//page up and scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	
	$("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    }); 

	new WOW().init();

  });

  