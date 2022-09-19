<?php
/**
 * Plugin Name: Elementor - MM Customizations
 * Plugin URI: https://github.com/MIGHTYminnow/elementor-mm-customizations
 * Version: 1.0.0-alpha
 * Author: MIGHTYminnow
 * Author URI: https://mightyminnow.com
 * Description: Adds accessibility fixes to Elementor.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'ELEMENTOR_MM_CUSTOMIZATIONS_VERSION' ) ) {
	define( 'ELEMENTOR_MM_CUSTOMIZATIONS_VERSION', '1.0.0-alpha' );
}

if ( ! defined( 'ELEMENTOR_MM_CUSTOMIZATIONS_PATH' ) ) {
	define( 'ELEMENTOR_MM_CUSTOMIZATIONS_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'ELEMENTOR_MM_CUSTOMIZATIONS_URL' ) ) {
	define( 'ELEMENTOR_MM_CUSTOMIZATIONS_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'ELEMENTOR_MM_CUSTOMIZATIONS_FILE' ) ) {
	define( 'ELEMENTOR_MM_CUSTOMIZATIONS_FILE', __FILE__ );
}

if ( ! class_exists( 'Elementor_MM_Customizations' ) ) {
	require_once ELEMENTOR_MM_CUSTOMIZATIONS_PATH . 'includes/class-elementor-mm-customizations.php';
}

global $elementor_mm_customizations;
$elementor_mm_customizations = new Elementor_MM_Customizations();
