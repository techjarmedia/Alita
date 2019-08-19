<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */
 
$AlitaStore_opt = get_option( 'AlitaStore_opt' );
?>
			<?php if(isset($AlitaStore_opt['footer_layout']) && $AlitaStore_opt['footer_layout']!=''){
				$footer_class = str_replace(' ', '-', strtolower($AlitaStore_opt['footer_layout']));
			} else {
				$footer_class = '';
			} ?>

			<div class="footer <?php echo esc_html($footer_class);?>">
				<?php
				if ( isset($AlitaStore_opt['footer_layout']) && $AlitaStore_opt['footer_layout']!="" ) {

					$jscomposer_templates_args = array(
						'orderby'          => 'title',
						'order'            => 'ASC',
						'post_type'        => 'templatera',
						'post_status'      => 'publish',
						'posts_per_page'   => 30,
					);
					$jscomposer_templates = get_posts( $jscomposer_templates_args );

					if(count($jscomposer_templates) > 0) {
						foreach($jscomposer_templates as $jscomposer_template){
							if($jscomposer_template->post_title == $AlitaStore_opt['footer_layout']){
								echo do_shortcode($jscomposer_template->post_content);
							}
						}
					}
				} else { ?>
					<div class="footer-default">
						<div class="widget-copyright">
							<?php printf(esc_html__('Copyright','AlitaStore').' <a href="'.esc_url( home_url( '/' ) ).'">'.get_bloginfo('name').'</a> '.date('Y'). esc_html__('. All Rights Reserved','AlitaStore')) ; ?>
						</div>
					</div> 
				<?php
				}
				?>
			</div>
		</div><!-- .page -->
	</div><!-- .wrapper -->
	<!--<div class="AlitaStore_loading"></div>-->
	<?php if ( isset($AlitaStore_opt['back_to_top']) && $AlitaStore_opt['back_to_top'] ) { ?>
	<div id="back-top" class="hidden-xs hidden-sm hidden-md"></div>
	<?php } ?>
	<?php wp_footer(); ?> 
</body>
</html>