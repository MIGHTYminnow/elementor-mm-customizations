<?php
/**
 * Elementor_MM_Customizations Main Class
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Elementor_MM_Customizations {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_assets' ) );
	}

	public function enqueue_assets() {
		wp_enqueue_script(
			'elementor-mm-customizations',
			ELEMENTOR_MM_CUSTOMIZATIONS_URL . 'assets/js/elementor-mm-customizations.js',
			array( 'jquery' ),
			ELEMENTOR_MM_CUSTOMIZATIONS_VERSION,
			true
		);
	}

}
