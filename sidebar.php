<?php
/**
 * The sidebar containing the main widget area
 *
 * If no active widgets are in the sidebar, hide it completely.
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */

$AlitaStore_opt = get_option( 'AlitaStore_opt' );
 
$AlitaStore_blogsidebar = 'right';
if(isset($AlitaStore_opt['sidebarblog_pos']) && $AlitaStore_opt['sidebarblog_pos']!=''){
	$AlitaStore_blogsidebar = $AlitaStore_opt['sidebarblog_pos'];
}
if(isset($_GET['sidebar']) && $_GET['sidebar']!=''){
	$AlitaStore_blogsidebar = $_GET['sidebar'];
}
?>
<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
	<div id="secondary" class="col-xs-12 col-md-3">
		<div class="sidebar-border <?php echo esc_attr($AlitaStore_blogsidebar);?>">
			<?php dynamic_sidebar( 'sidebar-1' ); ?>
		</div>
	</div><!-- #secondary -->
<?php endif; ?>