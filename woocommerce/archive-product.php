<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

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
if ( !is_active_sidebar( 'sidebar-shop' ) )  {
	$shoplayout = 'fullwidth';
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
<div class="main-container">
	<div class="page-content">  
		<div class="title-breadcrumb shop"> 
			<div class="container">
				<div class="title-breadcrumb-inner"> 
					<?php
						/**
						 * woocommerce_before_main_content hook
						 *
						 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
						 * @hooked woocommerce_breadcrumb - 20
						 */
						do_action( 'woocommerce_before_main_content' );
					?>
					<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?> 
						<header class="entry-header"> 
							<h1 class="entry-title"><?php woocommerce_page_title(); ?></h1> 
						</header> 
					<?php endif; ?>
				</div>
			</div>
		</div> 
		<div class="shop_content"> 
			<div class="container">  
				<div class="row">
					<?php if( $shopsidebar == 'left' ) :?>
						<?php get_sidebar('shop'); ?>
					<?php endif; ?>
					<div id="archive-product" class="col-xs-12 <?php echo 'col-md-'.$shopcolclass; ?>">   
						<div class="shop-desc-container"> 
							<?php if( is_shop() ) { ?>
							<div class="shop-desc <?php echo esc_attr($shoplayout);?>"> 
								<div class="shop_header"> 
									<?php if( isset($AlitaStore_opt['bg_shop']['url']) && $AlitaStore_opt['bg_shop']['url']!=''){ ?>
										<div class="bg-shop"><img src="<?php echo esc_url($AlitaStore_opt['bg_shop']['url'])?>" /></div>
									<?php } ?> 
								</div> 
							</div>
							<?php } elseif (is_product_category()) { ?>
								<div class="category-desc <?php echo esc_attr($shoplayout);?>">
									<div class="category_header">  
										<div class="category-desc-inner"> 
											<?php do_action( 'woocommerce_archive_description' ); ?> 
										</div> 
									</div> 
								</div>
							<?php } ?> 
						</div> 
						<div class="archive-border"> 
							<?php
								/**
								* remove message from 'woocommerce_before_shop_loop' and show here
								*/
								do_action( 'woocommerce_show_message' );
							?>
							
							<?php if ( woocommerce_product_loop() )  : ?>	
							
								<?php woocommerce_product_loop_start(); ?>

								<?php if ( woocommerce_products_will_display() ) { ?>
									<div class="toolbar">
										<div class="toolbar-inner">
											<div class="view-mode">
												<label><?php esc_html_e('View on', 'AlitaStore');?></label>
												<a href="#" class="grid <?php if($AlitaStore_viewmode=='grid-view'){ echo ' active';} ?>" title="<?php echo esc_attr__( 'Grid', 'AlitaStore' ); ?>"><i class="material-icons">apps</i></a>
												<a href="#" class="list <?php if($AlitaStore_viewmode=='list-view'){ echo ' active';} ?>" title="<?php echo esc_attr__( 'List', 'AlitaStore' ); ?>"><i class="material-icons">view_list</i></a>
											</div>
											<?php
												/**
												 * woocommerce_before_shop_loop hook
												 *
												 * @hooked woocommerce_result_count - 20
												 * @hooked woocommerce_catalog_ordering - 30
												 */
												do_action( 'woocommerce_before_shop_loop' );
											?>
											<div class="clearfix"></div>
										</div>
									</div>
								<?php } ?>  
									
									<?php $woocommerce_loop['columns'] = $productcols; ?>
									
									<?php woocommerce_product_subcategories();
									//reset loop
									$woocommerce_loop['loop'] = 0; ?> 
									<div class="product-container">
										<?php while ( have_posts() ) : the_post(); ?>

											<?php wc_get_template_part( 'content', 'product-archive' ); ?>

										<?php endwhile; // end of the loop. ?>  
									</div>
									<?php
										/**
										 * woocommerce_before_shop_loop hook
										 *
										 * @hooked woocommerce_result_count - 20
										 * @hooked woocommerce_catalog_ordering - 30
										 */
										do_action( 'woocommerce_pagination' ); 
									?> 
								<?php woocommerce_product_loop_end(); ?>
								
								<?php if ( woocommerce_products_will_display() ) { ?>

								<?php
									/**
									 * woocommerce_before_shop_loop hook
									 *
									 * @hooked woocommerce_result_count - 20
									 * @hooked woocommerce_catalog_ordering - 30
									 */
									do_action( 'woocommerce_after_shop_loop' );
									//do_action( 'woocommerce_before_shop_loop' );
								?>
								<div class="clearfix"></div>
								
								<?php } ?>
								
							<?php elseif ( ! woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) : ?>

								<?php wc_get_template( 'loop/no-products-found.php' ); ?>

							<?php endif; ?>

						<?php
							/**
							 * woocommerce_after_main_content hook
							 *
							 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
							 */
							do_action( 'woocommerce_after_main_content' );
						?>

						<?php
							/**
							 * woocommerce_sidebar hook
							 *
							 * @hooked woocommerce_get_sidebar - 10
							 */
							//do_action( 'woocommerce_sidebar' );
						?>
						</div>
					</div>
					<?php if($shopsidebar == 'right') :?>
						<?php get_sidebar('shop'); ?>
					<?php endif; ?> 
				</div>
			</div> 
		</div>
	</div>
</div>
<?php get_footer( 'shop' ); ?>