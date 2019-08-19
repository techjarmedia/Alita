<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */

$AlitaStore_opt = get_option( 'AlitaStore_opt' );

get_header();

$AlitaStore_bloglayout = 'sidebar';

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
		AlitaStore_Class::AlitaStore_post_thumbnail_size('AlitaStore-category-thumb');
		break;
	case 'grid':
		$AlitaStore_blogclass = 'grid';
		$AlitaStore_blogcolclass = 9;
		AlitaStore_Class::AlitaStore_post_thumbnail_size('AlitaStore-category-thumb');
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

						<?php /* Start the Loop */ ?>
						<?php while ( have_posts() ) : the_post(); ?>
							
							<?php get_template_part( 'content', get_post_format() ); ?>
							
						<?php endwhile; ?>

						<div class="pagination">
							<?php AlitaStore_Class::AlitaStore_pagination(); ?>
						</div>
						
					<?php else : ?>

						<article id="post-0" class="post no-results not-found">

						<?php if ( current_user_can( 'edit_posts' ) ) :
							// Show a different message to a logged-in user who can add posts.
						?>
							<header class="entry-header">
								<h1 class="entry-title"><?php esc_html_e( 'No posts to display', 'AlitaStore' ); ?></h1>
							</header>

							<div class="entry-content">
								<p><?php printf( wp_kses(__( 'Ready to publish your first post? <a href="%s">Get started here</a>.', 'AlitaStore' ), array('a'=>array('href'=>array()))), admin_url( 'post-new.php' ) ); ?></p>
							</div><!-- .entry-content -->

						<?php else :
							// Show the default message to everyone else.
						?>
							<header class="entry-header">
								<h1 class="entry-title"><?php esc_html_e( 'Nothing Found', 'AlitaStore' ); ?></h1>
							</header>

							<div class="entry-content">
								<p><?php esc_html_e( 'Apologies, but no results were found. Perhaps searching will help find a related post.', 'AlitaStore' ); ?></p>
								<?php get_search_form(); ?>
							</div><!-- .entry-content -->
						<?php endif; // end current_user_can() check ?>

						</article><!-- #post-0 -->

					<?php endif; // end have_posts() check ?>
				</div>
				
			</div>
			<?php if( $AlitaStore_blogsidebar=='right') : ?>
				<?php get_sidebar(); ?>
			<?php endif; ?>
		</div>
	</div> 
</div>
<?php get_footer(); ?>