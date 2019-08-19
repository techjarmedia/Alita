<?php
/**
 * The template for displaying Archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Huge Shop already
 * has tag.php for Tag archives, category.php for Category archives, and
 * author.php for Author archives.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */

$AlitaStore_opt = get_option( 'AlitaStore_opt' );

get_header();
?>
<?php 
$AlitaStore_bloglayout = 'nosidebar';
if(isset($AlitaStore_opt['blog_layout']) && $AlitaStore_opt['blog_layout']!=''){
	$AlitaStore_bloglayout = $AlitaStore_opt['blog_layout'];
}
if(isset($_GET['layout']) && $_GET['layout']!=''){
	$AlitaStore_bloglayout = $_GET['layout'];
}
$AlitaStore_blogsidebar = 'right';
if(isset($AlitaStore_opt['sidebarblog_pos']) && $AlitaStore_opt['sidebarblog_pos']!=''){
	$AlitaStore_blogsidebar = $AlitaStore_opt['sidebarblog_pos'];
}
if(isset($_GET['sidebar']) && $_GET['sidebar']!=''){
	$AlitaStore_blogsidebar = $_GET['sidebar'];
}
switch($AlitaStore_bloglayout) {
	case 'sidebar':
		$AlitaStore_blogclass = 'blog-sidebar';
		$AlitaStore_blogcolclass = 9;
		AlitaStore_Class::AlitaStore_post_thumbnail_size('AlitaStore-category-thumb');
		break;
	case 'largeimage':
		$AlitaStore_blogclass = 'blog-large';
		$AlitaStore_blogcolclass = 9;
		$AlitaStore_postthumb = '';
		break;
	default:
		$AlitaStore_blogclass = 'blog-nosidebar';
		$AlitaStore_blogcolclass = 12;
		$AlitaStore_blogsidebar = 'none';
		AlitaStore_Class::AlitaStore_post_thumbnail_size('AlitaStore-post-thumb');
}
?>
<div class="main-container"> 
	<div class="title-breadcrumb"> 
		<div class="container">
			<div class="title-breadcrumb-inner">
				<?php AlitaStore_Class::AlitaStore_breadcrumb(); ?>
				<header class="entry-header">
					<h1 class="entry-title"><?php if(isset($AlitaStore_opt)) { echo esc_html($AlitaStore_opt['blog_header_text']); } else { esc_html_e('Blog', 'AlitaStore');}  ?></h1>
				</header> 
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			
			<?php if($AlitaStore_blogsidebar=='left') : ?>
				<?php get_sidebar(); ?>
			<?php endif; ?>
			
			<div class="col-xs-12 <?php echo 'col-md-'.$AlitaStore_blogcolclass; ?>">
				<div class="page-content blog-page <?php echo esc_attr($AlitaStore_blogclass); if($AlitaStore_blogsidebar=='left') {echo ' left-sidebar'; } if($AlitaStore_blogsidebar=='right') {echo ' right-sidebar'; } ?>">
					<?php if ( have_posts() ) : ?>
						<header class="archive-header">
							<?php
								the_archive_title( '<h1 class="archive-title">', '</h1>' );
								the_archive_description( '<div class="archive-description">', '</div>' );
							?>
						</header>

						<?php
						/* Start the Loop */
						while ( have_posts() ) : the_post();

							/* Include the post format-specific template for the content. If you want to
							 * this in a child theme then include a file called called content-___.php
							 * (where ___ is the post format) and that will be used instead.
							 */
							get_template_part( 'content', get_post_format() );

						endwhile;
						?>
						
						<div class="pagination">
							<?php AlitaStore_Class::AlitaStore_pagination(); ?>
						</div>
						
					<?php else : ?>
						<?php get_template_part( 'content', 'none' ); ?>
					<?php endif; ?>
				</div>
			</div>
			<?php if( $AlitaStore_blogsidebar=='right') : ?>
				<?php get_sidebar(); ?>
			<?php endif; ?>
		</div>
	</div> 
</div>
<?php get_footer(); ?>