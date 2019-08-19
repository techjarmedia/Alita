<?php
/**
 * Product Loop Start
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.3.0
 */
global $wp_query, $woocommerce_loop;

$AlitaStore_opt = get_option( 'AlitaStore_opt' );

$shoplayout = 'sidebar';
if(isset($AlitaStore_opt['shop_layout']) && $AlitaStore_opt['shop_layout']!=''){
	$shoplayout = $AlitaStore_opt['shop_layout'];
}
if(isset($_GET['layout']) && $_GET['layout']!=''){
	$shoplayout = $_GET['layout'];
}
$shopsidebar = 'left';
if(isset($AlitaStore_opt['sidebarshop_pos']) && $AlitaStore_opt['sidebarshop_pos']!=''){
	$shopsidebar = $AlitaStore_opt['sidebarshop_pos'];
}
if(isset($_GET['sidebar']) && $_GET['sidebar']!=''){
	$shopsidebar = $_GET['sidebar'];
}
switch($shoplayout) {
	case 'fullwidth':
		AlitaStore_Class::AlitaStore_shop_class('shop-fullwidth');
		$shopcolclass = 12;
		$shopsidebar = 'none';
		$productcols = 4;
		break;
	default:
		AlitaStore_Class::AlitaStore_shop_class('shop-sidebar');
		$shopcolclass = 9;
		$productcols = 3;
}

$AlitaStore_viewmode = AlitaStore_Class::AlitaStore_show_view_mode();
?>
<div class="shop-products products <?php echo esc_attr($AlitaStore_viewmode);?> <?php echo esc_attr($shoplayout);?>">