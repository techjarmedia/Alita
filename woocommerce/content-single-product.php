<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     4.4.0
 */

defined( 'ABSPATH' ) || exit;
?>
 
<?php
	/**
	 * Hook: woocommerce_before_single_product.
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }
?> 
<div id="product-<?php the_ID(); ?>" <?php wc_product_class(); ?>>
 	
 	
 		<div class="box-content">
			<div class="row">
				<div class="col-xs-12 col-md-6">
					<div class="single-product-image">
						<?php
							/**
							 * woocommerce_before_single_product_summary hook
							 *
							 * @hooked woocommerce_show_product_sale_flash - 10
							 * @hooked woocommerce_show_product_images - 20
							 */
							do_action( 'woocommerce_before_single_product_summary' );
						?>
					</div>

				</div>
				<div class="col-xs-12 col-md-6">
					<div class="summary entry-summary single-product-info">
						<div class="product-nav">
							<div class="next-prev">
								<div class="prev"><?php previous_post_link('%link'); ?></div>
								<div class="next"><?php next_post_link('%link'); ?></div>
							</div>
						</div>
					
						<?php
							/**
							 * woocommerce_single_product_summary hook
							 *
							 * @hooked woocommerce_template_single_title - 5
							 * @hooked woocommerce_template_single_rating - 10
							 * @hooked woocommerce_template_single_price - 10
							 * @hooked woocommerce_template_single_excerpt - 20
							 * @hooked woocommerce_template_single_add_to_cart - 30
							 * @hooked woocommerce_template_single_meta - 40
							 * @hooked woocommerce_template_single_sharing - 50
							 */
							do_action( 'woocommerce_single_product_summary' );
						?>
						<div class="single-product-sharing">
							<?php 
							if(function_exists('AlitaStore_product_sharing')) {
								AlitaStore_product_sharing();
							} ?>
						</div>

					</div><!-- .summary -->
				</div>
			</div> 
		</div>
 
		<?php
			/**
			 * woocommerce_after_single_product_summary hook
			 *
			 * @hooked woocommerce_output_product_data_tabs - 10
			 * @hooked woocommerce_output_related_products - 20
			 */
			do_action( 'woocommerce_after_single_product_summary' );
		?>
		
		<meta itemprop="url" content="<?php the_permalink(); ?>" />  
	
</div><!-- #product-<?php the_ID(); ?> -->
<?php do_action('woocommerce_show_related_products');

//dynamic_sidebar( 'sidebar-product' ); ?>

<?php do_action( 'woocommerce_after_single_product' ); ?>