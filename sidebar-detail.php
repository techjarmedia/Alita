<?php
/**
 * The sidebar for shop page
 *
 * If no active widgets are in the sidebar, hide it completely.
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */
?>

<?php if ( is_active_sidebar( 'sidebar-detail' ) ) : ?>
<div id="secondary" class="col-xs-12 col-md-3 sidebar-detail">
	<?php dynamic_sidebar( 'sidebar-detail' ); ?>
</div>
<?php endif; ?>