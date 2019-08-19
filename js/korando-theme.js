/* Theme JS */
(function($) {
	"use strict";
	
	jQuery(document).mouseup(function (e) {
		
		var container = jQuery('.header-search .product-categories');
		if (!container.is(e.target) && container.has(e.target).length === 0 && !jQuery('.cate-toggler').is(e.target) ) { /* if the target of the click isn't the container nor a descendant of the container */
			if(jQuery('.header-search .product-categories').hasClass('open')) {
				jQuery('.header-search .product-categories').removeClass('open');
			}
		}
		
		container = jQuery('.atc-notice-wrapper');
		if (!container.is(e.target) && container.has(e.target).length === 0 ) {
			jQuery('.atc-notice-wrapper').fadeOut();
		}
		
		//hide search input if need
		container = jQuery('#searchform');
		if (!container.is(e.target) && container.has(e.target).length === 0 ) {
			jQuery("#ws").removeClass("show");
		}
	});
 
	

	//For categories menu
	var oldCateMenuH, realMMH, realCateMenuH, realLessH, realMoreH;
	
	jQuery(document).ready(function(){
		
		//Hide more button on default wp menu
		if(jQuery('.categories-menu-container').length > 0 || jQuery('.categories-menu > ul').length > 0){
			jQuery('.morelesscate').css('display', 'none');
			jQuery('.morelesscate').addClass('alwayshide');
		}
		//Hide button if number of menu is not bigger then number menu in options
		if(jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length < AlitaStore_menu_number ){
			jQuery('.morelesscate').css('display', 'none');
			jQuery('.morelesscate').addClass('alwayshide');
		}
		
		//init height
		oldCateMenuH = AlitaStore_menu_number * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight() + jQuery('.catemenu-toggler').outerHeight();
		realMMH = jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight();
		realCateMenuH = jQuery('.catemenu-toggler').outerHeight() + realMMH + jQuery('.morelesscate').outerHeight();
		
		if(jQuery('.morecate').css('display')!='none'){
			jQuery('.categories-menu').css('height', oldCateMenuH);
		} else {
			jQuery('.categories-menu').css('height', realCateMenuH);
		}
		
		//For closed menu, have to re-calculate height of elements
		jQuery('.catemenu-toggler').on('click', function(){
			
			if(jQuery('#categories').css('display')=='none'){
				jQuery('#categories').css('opacity', 0);
				jQuery('#categories').css('display', 'block');
				jQuery('#categories').animate({'opacity': 1}, 100, function(){
					if(!jQuery('.morelesscate').hasClass('alwayshide')){
						jQuery('.morelesscate').fadeIn('fast');
					}
					//update height
					oldCateMenuH = AlitaStore_menu_number * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight() + jQuery('.catemenu-toggler').outerHeight();
					realMMH = jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight();
					realCateMenuH = jQuery('.catemenu-toggler').outerHeight() + realMMH + jQuery('.morelesscate').outerHeight();
					
					if(jQuery('.morecate').css('display')=='none'){
						jQuery('.categories-menu').css({'height': realCateMenuH});
					} else {
						jQuery('.categories-menu').css({'height': oldCateMenuH});
					}
				});
			} else {
				jQuery('#categories').animate({'opacity': 0}, 200, function(){
					jQuery('#categories').css('display', 'none');
					jQuery('.morelesscate').css('display', 'none');
					//update height
					oldCateMenuH = AlitaStore_menu_number * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight() + jQuery('.catemenu-toggler').outerHeight();
					realMMH = jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length * jQuery('#categories ul.mega_main_menu_ul > li').outerHeight();
					realCateMenuH = jQuery('.catemenu-toggler').outerHeight() + realMMH + jQuery('.morelesscate').outerHeight();
					
					if(jQuery('.morecate').css('display')=='none'){
						jQuery('.categories-menu').css({'height': realCateMenuH});
					} else {
						jQuery('.categories-menu').css({'height': oldCateMenuH});
					}
				});
			}
			//for default wordpress menu (not selected menu location)
			if(jQuery('.categories-menu > ul').css('display')=='none'){
				jQuery('.categories-menu > ul').css('display', 'block');
			} else {
				jQuery('.categories-menu > ul').css('display', 'none');
			}
			// for default wordpress menu (selected menu location)
			if(jQuery('.categories-menu-container').css('display')=='none'){
				jQuery('.categories-menu-container').css('display', 'block');
			} else {
				jQuery('.categories-menu-container').css('display', 'none');
			}
		});
			//hide items out of height
		var catemidx = 1;
		jQuery('#categories ul.mega_main_menu_ul > li').each(function(){
			if( catemidx > AlitaStore_menu_number && jQuery('.morecate').css('display')!='none'){
				jQuery(this).css('display', 'none');
				jQuery(this).addClass('mhide');
			}
			catemidx++;
		});
			//More categories click
		jQuery('.morelesscate').on('click', function() {
			
			oldCateMenuH = AlitaStore_menu_number * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight() + jQuery('.catemenu-toggler').outerHeight();
			realMMH = jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length * jQuery('#categories ul.mega_main_menu_ul > li').outerHeight();
			realCateMenuH = jQuery('.catemenu-toggler').outerHeight() + realMMH + jQuery('.morelesscate').outerHeight();
			realMoreH =  oldCateMenuH - jQuery('.catemenu-toggler').outerHeight();
			realLessH = realCateMenuH - jQuery('.catemenu-toggler').outerHeight();
			if(jQuery('.morecate').css('display')=='none'){ /* opened menu */
				jQuery('.categories-menu').css('overflow', 'hidden');
				jQuery('.categories-menu').animate({'height': oldCateMenuH}, function(){
					jQuery('.morecate').css('display', 'block');
					jQuery('.lesscate').css('display', 'none');
					jQuery('.categories-menu').css('overflow', 'visible');
					jQuery('.mhide').css('display', 'none'); 
				}); 
				jQuery('#categories > .menu_holder .menu_inner').animate({'height': realMoreH});
				
			} else { /* closed menu */
				jQuery('.categories-menu').css('overflow', 'hidden');
				jQuery('.mhide').css('display', 'block');
				jQuery('.categories-menu').animate({'height': realCateMenuH}, function(){
					jQuery('.morecate').css('display', 'none');
					jQuery('.lesscate').css('display', 'block');
					jQuery('.categories-menu').css('overflow', 'visible');
				});
				jQuery('#categories > .menu_holder .menu_inner').animate({'height': realLessH});
			}
		});

		  
		//Header Search by category
		var cateToggler = jQuery('.cate-toggler');
		
		jQuery('.header-search .product-categories').prepend('<li><a href="'+jQuery('#searchform').attr('action')+'">'+cateToggler.html()+'</a></li>');
		
		cateToggler.on('click', function(){
			jQuery('.header-search .product-categories').toggleClass('open');
		});

		//my account
		jQuery('.top-menu').mouseenter(function(){

			jQuery('.top-menu ul')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			jQuery('.top-menu ul')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
		
		//language
		jQuery('.switcher .language').mouseenter(function(){

			jQuery('.switcher .language #lang_sel ul > li ul')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			jQuery('.switcher .language #lang_sel ul > li ul')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
		
		//currency
		jQuery('.switcher .currency').mouseenter(function(){

			jQuery('.switcher .currency .wcml-cs-submenu')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			jQuery('.switcher .currency .wcml-cs-submenu')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
		 
		//height body
		var heightbody = jQuery('body').height();
		if( heightbody < jQuery(window).height() ) {
			jQuery('body').addClass('small-body');
		} else {
			jQuery('body').removeClass('small-body');
		} 
		
		// Show/hide search input
		jQuery("#wsearchsubmit").on('click',function(){
			if(jQuery("#ws").width()==0){
				if(jQuery("#ws").hasClass("show")){
					jQuery("#ws").removeClass("show");
				} else {
					jQuery("#ws").addClass("show");
					return false;
				}
			}
		});
		// Search Top
		jQuery('.search-dropdown .widget_product_search').on('mouseover', function() {
			jQuery(this).find('#searchform').stop(true, true).slideDown();
		});
		jQuery('.search-dropdown .widget_product_search').on('mouseleave', function() {
			// jQuery(this).find('#searchform').stop(true, true).slideUp();
		});
		jQuery('.search-dropdown .widget_search').on('mouseover', function() {
			jQuery(this).find('#blogsearchform').stop(true, true).slideDown();
		});
		jQuery('.search-dropdown .widget_search').on('mouseleave', function() {
			// jQuery(this).find('#blogsearchform').stop(true, true).slideUp();
		});
		
		//Vertical dropdown menu 
		jQuery('.vmenu-toggler').on('mouseover', function() {
			jQuery(this).find('.vmenu-content').stop(true, true).slideDown();
		});
		jQuery('.vmenu-toggler').on('mouseleave', function() {
			jQuery(this).find('.vmenu-content').stop(true, true).slideUp();
		});
		
		//Horizontal dropdown menu
			//default, not selected locations
		jQuery('.horizontal-menu .nav-menu > ul').superfish({
			delay: 100,
			speed: 'fast'
		});
			//default, selected locations
		jQuery('.primary-menu-container ul.nav-menu').superfish({
			delay: 100,
			speed: 'fast'
		});
		
		//Mobile Menu
		var mobileMenuWrapper = jQuery('.mobile-menu-container');
		mobileMenuWrapper.find('.menu-item-has-children').each(function(){
			var linkItem = jQuery(this).find('a').first();
			linkItem.after('<i class="fa fa-angle-right"></i>');
		});
		//calculate the init height of menu
		var totalMenuLevelFirst = jQuery('.mobile-menu-container .nav-menu > li').length;
		var mobileMenuH = totalMenuLevelFirst*40 + 10; //40 is height of one item, 10 is padding-top + padding-bottom;
		
		jQuery('.mbmenu-toggler .mbmenu-icon').on('click', function(){
			if(jQuery('.mobile-menu-container').length == 0){
				var mobileMenuHi = jQuery('.mobile-menu div.nav-menu > ul').outerHeight();
				if(jQuery('.mobile-menu div.nav-menu').outerHeight() == 0) {
					jQuery('.mobile-menu div.nav-menu').animate({'height': mobileMenuHi}, 'fast');
				} else {
					jQuery('.mobile-menu div.nav-menu').animate({'height': 0}, 'fast');
				}
			}
			if(mobileMenuWrapper.hasClass('open')) {
				mobileMenuWrapper.removeClass('open');
				mobileMenuWrapper.animate({'height': 0}, 'fast');
			} else {
				mobileMenuWrapper.addClass('open');
				mobileMenuWrapper.animate({'height': mobileMenuH}, 'fast');
			}
		});
			//set the height of all li.menu-item-has-children items
		jQuery('.mobile-menu-container li.menu-item-has-children').each(function(){
			jQuery(this).css({'height': 40, 'overflow': 'hidden'});
		});
			//process the parent items
		jQuery('.mobile-menu-container li.menu-item-has-children').each(function(){
			var parentLi = jQuery(this);
			var dropdownUl = parentLi.find('ul.sub-menu').first();
			
			parentLi.find(' > .fa').first().on('click', function(){
				//set height is auto for all parents dropdown
				parentLi.parents('li.menu-item-has-children').css('height', 'auto');
				//set height is auto for menu wrapper
				mobileMenuWrapper.css({'height': 'auto'});
				
				var dropdownUlheight = dropdownUl.outerHeight() + 40;
				
				if(parentLi.hasClass('opensubmenu')) {
					parentLi.removeClass('opensubmenu');
					parentLi.animate({'height': 40}, 'fast', function(){
						//calculate new height of menu wrapper
						mobileMenuH = mobileMenuWrapper.outerHeight();
					});
					parentLi.find('> .fa').first().removeClass('fa-angle-down');
					parentLi.find('> .fa').first().addClass(' fa-angle-right');
				} else {
					parentLi.addClass('opensubmenu');
					parentLi.animate({'height': dropdownUlheight}, 'fast', function(){
						//calculate new height of menu wrapper
						mobileMenuH = mobileMenuWrapper.outerHeight();
					});
					parentLi.find('> .fa').first().addClass('fa-angle-down');
					parentLi.find('> .fa').first().removeClass(' fa-angle-right');
				}
				
			});
		});
		
		//Setting
		jQuery('.setting').mouseenter(function(){

			jQuery('.setting .setting-content')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			jQuery('.setting .setting-content')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
		
		//Mini Cart
		if(jQuery(window).width() > 1024){

			jQuery('.widget_shopping_cart').mouseenter(function(){

				jQuery('.widget_shopping_cart .mini_cart_content')
					.css('display', 'block')
					.addClass('animated-fast fadeInUpMenu');

			}).mouseleave(function(){
				jQuery('.widget_shopping_cart .mini_cart_content')
					.css('display', 'none')
					.removeClass('animated-fast fadeInUpMenu');
			});
			 
		}

		//footer

		if (jQuery(window).width() < 992) {   
			var elementClick = '.footer .current';
			var elementSlide =  '.toogle-content';
			var activeClass = 'active';

			jQuery(elementClick).on('click', function(e){
				e.stopPropagation();
				var subUl = jQuery(this).next(elementSlide);
				if(subUl.is(':hidden'))
				{
					subUl.slideDown();
					jQuery(this).addClass(activeClass);
				}
				else
				{
					subUl.slideUp();
					jQuery(this).removeClass(activeClass);
				}
				jQuery(elementClick).not(this).next(elementSlide).slideUp();
				jQuery(elementClick).not(this).removeClass(activeClass);
				e.preventDefault();
			});

			jQuery(elementSlide).on('click', function(e){
				e.stopPropagation();
			});

			jQuery(document).on('click', function(e){
				e.stopPropagation();
				var elementHide = jQuery(elementClick).next(elementSlide);
				jQuery(elementHide).slideUp();
				jQuery(elementClick).removeClass('active');
			}); 
 		};
			//For tablet & mobile
		jQuery('.widget_shopping_cart').on('click', function(event){
			if(jQuery(window).width() < 1024){
				var closed = false;
				var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
				var mCartToggler = jQuery('.cart-toggler');
				if(jQuery('.mini_cart_content').height() == 0 ) {
					closed = true;
				}
				if (mCartToggler.is(event.target) || mCartToggler.has(event.target).length != 0 || mCartToggler.is(event.target) ) {
					event.preventDefault();
					if(closed) {
						jQuery('.mini_cart_content').animate({'height': mCartHeight});
						closed = false;
					} else {
						jQuery('.mini_cart_content').animate({'height':'0'}, function(){
							closed = true;
						});
					}
				}
			}
		});
		
		//add to cart callback
		jQuery('body').append('<div class="atc-notice-wrapper"><div class="atc-notice"></div><div class="close"><i class="fa fa-times-circle"></i></div></div>');
		jQuery('.atc-notice-wrapper .close').on('click', function(){
			jQuery('.atc-notice-wrapper').fadeOut();
			jQuery('.atc-notice').html('');
		});
		var ajaxPId = 0;
		jQuery('body').on( 'adding_to_cart', function(event, button, data) {
			ajaxPId = button.attr('data-product_id');
		});
		jQuery('body').on( 'added_to_cart', function(event, fragments, cart_hash) {
			//get product info by ajax
			jQuery.post(
				ajaxurl, 
				{
					'action': 'get_productinfo',
					'data':   {'pid': ajaxPId}
				},
				function(response){
					jQuery('.atc-notice').html(response);
					//show product info after added
					jQuery('.atc-notice-wrapper').fadeIn();
				}
			);
		});
		
		//Product images on details page
		jQuery('.single-images').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			fade: true,
			asNavFor: '.single-thumbnails'
		});
		jQuery('.single-thumbnails').slick({
			asNavFor: '.single-images',
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			centerMode: true,
			focusOnSelect: true
		});
		
		//Thumbnails click
		jQuery('a.yith_magnifier_thumbnail').live('click', function(){
			jQuery('a.yith_magnifier_thumbnail').removeClass('active');
			jQuery(this).addClass('active');
		});
		
		// Shop toolbar sort
		jQuery('.toolbar .orderby').chosen({disable_search: true, width: "auto"});
		//currency switcher
		//jQuery('.wcml_currency_switcher').chosen({disable_search: true, width: "auto"});
		
		//Brand logos
		jQuery('.brand-logo .brands-carousel').each(function(){
			var AlitaStore_brandcols = jQuery(this).attr('data-col'); 
			jQuery(this).owlCarousel({
				infinite: true,  
				slideSpeed: AlitaStore_brandanimate, 
				autoPlay: AlitaStore_brandscroll, 
				items: 5, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [980,4],
			    itemsTablet: [768,3],
			    itemsTabletSmall: false,
			    itemsMobile : [479,2], 
			    addClassActive: true,
			    navigation : false,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		});
		//Brand logos2
		jQuery('.brand-logo2 .brands-carousel').each(function(){
			var AlitaStore_brandcols = jQuery(this).attr('data-col'); 
			jQuery(this).owlCarousel({
				infinite: true,  
				slideSpeed: AlitaStore_brandanimate, 
				autoPlay: AlitaStore_brandscroll, 
				items: 4, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [980,4],
			    itemsTablet: [768,3],
			    itemsTabletSmall: false,
			    itemsMobile : [479,2], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		});

		// Brand Logo vertical
		jQuery('.brand-vertical .brands-carousel').slick({
		    autoplay: false,
		    arrows: true,
		    dots: false,
		    slidesToShow: 3, 
		    draggable: false,
		    infinite: true,
		    pauseOnHover: false,
		    swipe: false,
		    touchMove: false,
		    vertical: true,
		    speed: 1000,
		    autoplaySpeed: 2000, 
		    responsive: [ 
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
				  	vertical: false,
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	vertical: false,
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
				  	vertical: false,
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				}
			]
		  });


		//Categories carousel
		jQuery('.popular-categories .categories-carousel').each(function(){
			var AlitaStore_categoriescols = jQuery(this).attr('data-col'); 
			jQuery(this).owlCarousel({
				infinite: true,  
				autoPlay: false,  
				slideSpeed: AlitaStore_categoriesanimate, 

				items: 4, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [992,3],
			    itemsTablet: [767,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,2], 
			    addClassActive: true,
			    navigation : false,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		});

		// products carousel vertical
		jQuery('.slider-vertical .shop-products').slick({
		    autoplay: false,
		    arrows: true,
		    dots: false,
		    slidesToShow: 3, 
		    draggable: false,
		    infinite: true,
		    pauseOnHover: false,
		    swipe: false,
		    touchMove: false,
		    vertical: true,
		    speed: 1000,
		    autoplaySpeed: 2000, 
		    responsive: [ 
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
				  	vertical: false,
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	vertical: false,
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
				  	vertical: false,
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		  }); 

		// products carousel vertical
		jQuery('.slider-vertical2 .shop-products').slick({
		    autoplay: false,
		    arrows: true,
		    dots: false,
		    slidesToShow: 2, 
		    draggable: false,
		    infinite: true,
		    pauseOnHover: false,
		    swipe: false,
		    touchMove: false,
		    vertical: true,
		    speed: 1000,
		    autoplaySpeed: 2000, 
		    responsive: [ 
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
				  	vertical: false,
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	vertical: false,
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
				  	vertical: false,
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		  }); 

		// products carousel vertical
		jQuery('.slider-vertical3 .shop-products').slick({
		    autoplay: false,
		    arrows: true,
		    dots: false,
		    slidesToShow: 3, 
		    draggable: false,
		    infinite: true,
		    pauseOnHover: false,
		    swipe: false,
		    touchMove: false,
		    vertical: true,
		    speed: 1000,
		    autoplaySpeed: 2000, 
		    responsive: [ 
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
				  	vertical: false,
					slidesToShow: 3,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	vertical: false,
					slidesToShow: 2,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
				  	vertical: false,
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		  }); 
 
	      
	    
		// Countdown 
		jQuery(".countdownsale").TimeCircles({
		    "animation": "smooth",
		    "bg_width": 1,
		    "fg_width": 0.01,
		    "circle_bg_color": "#fff",
		    "time": {
		        "Days": {
		            "text": "Days",
		            "color": "#6c8e01",
		            "show": true
		        },
		        "Hours": {
		            "text": "Hours",
		            "color": "#6c8e01",
		            "show": true
		        },
		        "Minutes": {
		            "text": "Minutes",
		            "color": "#6c8e01",
		            "show": true
		        },
		        "Seconds": {
		            "text": "Seconds",
		            "color": "#6c8e01",
		            "show": true
		        }
		    }
		});
		//jQuery(".countdownsale").TimeCircles().stop(); 
 
		jQuery('.countbox.hastime').each(function(){
			var countTime = jQuery(this).attr('data-time');
			
			jQuery(this).countdown(countTime, function(event) {
				jQuery(this).html(
					'<span class="timebox day"><span class="box-inner"><strong>'+event.strftime('%D')+'</strong>Days</span></span><span class="timebox hour"><span class="box-inner"><strong>'+event.strftime('%H')+'</strong>Hours</span></span><span class="timebox minute"><span class="box-inner"><strong>'+event.strftime('%M')+'</strong>Mins</span></span><span class="timebox second"><span class="box-inner"><strong>'+event.strftime('%S')+'</strong>Secs</span></span>'
				);
			});
			//jQuery(this).countdown('stop');
		});
		
		
		//Product Tabs
		// layout1
		window.setTimeout(function(){
			var tabCount = 1;
			var tabTotal = jQuery('.home-tabs .wpb_content_element').length;
			jQuery('.home-tabs').prepend('<div class="title-container"><ul class="home-tabs-title"></ul></div>');
			var tabTitle = jQuery('.home-tabs .home-tabs-title');
			jQuery('.home-tabs .wpb_content_element').each(function(){
				var tabClass = '';
				var tabLinkClass = '';
				var tabWidget = jQuery(this).next('.woocommerce');
				tabWidget.addClass('product-tabs');
				var widgetTitle = jQuery(this).find('h3').html();
				tabWidget.attr('id', 'wpb_content_element-'+tabCount);
				
				if(tabCount==1) {
					tabClass = 'first';
					tabLinkClass = 'active';
					
					tabWidget.addClass('active');
					
					//first tab carousel
					roadtabCarousel('#wpb_content_element-'+tabCount+' .shop-products', 5, 4, 3, 2, 2, 1);
				} else {
					tabWidget.addClass('heightzero');
				}
				if(tabCount == tabTotal) {
					tabClass = 'last';
				}
				
				tabTitle.append('<li class="'+tabClass+'"><a class="tab-link '+tabLinkClass+'" href="#" rel="wpb_content_element-'+tabCount+'">'+widgetTitle+'</a></li>');
				
				tabCount++;
				
				//tab click
				jQuery('.home-tabs .tab-link').each(function(){
					jQuery(this).on('click', function(event){
						event.preventDefault();
						var tabRel = jQuery(this).attr('rel');
						
						jQuery('.home-tabs .tab-link').removeClass('active');
						jQuery(this).addClass('active');
						
						jQuery('.home-tabs .product-tabs.active').fadeOut(300, function(){
							jQuery('.home-tabs .product-tabs').addClass('heightzero');
							jQuery('#'+tabRel).removeClass('heightzero');
							jQuery(this).fadeIn(300);
						});
						jQuery('.home-tabs .product-tabs').removeClass('active');
						jQuery('#'+tabRel).addClass('active');
						
						//make carousel
						roadtabCarousel('#'+tabRel+' .shop-products', 5, 4, 3, 2, 2, 1);
					});
				});
			});
		}, 1000 );

		//Product Tabs
		// layout2
		window.setTimeout(function(){
			var tabCount = 1;
			var tabTotal = jQuery('.home-tabs2 .wpb_content_element').length;
			jQuery('.home-tabs2').prepend('<div class="title-container"><ul class="home-tabs-title"></ul></div>');
			var tabTitle = jQuery('.home-tabs2 .home-tabs-title');
			jQuery('.home-tabs2 .wpb_content_element').each(function(){
				var tabClass = '';
				var tabLinkClass = '';
				var tabWidget = jQuery(this).next('.woocommerce');
				tabWidget.addClass('product-tabs');
				var widgetTitle = jQuery(this).find('h3').html();
				tabWidget.attr('id', 'wpb_content_element-'+tabCount);
				
				if(tabCount==1) {
					tabClass = 'first';
					tabLinkClass = 'active';
					
					tabWidget.addClass('active');
					
					//first tab carousel
					roadtabCarousel('#wpb_content_element-'+tabCount+' .shop-products', 5, 5, 4, 3, 2, 1);
				} else {
					tabWidget.addClass('heightzero');
				}
				if(tabCount == tabTotal) {
					tabClass = 'last';
				}
				
				tabTitle.append('<li class="'+tabClass+'"><a class="tab-link '+tabLinkClass+'" href="#" rel="wpb_content_element-'+tabCount+'">'+widgetTitle+'</a></li>');
				
				tabCount++;
				
				//tab click
				jQuery('.home-tabs2 .tab-link').each(function(){
					jQuery(this).on('click', function(event){
						event.preventDefault();
						var tabRel = jQuery(this).attr('rel');
						
						jQuery('.home-tabs2 .tab-link').removeClass('active');
						jQuery(this).addClass('active');
						
						jQuery('.home-tabs2 .product-tabs.active').fadeOut(300, function(){
							jQuery('.home-tabs2 .product-tabs').addClass('heightzero');
							jQuery('#'+tabRel).removeClass('heightzero');
							jQuery(this).fadeIn(300);
						});
						jQuery('.home-tabs2 .product-tabs').removeClass('active');
						jQuery('#'+tabRel).addClass('active');
						
						//make carousel
						roadtabCarousel('#'+tabRel+' .shop-products', 5, 5, 4, 3, 2, 1);
					});
				});
			});
		}, 1000 );

		//Product Tabs
		// layout3
		window.setTimeout(function(){
			var tabCount = 1;
			var tabTotal = jQuery('.home-tabs3 .wpb_content_element').length;
			jQuery('.home-tabs3').prepend('<div class="title-container"><ul class="home-tabs-title"></ul></div>');
			var tabTitle = jQuery('.home-tabs3 .home-tabs-title');
			jQuery('.home-tabs3 .wpb_content_element').each(function(){
				var tabClass = '';
				var tabLinkClass = '';
				var tabWidget = jQuery(this).next('.woocommerce');
				tabWidget.addClass('product-tabs');
				var widgetTitle = jQuery(this).find('h3').html();
				tabWidget.attr('id', 'wpb_content_element-3'+tabCount);
				
				if(tabCount==1) {
					tabClass = 'first';
					tabLinkClass = 'active';
					
					tabWidget.addClass('active');
					
					//first tab carousel
					roadtabCarousel('#wpb_content_element-3'+tabCount+' .shop-products', 4, 4, 4, 3, 2, 1);
				} else {
					tabWidget.addClass('heightzero');
				}
				if(tabCount == tabTotal) {
					tabClass = 'last';
				}
				
				tabTitle.append('<li class="'+tabClass+'"><a class="tab-link '+tabLinkClass+'" href="#" rel="wpb_content_element-3'+tabCount+'">'+widgetTitle+'</a></li>');
				
				tabCount++;
				
				//tab click
				jQuery('.home-tabs3 .tab-link').each(function(){
					jQuery(this).on('click', function(event){
						event.preventDefault();
						var tabRel = jQuery(this).attr('rel');
						
						jQuery('.home-tabs3 .tab-link').removeClass('active');
						jQuery(this).addClass('active');
						
						jQuery('.home-tabs3 .product-tabs.active').fadeOut(300, function(){
							jQuery('.home-tabs3 .product-tabs').addClass('heightzero');
							jQuery('#'+tabRel).removeClass('heightzero');
							jQuery(this).fadeIn(300);
						});
						jQuery('.home-tabs3 .product-tabs').removeClass('active');
						jQuery('#'+tabRel).addClass('active');
						
						//make carousel
						roadtabCarousel('#'+tabRel+' .shop-products', 4, 4, 4, 3, 2, 1);
					});
				});
			});
		}, 1000 ); 
		
		//Products carousel  
		jQuery('.products-carousel .shop-products').each(function(){ 
			var owljt = jQuery(this).owlCarousel({   
			    items: 4, 
			    itemsDesktop : [1199,3],
			    itemsDesktopSmall : [991,3],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false, 
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
			owljt = jQuery(this).data('owlCarousel');
			owljt.jumpTo(2); 
		}); 

		//Products carousel2 
		jQuery('.products-carousel2 .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 2, 
			    itemsDesktop : [1199,2],
			    itemsDesktopSmall : [991,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		//Products carousel3
		jQuery('.products-carousel3 .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 3, 
			    itemsDesktop : [1199,2],
			    itemsDesktopSmall : [991,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		//Products carousel4
		jQuery('.products-carousel5 .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 5, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [991,3],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		//Products carousel6
		jQuery('.products-carousel6 .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 6, 
			    itemsDesktop : [1500,5],
			    itemsDesktopSmall : [1200,4],
			    itemsTablet: [991,3],
			    itemsTabletSmall: [767,2],
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		});   

		//Products carousel1  
		jQuery('.products-carousel1 .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 1, 
			    itemsDesktop : [1199,1],
			    itemsDesktopSmall : [991,1],
			    itemsTablet: [768,1],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		 

		//Latest posts carousel 
		jQuery('.latest-posts .posts-carousel').each(function(){
			var AlitaStore_postcols = jQuery(this).attr('data-col');
			jQuery(this).owlCarousel({   
			    items: 3, 
			    itemsDesktop : [1199,3],
			    itemsDesktopSmall : [992,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: [600,2],
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation: true,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
			    }
			});
		});

		//Latest posts carousel 
		jQuery('.latest-posts1 .posts-carousel').each(function(){
			var AlitaStore_postcols = jQuery(this).attr('data-col');
			jQuery(this).owlCarousel({   
			    items: 1, 
			    itemsDesktop : [1199,1],
			    itemsDesktopSmall : [992,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: [600,1],
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation: true,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
			    }
			});
		});
		 
		//Latest posts carousel 
		jQuery('.latest-posts4 .posts-carousel').each(function(){
			var AlitaStore_postcols = jQuery(this).attr('data-col');
			jQuery(this).owlCarousel({   
			    items: 4, 
			    itemsDesktop : [1199,3],
			    itemsDesktopSmall : [992,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: [600,1],
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation: true,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
			    }
			});
		});
		 

		jQuery('.testimonials-container .testimonials-list').each(function(){
			var AlitaStore_postcols = jQuery(this).attr('data-col');
			jQuery(this).owlCarousel({   
			    items: 1, 
			    itemsDesktop : [1199,1],
			    itemsDesktopSmall : [992,1],
			    itemsTablet: [768,1],
			    itemsTabletSmall: [600,1],
			    itemsMobile : [479,1], 
			    addClassActive: true, 
			    navigation : false,
			    autoPlay: AlitaStore_testiscroll,
			    slideSpeed: AlitaStore_testianimate,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
			    	this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active'); 
			    }
			});
		});

		jQuery('.testimonials-container2 .testimonials-list').each(function(){
			var AlitaStore_postcols = jQuery(this).attr('data-col');
			jQuery(this).owlCarousel({   
			    items: 3, 
			    itemsDesktop : [1199,3],
			    itemsDesktopSmall : [992,2],
			    itemsTablet: [768,2],
			    itemsTabletSmall: [600,1],
			    itemsMobile : [479,1], 
			    addClassActive: true, 
			    navigation : true,
			    autoPlay: AlitaStore_testiscroll,
			    slideSpeed: AlitaStore_testianimate,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
			    	this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active'); 
			    }
			});
		});
		
		//Cross-sells Products carousel
		jQuery('.cross-sells .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 4, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [992,3],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		
		//Image zoom
		jQuery('.zoom_in_marker').on('click', function(){
			jQuery.fancybox({
				href: jQuery('.woocommerce-main-image').attr('href'),
				openEffect: 'elastic',
				closeEffect: 'elastic'
			});
		});
		
		//Upsells Products carousel
		jQuery('.upsells .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 5, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [992,3],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		
		//Related Products carousel
		jQuery('.related .shop-products').each(function(){ 
			jQuery(this).owlCarousel({   
			    items: 5, 
			    itemsDesktop : [1199,4],
			    itemsDesktopSmall : [992,3],
			    itemsTablet: [768,2],
			    itemsTabletSmall: false,
			    itemsMobile : [479,1], 
			    addClassActive: true,
			    navigation : true,
			    pagination : false,
				afterAction: function(el){
			       	this.$owlItems.removeClass('last-active');
			        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');
			        this.$owlItems.removeClass('first-active');
			        this.$owlItems .eq(this.currentItem).addClass('first-active');  
			    }
			});
		}); 
		//Category view mode
		jQuery('.view-mode').each(function(){
			jQuery(this).find('.grid').on('click', function(event){
				event.preventDefault();
				
				jQuery('.view-mode').find('.grid').addClass('active');
				jQuery('.view-mode').find('.list').removeClass('active');
				
				jQuery('#archive-product .shop-products').removeClass('list-view');
				jQuery('#archive-product .shop-products').addClass('grid-view');
				
				jQuery('#archive-product .list-col4').removeClass('col-xs-12 col-sm-4');
				jQuery('#archive-product .list-col8').removeClass('col-xs-12 col-sm-8');
			});
			jQuery(this).find('.list').on('click', function(event){
				event.preventDefault();
			
				jQuery('.view-mode').find('.list').addClass('active');
				jQuery('.view-mode').find('.grid').removeClass('active');
				
				jQuery('#archive-product .shop-products').addClass('list-view');
				jQuery('#archive-product .shop-products').removeClass('grid-view');
				
				jQuery('#archive-product .list-col4').addClass('col-xs-12 col-sm-4');
				jQuery('#archive-product .list-col8').addClass('col-xs-12 col-sm-8');
			});
		});
		
		//Tooltip
		jQuery('.yith-wcwl-add-to-wishlist a').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		var compareText = jQuery('.single-product-info .compare').html();
		jQuery('.single-product-info .compare').html('<span class="comparetip">'+compareText+'</span>');
		jQuery('.comparetip').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		jQuery('.compare-button a').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		jQuery('.add_to_cart_inline a').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		jQuery('.quickviewbtn .quickview').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		jQuery('.sharefriend a').each(function(){
			AlitaStoretip(jQuery(this), 'html');
		});
		jQuery('.social-icons a').each(function(){
			AlitaStoretip(jQuery(this), 'title');
		});
		
		//Quickview
		jQuery('.product-wrapper').each(function(){
			
			jQuery(this).on('mouseover click', function(){
				jQuery(this).addClass('hover');
			});
			jQuery(this).on('mouseleave', function(){
				jQuery(this).removeClass('hover');
			});
		});
			//Add quick view box
		jQuery('body').append('<div class="quickview-wrapper"><span class="qvbtn qvprev"><i class="fa fa-caret-left"></i></span><span class="qvbtn qvnext"><i class="fa fa-caret-right"></i></span><div class="quick-modal"><span class="qvloading"></span><span class="closeqv"><i class="fa fa-times"></i></span><div id="quickview-content"></div><div class="clearfix"></div></div></div>');
			
			//quick view id array
			var arrIdx = 0;
			var quickviewArr = Array();
			var nextArrID = 0;
			var prevArrID = 0;
			
		//show quick view
		jQuery('.quickview').each(function(){
			var quickviewLink = jQuery(this);
			var productID = quickviewLink.attr('data-quick-id');
			
			if(quickviewArr.indexOf(productID) == -1){
				quickviewArr[arrIdx] = productID;
				arrIdx++;
			}
			quickviewLink.on('click', function(event){
				event.preventDefault();
				
				prevArrID = quickviewArr[quickviewArr.indexOf(productID) - 1];
				nextArrID = quickviewArr[quickviewArr.indexOf(productID) + 1];
				
				jQuery('.qvprev').attr('data-quick-id', prevArrID);
				jQuery('.qvnext').attr('data-quick-id', nextArrID);
				
				showQuickView(productID, quickviewArr);
			});
		});
		jQuery('.qvprev').on('click', function(){
			showQuickView(jQuery(this).attr('data-quick-id'), quickviewArr);
		});
		jQuery('.qvnext').on('click', function(){
			showQuickView(jQuery(this).attr('data-quick-id'), quickviewArr);
		});
		
		jQuery('.closeqv').on('click', function(){
			hideQuickView();
		});
		
		//Fancy box
		jQuery(".fancybox").fancybox({
			openEffect: 'elastic',
			closeEffect: 'fade',
			beforeShow: function () {
				if (this.title) {
					// New line
					this.title += '<div class="fancybox-social">';
					
					// Add tweet button
					this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';
					
					// Add FaceBook like button
					this.title += '<iframe src="//www.facebook.com/plugins/like.php?href=' + this.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowTransparency="true"></iframe></div>';
				}
			},
			afterShow: function() {
				// Render tweet button
				twttr.widgets.load();
			},
			helpers:  {
				title : {
					type : 'inside'
				},
				overlay : {
					showEarly : false
				}
			}
		});
		
		//Fancy box for single project
		jQuery(".prfancybox").fancybox({
			openEffect: 'fade',
			closeEffect: 'elastic',
			nextEffect: 'fade',
			prevEffect: 'fade',
			helpers:  {
				title : {
					type : 'inside'
				},
				overlay : {
					showEarly : false
				},
				buttons	: {},
				thumbs	: {
					width	: 100,
					height	: 100
				}
			}
		});
		
		//Counter up
		jQuery('.counter-number span').counterUp({
			delay: 10,
			time: 1000
		});
		
		//Go to top
		jQuery('#back-top').on('click', function(){
			jQuery("html, body").animate({ scrollTop: 0 }, "slow");
		});
		
		//Vertical menu on home 6
		jQuery('.collapse-menu .menu li.menu-item-has-children > a').each(function(){
			jQuery(this).after('<i class="fa fa-chevron-right"></i>');
		});
		jQuery('.collapse-menu .menu li.menu-item-has-children > .fa').each(function(){
			
			jQuery(this).on('click', function(){
				var element = jQuery(this).parent('li');
		
				if (element.hasClass('open')) {
					element.removeClass('open');
					element.find('li').removeClass('open');
					element.find('ul').slideUp();
				} else {
					element.addClass('open');
					element.children('ul').slideDown();
					element.siblings('li').children('ul').slideUp();
					element.siblings('li').removeClass('open');
					element.siblings('li').find('li').removeClass('open');
					element.siblings('li').find('ul').slideUp();
				}
			});
		});
		//end - vertical menu on home 6
		
		//Landing tabs
		jQuery('.landing-link a').each(function(){
			var menulinkID = jQuery(this).attr('href');
			
			if(jQuery(menulinkID).length > 0){
				var targetOffset = jQuery(menulinkID).offset().top;
			
				jQuery(this).on('click', function(event){
					event.preventDefault();
					
					jQuery("html, body").animate({ scrollTop: targetOffset }, "slow");
				});
			}
		});
		//Sticky header
			//add a space for header
		if(AlitaStore_sticky_header==true && jQuery('.header-sticky').length > 0){
			var headerSpaceH = jQuery('.header-sticky').height();
			jQuery('.header-sticky').after('<div class="headerSpace" style="height: '+headerSpaceH+'px;"></div>');
		}
	});
	
	// Scroll
	var currentP = 0;
	var stickyOffset = 0;
	if(AlitaStore_sticky_header==true && jQuery('.header-sticky').length > 0){
		stickyOffset = jQuery('.header-sticky').offset().top;
		stickyOffset += jQuery('.header-sticky').outerHeight();
	}
	jQuery(window).scroll(function(){
		var headerH = jQuery('.header-container').height();
		var scrollP = jQuery(window).scrollTop();
		
		if(jQuery(window).width() > 1024){
			if(scrollP != currentP){
				//Back to top
				if(scrollP >= headerH){
					jQuery('#back-top').addClass('show');
				} else {
					jQuery('#back-top').removeClass('show');
				}
				//Sticky header
				if(AlitaStore_sticky_header==true && jQuery('.header-sticky').length > 0){
					
					if(scrollP >= stickyOffset){
						jQuery('#back-top').addClass('show');
						jQuery('.header-sticky').addClass('ontop');
						jQuery('.headerSpace').addClass('show');
						jQuery('.logo-scroll').show();
						jQuery('.hide-scroll').hide();
					} else {
						jQuery('#back-top').removeClass('show');
						jQuery('.header-sticky').removeClass('ontop show');
						jQuery('.headerSpace').removeClass('show');
						jQuery('.hide-scroll').show();
						jQuery('.logo-scroll').hide();
					}
					if(scrollP >= (stickyOffset+20)){
						jQuery('.header-sticky').addClass('show');
					}
				}
				currentP = jQuery(window).scrollTop();
			}
		}
	});
	
	jQuery(window).resize(function(){
		
		window.setTimeout(function(){
			//Re-calculate heights
			oldCateMenuH = AlitaStore_menu_number * jQuery('#categories ul.mega_main_menu_ul > li.menu-item').outerHeight() + jQuery('.catemenu-toggler').outerHeight();
			realMMH = jQuery('#categories ul.mega_main_menu_ul > li.menu-item').length * jQuery('#categories ul.mega_main_menu_ul > li').outerHeight();
			realCateMenuH = jQuery('.catemenu-toggler').outerHeight() + realMMH + jQuery('.morelesscate').outerHeight();
			
			if(jQuery('.morecate').css('display')!='none'){
				jQuery('.categories-menu').css('height', oldCateMenuH);
			} else {
				jQuery('.categories-menu').css('height', realCateMenuH);
			}
		}, 300);
	});
	
	jQuery(window).load(function(){
		//Projects filter with shuffle.js
		jQuery('.list_projects #projects_list').shuffle( { itemSelector: '.project' });
		
		jQuery('.filter-options .btn').on('click', function() {
			
			var filterBtn = jQuery(this),
				isActive = filterBtn.hasClass( 'active' ),
				group = isActive ? 'all' : filterBtn.data('group');
			// Hide current label, show current label in title
			if ( !isActive ) {
				jQuery('.filter-options .active').removeClass('active');
			}
			filterBtn.toggleClass('active');
			// Filter elements
			jQuery('.list_projects #projects_list').shuffle( 'shuffle', group );
		});
	});
})(jQuery);
"use strict";
function RoadgetParameterByName(name, string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(string);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Product tabs carousel
function roadtabCarousel(element, itemnumbers1, itemnumbers2, itemnumbers3, itemnumbers4, itemnumbers5, itemnumbers6 ) {
	//jQuery(element).unslick();
	var AlitaStore_postcols = jQuery(element).attr('data-col');
	jQuery(element).owlCarousel({   
	    items: itemnumbers1,  
	    itemsDesktop : [1500,itemnumbers2],
	    itemsDesktopSmall : [1199,itemnumbers3],
	    itemsTablet: [991,itemnumbers4],
	    itemsTabletSmall: [767,itemnumbers5],
	    itemsMobile : [479,itemnumbers6], 
	    navigation: true,
	    addClassActive: true, 
		afterAction: function(el){
	       	this.$owlItems.removeClass('last-active');
	        this.$owlItems .eq(this.currentItem + (this.owl.visibleItems.length - 1)).addClass('last-active');  
	    }
	});
	 
}
//remove item from mini cart by ajax
function roadMiniCartRemove(url, itemid) {
	jQuery('.mini_cart_content').addClass('loading');
	jQuery('.cart-form').addClass('loading');
	
	jQuery.get( url, function(data,status){
		if(status=='success'){
			//update mini cart info
			jQuery.post(
				ajaxurl,
				{
					'action': 'get_cartinfo'
				}, 
				function(response){
					var cartinfo = response.split("|");
					var itemAmount = cartinfo[0];
					var cartTotal = cartinfo[1];
					var orderTotal = cartinfo[2];
					
					jQuery('.cart-quantity').html(itemAmount);
					jQuery('.cart-total .amount').html(cartTotal);
					jQuery('.total .amount').html(cartTotal);
					
					jQuery('.cart-subtotal .amount').html(cartTotal);
					jQuery('.order-total .amount').html(orderTotal);
				}
			);
			//remove item line from mini cart & cart page
			jQuery('#mcitem-' + itemid).animate({'height': '0', 'margin-bottom': '0', 'padding-bottom': '0', 'padding-top': '0'});
			setTimeout(function(){
				jQuery('#mcitem-' + itemid).remove();
				jQuery('#lcitem-' + itemid).remove();
				//set new height
				var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
				jQuery('.mini_cart_content').animate({'height': mCartHeight});
			}, 1000);
			
			jQuery('.mini_cart_content').removeClass('loading');
			jQuery('.cart-form').removeClass('loading');
		}
	});
}
function AlitaStoretip(element, content) {
	if(content=='html'){
		var tipText = element.html();
	} else {
		var tipText = element.attr('title');
	}
	element.on('mouseover', function(){
		if(jQuery('.AlitaStoretip').length == 0) {
			element.before('<span class="AlitaStoretip" style="display: none;">'+tipText+'</span>');
			
			var tipWidth = jQuery('.AlitaStoretip').outerWidth();
			var tipPush = -(tipWidth/2 - element.outerWidth()/2);
			jQuery('.AlitaStoretip').css('margin-left', tipPush);
			jQuery('.AlitaStoretip').fadeIn();
		}
	});
	element.on('mouseleave', function(){
		jQuery('.AlitaStoretip').fadeOut();
		jQuery('.AlitaStoretip').remove();
	});
}
function showQuickView(productID, quickviewArr){
	//jQuery('#quickview-content').html(''); /*clear content*/
	
	//change id for next/prev buttons
	prevArrID = quickviewArr[quickviewArr.indexOf(productID) - 1];
	nextArrID = quickviewArr[quickviewArr.indexOf(productID) + 1];
	
	jQuery('.qvprev').attr('data-quick-id', prevArrID);
	jQuery('.qvnext').attr('data-quick-id', nextArrID);
	jQuery('body').addClass('quickview');
	
	window.setTimeout(function(){
		jQuery('.quickview-wrapper').addClass('open');
		jQuery('.qvloading').fadeIn();
		
		jQuery.post(
			ajaxurl, 
			{
				'action': 'product_quickview',
				'data':   productID
			}, 
			function(response){
				jQuery('#quickview-content').html(response);
				
				jQuery('.qvloading').fadeOut();
				/*variable product form*/
				jQuery( '.variations_form' ).wc_variation_form();
				jQuery( '.variations_form .variations select' ).change();
				
				/*thumbnails carousel*/
				jQuery('.quick-thumbnails')
				jQuery('.quick-thumbnails').slick({
					slidesToScroll: 1,
					slidesToShow: 4,
					arrows: false,
					dots: true
				});
				/*thumbnail click*/
				jQuery('.quick-thumbnails a').each(function(){
					var quickThumb = jQuery(this);
					var quickImgSrc = quickThumb.attr('href');
					
					quickThumb.on('click', function(event){
						event.preventDefault();
						
						jQuery('.main-image').find('img').attr('src', quickImgSrc);
					});
				});
				/*review link click*/
				
				jQuery('.woocommerce-review-link').on('click', function(event){
					event.preventDefault();
					var reviewLink = jQuery('.see-all').attr('href');
					
					window.location.href = reviewLink + '#reviews';
				});
			}
		);
	}, 300);
}
function hideQuickView(){
	jQuery('.quickview-wrapper').removeClass('open');
			
	window.setTimeout(function(){
		jQuery('body').removeClass('quickview');
	}, 500);
}