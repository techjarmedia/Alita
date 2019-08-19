<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */
?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<?php if(has_post_thumbnail()) : ?>
			<?php if ( ! is_page_template( 'page-templates/front-page.php' ) ) : ?>
				<div class="post-thumbnail"><?php the_post_thumbnail(); ?></div>
			<?php endif; ?>
		<?php endif; ?>
		
		<div class="entry-content">
			<?php the_content(); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'AlitaStore' ), 'after' => '</div>', 'pagelink' => '<span>%</span>' ) ); ?>
		</div>
	</article>