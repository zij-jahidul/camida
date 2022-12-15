
/**
 * Main Application Js 
 */ 

(function() {
    // Page module - helps to manage all the pages and navigation
    var Page = (function() {
    	
    	
    	var config = {
    			$bookBlock : $( '#bb-bookblock' ),
    			$navNext : $( '.bb-nav-next' ),
    			$navPrev : $( '.bb-nav-prev' ),
                $skillWidgets: $('.skill-circle'),
    	},
        menuConfig = {
            $menuItems: $("#menu li a"),
            $aboutMenuItem: $("#aboutme"),
            $navbarToggleButton : $('.navbar-toggle:visible'),
            $navbarDropdownMenu: $("#nav-top"),
        },
    	init = function() {
    			 
    			config.$bookBlock.bookblock( {
    				speed : 1000,
    				shadowSides : 0.8,
    				shadowFlip : 0.4,
    				onEndFlip : function(old, page, isLimit) {
    					current = page;
    					// Add more animate css classes, if you are using other classes.
    					$("#page-"+page+" .animateFadeInLeft").addClass('animated fadeInLeft').show();
    					$("#page-"+page+" .animateFadeInRight").addClass('animated fadeInRight').show();
    					$("#page-"+page+" .animateFadeInUp").addClass('animated fadeInUp').show();
    					$("#page-"+page+" .animateFadeInDown").addClass('animated fadeInDown').show();
    					$("#page-"+page+" .animateFlipInX").addClass('animated flipInX').show();
    					$("#page-"+page+" .animateFlipInY").addClass('animated flipInY').show();
    					$("#page-"+page+" .animateBounceInLeft").addClass('animated bounceInLeft').show();
    					$("#page-"+page+" .animateBounceInRight").addClass('animated bounceInRight').show();
    					setTimeout(function() {
    						$("#page-"+page+" .animateFadeInLeft").removeClass("animateFadeInLeft").removeClass("animated fadeInLeft");
    						$("#page-"+page+" .animateFadeInRight").removeClass("animateFadeInRight").removeClass("animated fadeInRight");
    						$("#page-"+page+" .animateFadeInUp").removeClass("animateFadeInUp").removeClass("animated fadeInUp");
    						$("#page-"+page+" .animateFadeInDown").removeClass("animateFadeInDown").removeClass("animated fadeInDown");
    						$("#page-"+page+" .animateFlipInX").removeClass("animateFlipInX").removeClass("animated flipInX");
    						$("#page-"+page+" .animateFlipInY").removeClass("animateFlipInY").removeClass("animated flipInY");
    						$("#page-"+page+" .animateBounceInLeft").removeClass("animateBounceInLeft").removeClass("animated bounceInLeft");
    						$("#page-"+page+" .animateBounceInRight").removeClass("animateBounceInRight").removeClass("animated bounceInRight");
    					}, 1000);
    					
    					if ($("#page-2").is(":visible")){
    						// skills
                            config.$skillWidgets.html(""); //removing already generated circle
                            config.$skillWidgets.circliful();
    					}
    				}
    			} );
    			initEvents();
    		},
    		initEvents = function() {
    			
    			var $slides = config.$bookBlock.children();

    			// add navigation events
    			config.$navNext.on( 'click touchstart', function() {
    				config.$bookBlock.bookblock( 'next' );
                    // Closes the Responsive Menu on Menu Item Click
                    if(menuConfig.$navbarDropdownMenu.hasClass("in"))
                        menuConfig.$navbarToggleButton.trigger('click');

    				return false;
    			} );

    			config.$navPrev.on( 'click touchstart', function() {
    				config.$bookBlock.bookblock( 'prev' );
                    // Closes the Responsive Menu on Menu Item Click
                    if(menuConfig.$navbarDropdownMenu.hasClass("in"))
                        menuConfig.$navbarToggleButton.trigger('click');
                    
    				return false;
    			} );

    			
    			// add swipe events
    			$slides.on( {
    				'swipeleft' : function( event ) {
    					config.$bookBlock.bookblock( 'next' );
    					return false;
    				},
    				'swiperight' : function( event ) {
    					config.$bookBlock.bookblock( 'prev' );
    					return false;
    				}
    			} );

    			// add keyboard events
    			$( document ).keydown( function(e) {
    				var keyCode = e.keyCode || e.which,
    					arrow = {
    						left : 37,
    						up : 38,
    						right : 39,
    						down : 40
    					};

    				switch (keyCode) {
    					case arrow.left:
    						config.$bookBlock.bookblock( 'prev' );
    						break;
    					case arrow.right:
    						config.$bookBlock.bookblock( 'next' );
    						break;
    				}
    			} );
    		};
    		
            //menu item
    		current = 0;
    		menuConfig.$menuItems.on( 'click', function() {
    			var $el = $( this ),
    				idx = $el.attr("data-page"),
    				reachedToPage = false;
    			config.$bookBlock.bookblock( 'jump',idx	 );
    			return false;
    			 
    		});
    		
            //about menu - home
    		menuConfig.$aboutMenuItem.on( 'click', function() {
    			config.$bookBlock.bookblock( 'next' );
    			return false;
    		});

    		return { init : init };

    })();



    /**
     * Our application module - manages all the elements in all pages
     */
    var UltraApp = (function() {
        var htmlRef = $('html');
        var windowRef = $(window);
        var bodyRef = $('html, body');
        var docRef = $(document);
        var preloaderArea = $('.cover');
        var headerArea = $('.header-top-area');
        var smothScrollEls = $('a.smoth-scroll');
        var workContainer = $('.work-inner');
        var workPopup = $('.work-popup');
        var testimonialList = $(".testimonial-list");
        var navbarToggle = $(".navbar-collapse.in");
        var gridContainers = $('.grid');
        var portfolioFilter = $(".fil-cat");
        var portfolioContainer = $(".lrs-projects");
        var portfolioProject = $(".lrs-project");


        //inits widgets
        var initWidgets = function() {
            //tooltip
            $('[data-toggle="tooltip"]').tooltip();

            //popover
            $('[data-toggle="popover"]').popover({
                'trigger': 'hover',
                'html': true,
                placement: 'top',
                'content': function () {
                    return "<img class='img-responsive' src='" + $(this).data('imageUrl') + "'><span>Popover content, lorem ipsum dolor sit amet, consectetur adipiscing elit</span>";
                }
            });
        };

        //init porfolio
        var initPortfolioGrid = function() {
            //massonary - portfolio
            gridContainers.masonry({
                // set itemSelector so .grid-sizer is not used in layout
                itemSelector: '.grid-item',
                // use element for option
                columnWidth: '.grid-sizer',
                percentPosition: true
            });

            //activate filters
            var selectedClass = "";
            portfolioFilter.on('click', function () {
                portfolioFilter.removeClass('active');
                $(this).addClass('active');
                selectedClass = $(this).attr("data-rel");
                portfolioContainer.fadeTo(100, 0.1);
                portfolioProject.not("." + selectedClass).fadeOut().removeClass('scale-anm');
                setTimeout(function () {
                    $("." + selectedClass).fadeIn().addClass('scale-anm');
                    portfolioContainer.fadeTo(300, 1);
                }, 300);
            });
        }

        //on document ready callback function
        var onDocReady = function(e) {
            //smooth scroll
            smothScrollEls.on("click", function (e) {
                var anchor = $(this);
                bodyRef.stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top - 50
                }, 1000);
                e.preventDefault();
            });

             //stellar parallax effects
             windowRef.stellar({
                 responsive: true,
                 positionProperty: 'position',
                 horizontalScrolling: false
             });

            //work section
            workContainer.mixItUp();

            //portfolio item popup
            workPopup.magnificPopup(
                {
                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-with-zoom',
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true, // By default it's false, so don't forget to enable it

                        duration: 300, // duration of the effect, in milliseconds
                        easing: 'ease-in-out', // CSS transition easing function

                        // The "opener" function should return the element from which popup will be zoomed in
                        // and to which popup will be scaled down
                        // By defailt it looks for an image tag:
                        opener: function (openerElement) {
                            // openerElement is the element on which popup was initialized, in this case its <a> tag
                            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                }
            });

            //testimonials
            testimonialList.owlCarousel({
                items: 1,
                autoPlay: true,
                navigation: false,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [980, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
                pagination: true,
                autoHeight: true,
            });

            //navbar - small device
            navbarToggle.on('click', function (e) {
                if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                    $(this).collapse('hide');
                }
            });

            //activate menu item based on scrolled section
            bodyRef.scrollspy({
                target: '.navbar-collapse',
                offset: 195
            });

            //portfolio
            initPortfolioGrid();

            //widgets
            initWidgets();

        };

        //on window load call back function
        var onWinLoad = function(e) {
            // preloader - handling
            preloaderArea.delay(1000).fadeOut(2000);
        };

        //on window scroll call back function
        var onWinScroll = function(e) {
            //header
            if (windowRef.scrollTop() > 200) {
                headerArea.addClass('menu-bg');
            } else {
                headerArea.removeClass('menu-bg');
            }
        };

        //binds the events to required elements
        var bindEvents = function() {
            docRef.on('ready', onDocReady);
            windowRef.on('load', onWinLoad);
            windowRef.on('scroll', onWinScroll);
        };

        // init - initilizes various widgets, elements, events, etc
        var init = function() {
            bindEvents();
            //init page app
            Page.init();
        };

        return {
            init: init
        };
    }());

    //init app
    UltraApp.init();
})();