/**
 * Search Form Widget (Full Screen)
 */
( function( $ ) {
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/search-form.default', function( $scope ) {
			/** Convert Search Form Toggle and Lightbox Close to <button> */
			$scope.find( '.elementor-search-form__toggle, .dialog-lightbox-close-button' ).each( function() {
				$( this ).before( '<button class="' + $( this ).attr( 'class' ) + '">' + $( this ).html() + '</button>' );
				$( this ).remove();
			});
			$scope.find( '.elementor-search-form__toggle, .dialog-lightbox-close-button' ).on( 'click', function( event ) {
				event.preventDefault();
			} );
			$scope.find( '.elementor-search-form__input' ).each( function() {
				$( this ).after( '<button tabindex="-1" class="screen-reader-text elementor-search-form__submit" type="submit">Submit search</button>' );
			} );

			/** Disallow focus on searchform fields when lightbox is closed to improve TABs navigation. */
			$scope.find( '.elementor-search-form__input' ).attr( 'tabindex', '-1' );
			$scope.find( '.elementor-search-form__toggle' ).on( 'click', function( event ) {
				if ( $scope.find( '.elementor-search-form__container').hasClass( 'elementor-lightbox' ) ) {
					$scope.find( '.elementor-search-form__input' ).attr( 'tabindex', '-1' );
				} else {
					$scope.find( '.elementor-search-form__input' ).attr( 'tabindex', '0' );
				}
			} );
			$scope.find( '.elementor-search-form__container' ).on( 'click', function( event ) {
				$scope.find( '.elementor-search-form__input' ).attr( 'tabindex', '-1' );
			} );
		} );
	} );
} )( jQuery );
