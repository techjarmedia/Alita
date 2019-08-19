<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */

$AlitaStore_opt = get_option( 'AlitaStore_opt' );

get_header();

?>
	<div class="main-container error404">
		<div class="container">
			<div class="search-form-wrapper">
				<h1><?php esc_html_e( "404", 'AlitaStore' ); ?></h1>
				<h2><?php esc_html_e( "Opps! PAGE NOT BE FOUND", 'AlitaStore' ); ?></h2>
				<p class="home-link"><?php esc_html_e( "Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarity unavailable.", 'AlitaStore' ); ?></p>
				<?php get_search_form(); ?>
				<a class="button" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php esc_attr_e( 'Back to home', 'AlitaStore' ); ?>"><?php esc_html_e( 'Back to home page', 'AlitaStore' ); ?></a>
			</div>
		</div> 
	</div>
</div>
<?php get_footer(); ?>