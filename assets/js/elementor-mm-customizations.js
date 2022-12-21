/**
 * Icon Box Widgets
 */
( function( $ ) {

	/** Remove (empty) link from icon. */
	$( window ).on( 'elementor/frontend/init', function() {
		$( '.elementor-widget-icon-box a.elementor-icon' ).each( function() {
			var $icon = $( this );
			$icon.after( '<span class="' + $icon.attr( 'class' ) + '">' + $icon.html() + '</a>' );
			$icon.remove();
		});
	} );

})( jQuery );

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

			/**
			 * Limit tab navigation to popup (don't allow to focus on elements outside
			 * the popup using tabs).
			 * 
			 * Based on https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
			 */

			var focusableEls;
			var firstFocusableEl;
			var lastFocusableEl;

			function trapFocus(e) {
				if ( e.originalEvent.key !== 'Tab' ) { 
					return; 
				}

				if ( e.originalEvent.shiftKey ) /* shift + tab */ {
					if (e.target === firstFocusableEl[0]) {
						lastFocusableEl.focus();
						e.preventDefault();
					}
				} else /* tab */ {
					if (e.target === lastFocusableEl[0]) {
						firstFocusableEl.focus();
						e.preventDefault();
					}
				}
			}

			$scope.find( '.elementor-search-form__toggle' ).on( 'click', function( event ) {
				$scope.find( '.elementor-search-form__input' ).one( 'focus', function() {
					$popup = $scope.find( '.elementor-search-form__container' );
					focusableEls = $popup.find( ':tabbable' );
					firstFocusableEl = focusableEls.first();  
					lastFocusableEl = focusableEls.last();
					$( document ).on( 'keydown', trapFocus );
					$( document ).on( 'keydown', function( event ) {
						if ( event.originalEvent.code == 'Enter' && event.target == $scope.find( '.elementor-search-form__input' )[0] ) {
							$scope.find( 'form' ).submit();
						}
					} );
				} );
			} );

			$scope.find( '.elementor-search-form__container' ).on( 'click', function( event ) {
				if ( event.target == $scope.find( '.elementor-search-form__container' )[0] ) {
					$( document ).off( 'keydown', trapFocus );
				}
			} );

			$scope.find( '.dialog-close-button' ).on( 'click', function( event ) {
				$( document ).off( 'keydown', trapFocus );
			} );
		} );
	} );
} )( jQuery );

/**
 * Elementor Popups
 */
( function( $ ) {

	/**
	 * Convert popup close button from <div> to <button>.
	 */
	$( document ).on( 'elementor/popup/show', ( event, id, instance ) => {
		$popup = $( '#elementor-popup-modal-' + id );

		if ( ! $popup.hasClass( 'elementor-popup-close-button-replaced' ) ) {
			$div = $popup.find( '.dialog-close-button' );
			$div.before( '<button class="' + $div.attr( 'class' ) + '">' + $div.html() + '</button>' );
			$div.remove();

			$popup.find( '.dialog-close-button' ).on( 'click', function( event ) {
				elementorFrontend.documentsManager.documents[ id ].getModal().hide();
			} );

			$popup.addClass( 'elementor-popup-close-button-replaced' );
		}
	} );

	/**
	 * Set focus on header logo after closing an Elementor Popup.
	 */
	$( document ).on( 'elementor/popup/hide', ( event, id, instance ) => {
		$( '.site-title a' ).focus();
	} );

} )( jQuery );