		var AlitaStore_brandnumber = 6,
			AlitaStore_brandscrollnumber = 2,
			AlitaStore_brandpause = 3000,
			AlitaStore_brandanimate = 2000;
		var AlitaStore_brandscroll = false;
							AlitaStore_brandscroll = true;
					var AlitaStore_categoriesnumber = 6,
			AlitaStore_categoriesscrollnumber = 2,
			AlitaStore_categoriespause = 3000,
			AlitaStore_categoriesanimate = 2000;
		var AlitaStore_categoriesscroll = false;
					var AlitaStore_blogpause = 3000,
			AlitaStore_blAlitaStoremate = 2000;
		var AlitaStore_blogscroll = false;
							AlitaStore_blogscroll = true;
					var AlitaStore_testipause = 3000,
			AlitaStore_testianimate = 2000;
		var AlitaStore_testiscroll = false; 
							AlitaStore_testiscroll = false;
					var AlitaStore_catenumber = 6,
			AlitaStore_catescrollnumber = 2,
			AlitaStore_catepause = 3000,
			AlitaStore_cateanimate = 700;
		var AlitaStore_catescroll = false;
					var AlitaStore_menu_number = 10; 

		var AlitaStore_sticky_header = false;
							AlitaStore_sticky_header = true;
			
		var AlitaStore_item_first = 12,
			AlitaStore_moreless_products = 4;

		jQuery(document).ready(function(){
			jQuery("#ws").focus(function(){
				if(jQuery(this).val()=="Search product..."){
					jQuery(this).val("");
				}
			});
			jQuery("#ws").focusout(function(){
				if(jQuery(this).val()==""){
					jQuery(this).val("Search product...");
				}
			});
			jQuery("#wsearchsubmit").on('click',function(){
				if(jQuery("#ws").val()=="Search product..." || jQuery("#ws").val()==""){
					jQuery("#ws").focus();
					return false;
				}
			});
			jQuery("#search_input").focus(function(){
				if(jQuery(this).val()=="Search..."){
					jQuery(this).val("");
				}
			});
			jQuery("#search_input").focusout(function(){
				if(jQuery(this).val()==""){
					jQuery(this).val("Search...");
				}
			});
			jQuery("#blogsearchsubmit").on('click',function(){
				if(jQuery("#search_input").val()=="Search..." || jQuery("#search_input").val()==""){
					jQuery("#search_input").focus();
					return false;
				}
			});
		});
		