<?php
function AlitaStore_logo_shortcode( $atts ) {
	$AlitaStore_opt = get_option( 'AlitaStore_opt' );

	$atts = shortcode_atts( array(
							'logo_link' => 'yes',
							), $atts, 'roadlogo' );
	$html = '';

	if( isset($AlitaStore_opt['logo_main']['url']) && $AlitaStore_opt['logo_main']['url']!=''){
		$html .= '<div class="logo">';

			if($atts['logo_link']=='yes'){
				$html .= '<a href="'.esc_url( home_url( '/' ) ).'" title="'.esc_attr( get_bloginfo( 'name', 'display' ) ).'" rel="home">';
			}
				$html .= '<img src="'.esc_url($AlitaStore_opt['logo_main']['url']).'" alt="'.esc_attr( get_bloginfo( 'name', 'display' ) ).'" />';

			if($atts['logo_link']=='yes'){
				$html .= '</a>';
			}

		$html .= '</div>';
	} else {
		$html .= '<h1 class="logo">';

		if($atts['logo_link']=='yes'){
			$html .= '<a href="'.esc_url( home_url( '/' ) ).'" title="'.esc_attr( get_bloginfo( 'name', 'display' ) ).'" rel="home">';
		}
		$html .= bloginfo( 'name' );

		if($atts['logo_link']=='yes'){
			$html .= '</a>';
		}

		$html .= '</h1>';
	}
	
	return $html;
}

