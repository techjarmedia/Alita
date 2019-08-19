<?php
/**
 * The template for displaying Author Archive pages
 *
 * Used to display archive-type pages for posts by an author.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage AlitaStore_Theme
 * @since Huge Shop 1.0
 */

$AlitaStore_opt = get_option( 'AlitaStore_opt' );

get_header();

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

						<?php
							/* Queue the first post, that way we know
							 * what author we're dealing with (if that is the case).
							 *
							 * We reset this later so we can run the loop
							 * properly with a call to rewind_posts().
							 */
							the_post();
						?>

						<header class="archive-header">
							<h1 class="archive-title"><?php printf( esc_html__( 'Author Archives: %s', 'AlitaStore' ), '<span class="vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( "ID" ) ) ) . '" title="' . esc_attr( get_the_author() ) . '" rel="me">' . get_the_author() . '</a></span>' ); ?></h1>
						</header><!-- .archive-header -->

						<?php
							/* Since we called the_post() above, we need to
							 * rewind the loop back to the beginning that way
							 * we can run the loop properly, in full.
							 */
							rewind_posts();
						?>

						<?php
						// If a user has filled out their description, show a bio on their entries.
						if ( get_the_author_meta( 'description' ) ) : ?>
						<div class="author-info archives">
							<div class="author-avatar">
								<?php
								/**
								 * Filter the author bio avatar size.
								 *
								 * @since Huge Shop 1.0
								 *
								 * @param int $size The height and width of the avatar in pixels.
								 */
								$author_bio_avatar_size = apply_filters( 'AlitaStore_author_bio_avatar_size', 68 );
								echo get_avatar( get_the_author_meta( 'user_email' ), $author_bio_avatar_size );
								?>
							</div><!-- .author-avatar -->
							<div class="author-description">
								<h2><?php printf( esc_html__( 'About %s', 'AlitaStore' ), get_the_author() ); ?></h2>
								<p><?php the_author_meta( 'description' ); ?></p>
							</div><!-- .author-description	-->
						</div><!-- .author-info -->
						<?php endif; ?>

						<?php /* Start the Loop */ ?>
						<?php while ( have_posts() ) : the_post(); ?>
							<?php get_template_part( 'content', get_post_format() ); ?>
						<?php endwhile; ?>
						
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