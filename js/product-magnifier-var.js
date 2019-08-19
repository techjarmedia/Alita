"use strict";
// product-magnifier var
	var AlitaStore_magnifier_vars;
	var yith_magnifier_options = {
		
		sliderOptions: {
			responsive: AlitaStore_magnifier_vars.responsive,
			circular: AlitaStore_magnifier_vars.circular,
			infinite: AlitaStore_magnifier_vars.infinite,
			direction: 'left',
            debug: false,
            auto: false,
            align: 'left',
            height: 'auto',
            //height: "100%", //turn vertical
            //width: 100,  
			prev    : {
				button  : "#slider-prev",
				key     : "left"
			},
			next    : {
				button  : "#slider-next",
				key     : "right"
			},
			scroll : {
				items     : 1,
				pauseOnHover: true
			},
			items   : {
				visible: Number(AlitaStore_magnifier_vars.visible),
			},
			swipe : {
				onTouch:    true,
				onMouse:    true
			},
			mousewheel : {
				items: 1
			}
		},
		
		showTitle: false,
		zoomWidth: AlitaStore_magnifier_vars.zoomWidth,
		zoomHeight: AlitaStore_magnifier_vars.zoomHeight,
		position: AlitaStore_magnifier_vars.position,
		lensOpacity: AlitaStore_magnifier_vars.lensOpacity,
		softFocus: AlitaStore_magnifier_vars.softFocus,
		adjustY: 0,
		disableRightClick: false,
		phoneBehavior: AlitaStore_magnifier_vars.phoneBehavior,
		loadingLabel: AlitaStore_magnifier_vars.loadingLabel,
	};