function AlitaStore_mainmenu_shortcode( $atts ) {
	$AlitaStore_opt = get_option( 'AlitaStore_opt' );

	$atts = shortcode_atts( array(
							'sticky_logoimage' => '',
							), $atts, 'roadmainmenu' );
	$html = '';
	
	ob_start(); ?>
	<div class="main-menu-wrapper">
		<div class="visible-small mobile-menu"> 
			<div class="mbmenu-toggler"><?php echo esc_html($AlitaStore_opt['mobile_menu_label']);?><span class="mbmenu-icon"><i class="fa fa-bars"></i></span></div>
			<div class="clearfix"></div>
			<?php wp_nav_menu( array( 'theme_location' => 'mobilemenu', 'container_class' => 'mobile-menu-container', 'menu_class' => 'nav-menu' ) ); ?>
		</div> 
		<div class="<?php if(isset($AlitaStore_opt['sticky_header']) && $AlitaStore_opt['sticky_header']) {echo 'header-sticky';} ?> <?php if ( is_admin_bar_showing() ) {echo 'with-admin-bar';} ?>">
			<div class="nav-container">
				<?php if( isset($atts['sticky_logoimage']) && $atts['sticky_logoimage']!=''){ ?>
					<div class="logo-sticky"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><img src="<?php echo  wp_get_attachment_url( $atts['sticky_logoimage']);?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" /></a></div>
				<?php } ?>
				<div class="horizontal-menu visible-large">
					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container_class' => 'primary-menu-container', 'menu_class' => 'nav-menu' ) ); ?>
				</div> 
			</div>
		</div>  
	</div>	
	<?php
	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_roadcategoriesmenu_shortcode ( $atts ) {

	$AlitaStore_opt = get_option( 'AlitaStore_opt' );

	$html = '';

	ob_start();

	$cat_menu_class = '';

	if(isset($AlitaStore_opt['categories_menu_home']) && $AlitaStore_opt['categories_menu_home']) {
		$cat_menu_class .=' show_home';
	}
	if(isset($AlitaStore_opt['categories_menu_sub']) && $AlitaStore_opt['categories_menu_sub']) {
		$cat_menu_class .=' show_inner';
	}
	?>
	<div class="categories-menu visible-large <?php echo esc_attr($cat_menu_class); ?>">
		<div class="catemenu-toggler"><i class="material-icons">menu</i><span><?php if(isset($AlitaStore_opt)) { echo esc_html($AlitaStore_opt['categories_menu_label']); } else { _e('Category', 'AlitaStore'); } ?></span></div>
		<?php wp_nav_menu( array( 'theme_location' => 'categories', 'container_class' => 'categories-menu-container', 'menu_class' => 'categories-menu' ) ); ?>
		<div class="morelesscate">
			<span class="morecate"><i class="material-icons">add</i><?php if ( isset($AlitaStore_opt['categories_more_label']) && $AlitaStore_opt['categories_more_label']!='' ) { echo esc_html($AlitaStore_opt['categories_more_label']); } else { _e('More Categories', 'AlitaStore'); } ?></span>
			<span class="lesscate"><i class="material-icons">remove_circle_outline</i><?php if ( isset($AlitaStore_opt['categories_less_label']) && $AlitaStore_opt['categories_less_label']!='' ) { echo esc_html($AlitaStore_opt['categories_less_label']); } else { _e('Close Menu', 'AlitaStore'); } ?></span>
		</div>
	</div>
	<?php

	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_roadlangswitch_shortcode( $atts ) {
	$AlitaStore_opt = get_option( 'AlitaStore_opt' );

	$html = '';

	ob_start();

	if (class_exists('SitePress')) { ?>
		<div class="switcher">
			<div class="language"><label><?php echo esc_html__('language:','AlitaStore')?></label><?php do_action('icl_language_selector'); ?></div> 
			<div class="currency"><label><?php echo esc_html__('currency:','AlitaStore')?></label><?php do_action('currency_switcher'); ?></div> 
		</div> 
	<?php }

	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_roadsocialicons_shortcode( $atts ) {
	$AlitaStore_opt = get_option( 'AlitaStore_opt' );

	$html = '';

	ob_start();

	if(isset($AlitaStore_opt['social_icons'])) {
		echo '<ul class="social-icons">';
		foreach($AlitaStore_opt['social_icons'] as $key=>$value ) {
			if($value!=''){
				if($key=='vimeo'){
					echo '<li><a class="'.esc_attr($key).' social-icon" href="'.esc_url($value).'" title="'.ucwords(esc_attr($key)).'" target="_blank"><i class="fa fa-vimeo-square"></i></a></li>';
				} else {
					echo '<li><a class="'.esc_attr($key).' social-icon" href="'.esc_url($value).'" title="'.ucwords(esc_attr($key)).'" target="_blank"><i class="fa fa-'.esc_attr($key).'"></i></a></li>';
				}
			}
		}
		echo '</ul>';
	}

	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_roadminicart_shortcode( $atts ) {

	$html = '';

	ob_start();

	if ( class_exists( 'WC_Widget_Cart' ) ) {
		the_widget('Custom_WC_Widget_Cart');
	}

	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_roadproductssearch_shortcode( $atts ) {

	$html = '';

	ob_start();

	if( class_exists('WC_Widget_Product_Categories') && class_exists('WC_Widget_Product_Search') ) { ?>
		<div class="header-search"> 
			<div class="search-categories-container">
				<div class="cate-toggler"><?php esc_html_e('All Categories', 'AlitaStore');?></div>
  				<?php the_widget('WC_Widget_Product_Categories', array('hierarchical' => true, 'title' => 'All Categories', 'orderby' => 'order')); ?>
			
			</div>
			<?php the_widget('WC_Widget_Product_Search', array('title' => 'Search')); ?>
		</div>
	<?php }

	$html .= ob_get_contents();

	ob_end_clean();
	
	return $html;
}

function AlitaStore_brands_shortcode( $atts ) {
	global $AlitaStore_opt;
	$brand_index = 0;
	
	if(isset($AlitaStore_opt['brand_logos'])) {
		$brandfound = count($AlitaStore_opt['brand_logos']);
	}
	$atts = shortcode_atts( array(
							'rowsnumber' => '1',
							'colsnumber' => '6',
							), $atts, 'ourbrands' );
	$html = '';
	
	if(isset($AlitaStore_opt['brand_logos']) && $AlitaStore_opt['brand_logos']) {
		$html .= '<div class="brands-carousel" data-col="'.$atts['colsnumber'].'">';
			foreach($AlitaStore_opt['brand_logos'] as $brand) {
				if(is_ssl()){
					$brand['image'] = str_replace('http:', 'https:', $brand['image']);
				}
				$brand_index ++;
				if ( (0 == ( $brand_index - 1 ) % $atts['rowsnumber'] ) || $brand_index == 1) {
					$html .= '<div class="group">';
				}
				$html .= '<div>';
				$html .= '<a href="'.esc_url($brand['url']).'" title="'.esc_attr($brand['title']).'">';
					$html .= '<img src="'.esc_url($brand['image']).'" alt="'.esc_attr($brand['title']).'" />';
				$html .= '</a>';
				$html .= '</div>';
				if ( ( ( 0 == $brand_index % $atts['rowsnumber'] || $brandfound == $brand_index ))  ) {
					$html .= '</div>';
				}
			}
		$html .= '</div>';
	}
	
	return $html;
}

function AlitaStore_counter_shortcode( $atts ) {
	
	$atts = shortcode_atts( array(
							'image' => '',
							'number' => '100',
							'text' => 'Demo text',
							), $atts, 'AlitaStore_counter' );
	$html = '';
	$html.='<div class="AlitaStore-counter">';
		$html.='<div class="counter-image">';
			$html.='<img src="'.wp_get_attachment_url($atts['image']).'" alt="'.$atts['image'].'" />';
		$html.='</div>';
		$html.='<div class="counter-info">';
			$html.='<div class="counter-number">';
				$html.='<span>'.$atts['number'].'</span>';
			$html.='</div>';
			$html.='<div class="counter-text">';
				$html.='<span>'.$atts['text'].'</span>';
			$html.='</div>';
		$html.='</div>';
	$html.='</div>';
	
	return $html;
} 

function AlitaStore_categoriescarousel_shortcode( $atts ) { 
	global $AlitaStore_opt;
	$categories_index = 0;
	if(isset($AlitaStore_opt['cate_images'])){
		$categoriesfound = count($AlitaStore_opt['cate_images']);
	}
	
	$atts = shortcode_atts( array(
							'rowsnumber' => '1',
							'colsnumber' => '6',
							), $atts, 'categoriescarousel' );
	$html = '';
	
	if(isset($AlitaStore_opt['cate_images'])){
		$html .= '<div class="categories-carousel" data-col="'.$atts['colsnumber'].'">';
			foreach($AlitaStore_opt['cate_images'] as $categories) {
				if(is_ssl()){
					$categories['image'] = str_replace('http:', 'https:', $categories['image']);
				}
				$categories_index ++;
				if ( (0 == ( $categories_index - 1 ) % $atts['rowsnumber'] ) || $categories_index == 1) {
					$html .= '<div class="group">';
				}
				$html .= '<div class="item">';
					$html .= '<div class="item-inner">';
						$html .= '<a href="'.esc_url($categories['url']).'" class="image" title="'.esc_attr($categories['title']).'">';
							$html .= '<img src="'.esc_url($categories['image']).'" alt="'.esc_attr($categories['title']).'" />';
						$html .= '</a>'; 
						$html .= '<div class="content">';
							$pcategory = get_term_by( 'slug', $categories['title'], 'product_cat', 'ARRAY_A' );
								if($pcategory){
									$html .= '<div class="category-list">';
										$html .= '<h3><a href="'. get_term_link($pcategory['slug'], 'product_cat') .'">'. esc_html($pcategory['name']) .'</a></h3>';
										
										$html .= '<ul>';
											$args2 = array(
												'taxonomy'     => 'product_cat',
												'child_of'     => 0,
												'parent'       => $pcategory['term_id'],
												'orderby'      => 'name',
												'show_count'   => 0,
												'pad_counts'   => 0,
												'hierarchical' => 0,
												'title_li'     => '',
												'hide_empty'   => 0
											);
											$sub_cats = get_categories( $args2 );

											if($sub_cats) {
												foreach($sub_cats as $sub_category) {
													$html .= '<li><a href="'.get_term_link($sub_category->slug, 'product_cat').'">'.$sub_category->name.'</a></li>';
												}
											}
											$html .= '<li class="view-all"><a href="'. get_term_link($pcategory['slug'], 'product_cat') .'">'. esc_html__('See more','AlitaStore') .'</a></li>';
										$html .= '</ul>';
									$html .= '</div>'; 
								}
						$html .= '</div>'; 
					$html .= '</div>';
				$html .= '</div>';
				if ( ( ( 0 == $categories_index % $atts['rowsnumber'] || $categoriesfound == $categories_index ))  ) {
					$html .= '</div>';
				}
			}
		$html .= '</div>';
	}
	
	return $html;
}

function AlitaStore_latestposts_shortcode( $atts ) {
	global $AlitaStore_opt;
	$post_index = 0;
	$atts = shortcode_atts( array(
		'posts_per_page' => 5,
		'order' => 'DESC',
		'orderby' => 'post_date',
		'image' => 'wide', //square
		'length' => 20,
		'rowsnumber' => '1',
		'colsnumber' => '4',
		'image1' => 'square',
	), $atts, 'latestposts' );
	
	if($atts['image']=='wide'){
		$imagesize = 'AlitaStore-post-thumbwide';
	} else {
		$imagesize = 'AlitaStore-post-thumb';
	}
	$html = '';

	$postargs = array(
		'posts_per_page'   => $atts['posts_per_page'],
		'offset'           => 0,
		'category'         => '',
		'category_name'    => '',
		'orderby'          => $atts['orderby'],
		'order'            => $atts['order'],
		'exclude'          => '',
		'meta_key'         => '',
		'meta_value'       => '',
		'post_type'        => 'post',
		'post_mime_type'   => '',
		'post_parent'      => '',
		'post_status'      => 'publish',
		'suppress_filters' => true );
	
	$postslist = get_posts( $postargs );

	$html.='<div class="posts-carousel" data-col="'.$atts['colsnumber'].'">';

			foreach ( $postslist as $post ) {
				$post_index ++;
				if ( (0 == ( $post_index - 1 ) % $atts['rowsnumber'] ) || $post_index == 1) {
					$html .= '<div class="group">';
				} 
				$html.='<div class="item-col">';
					$html.='<div class="post-wrapper">';

					// author link
					$author_id = $post->post_author;
					$author_url = get_author_posts_url( get_the_author_meta( 'ID', $author_id ) );
					$author_name = get_the_author_meta( 'user_nicename', $author_id );
					
					//comment variables
					$num_comments = (int)get_comments_number($post->ID);
					$write_comments = '';
					if ( comments_open($post->ID) ) {
						if ( $num_comments == 0 ) {
							$comments = __('<span>0</span> comments', 'AlitaStore');
						} elseif ( $num_comments > 1 ) {
							$comments = '<span>'.$num_comments .'</span>'. esc_html__(' comments', 'AlitaStore');
						} else {
							$comments = __('<span>1</span> comment', 'AlitaStore');
						}
						$write_comments = '<a href="' . get_comments_link($post->ID) .'">'.$comments.'</a>';
					}
					// Read more text
					if(!isset($AlitaStore_opt['readmore_text'])){
						$AlitaStore_opt['readmore_text'] = 'Read more';
					}
					
					$html.='<div class="post-thumb">'; 
						$html.='<a href="'.get_the_permalink($post->ID).'">'.get_the_post_thumbnail($post->ID, $imagesize).'</a>'; 
						$html.='<div class="post-date"><div class="post-date-inner"><span class="day">'.get_the_date('d', $post->ID).'</span> <span class="month">' .get_the_date('M', $post->ID).'</span> <span class="year">' .get_the_date('Y', $post->ID).'</span></div></div>'; 
					$html.='</div>';
					
					$html.='<div class="post-info">';    
						$html.='<h3 class="post-title"><a href="'.get_the_permalink($post->ID).'">'.get_the_title($post->ID).'</a></h3>';	  
						
						$html.='<div class="post-excerpt">';
							$html.= AlitaStore_Class::AlitaStore_excerpt_by_id($post, $length = $atts['length']);
						$html.='</div>'; 
						$html.='<div class="post-meta">'; 
							$html.='<span class="post-author">';
							$html.= sprintf( wp_kses(__( '%s', 'AlitaStore' ), array('a'=>array('href'=>array()))),'By <a href="'.$author_url.'">'.$author_name.'</a>' );
							$html.='</span> - ';    
							$html.='<span class="post-comment">'.$comments.'</span>';   
						$html.='</div>'; 
						$html.='<a class="readmore" href="'.get_the_permalink($post->ID).'">'.'<span>' .esc_html($AlitaStore_opt['readmore_text']). '</span>'.'</a>';

					$html.='</div>';

				$html.='</div>';
			$html.='</div>';
			if ( ( ( 0 == $post_index % $atts['rowsnumber'] || $atts['posts_per_page'] == $post_index ))  ) {
				$html .= '</div>';
			}
		}
	$html.='</div>';

	wp_reset_postdata();
	
	return $html;
}  
function AlitaStore_magnifier_options($att) {  
	$enable_slider 	= get_option('yith_wcmg_enableslider') == 'yes' ? true : false;
	$slider_items = get_option( 'yith_wcmg_slider_items', 3 ); 
	if ( !isset($slider_items) || ( $slider_items == null ) ) $slider_items = 3;
	wp_enqueue_script('AlitaStore-magnifier', get_template_directory_uri() . '/js/product-magnifier-var.js'); 
	wp_localize_script('AlitaStore-magnifier', 'AlitaStore_magnifier_vars', array(
		
			'responsive' => get_option('yith_wcmg_slider_responsive') == 'yes' ? 'true' : 'false',
			'circular' => get_option('yith_wcmg_slider_circular') == 'yes' ? 'true' : 'false',
			'infinite' => get_option('yith_wcmg_slider_infinite') == 'yes' ? 'true' : 'false',

			'visible' => esc_js(apply_filters( 'woocommerce_product_thumbnails_columns', $slider_items )),

			'zoomWidth' => get_option('yith_wcmg_zoom_width'),
			'zoomHeight' => get_option('yith_wcmg_zoom_height'),
			'position' => get_option('yith_wcmg_zoom_position'),

			'lensOpacity' => get_option('yith_wcmg_lens_opacity'),
			'softFocus' => get_option('yith_wcmg_softfocus') == 'yes' ? 'true' : 'false',
			'phoneBehavior' => get_option('yith_wcmg_zoom_mobile_position'),
			'loadingLabel' => stripslashes(get_option('yith_wcmg_loading_label')),
		)
	);
} ?>