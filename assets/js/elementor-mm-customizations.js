/**
 * Mobile Navigation
 */
( function( $ ) {
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/nav-menu.default', function( $scope ) {
			/** Convert menu toggle to <button> */
			$btn = $scope.find( '.elementor-menu-toggle' );
			$btn.before( '<button type="button" class="elementor-menu-toggle" aria-label="Menu Toggle" aria-expanded="false">' + $btn.html() + '</button>' );
			$btn.remove();

			/** Make parent menu links act as links and not as toggle buttons. */
			$scope.find( '.menu-item-has-children > a' ).on( 'click', function( event ){
				event.stopPropagation();
			});

			/** Add toggle buttons for submenus. */
			$scope.find( '.elementor-nav-menu--dropdown .menu-item-has-children > a' ).each( function() {
				$link = $( this );

				$( this ).after( '<button class="submenu-toggle" aria-label="Open ' + $link.text() + ' submenu"><i class="eicon-caret-down"></i></button>' );

				$btn = $link.siblings( '.submenu-toggle' ).first();
				$submenu = $link.siblings( '.sub-menu' ).first();

				$link.removeAttr( 'aria-controls' );
				$link.removeAttr( 'aria-expanded' );

				$btn.attr( 'aria-controls', $submenu.attr( 'id' ) );
				$btn.attr( 'aria-expanded', 'false' );

				$submenu.attr( 'aria-labelledby', $btn.attr( 'id' ) );
			} );

			/** Add submenu toggle buttons functionality. */
			$scope.find( '.elementor-nav-menu--dropdown .submenu-toggle' ).on( 'click', function() {
				$btn = $( this );
				$link = $btn.siblings( '.menu-link' ).first();
				$submenu = $btn.siblings( '.sub-menu' ).first();

				if ( 'false' == $btn.attr( 'aria-expanded' ) ) {
					$btn.attr( 'aria-label', 'Close ' + $link.text() + ' submenu' );
					$btn.html( '<i class="eicon-caret-up"></i>' );
					$btn.attr( 'aria-expanded', 'true' );
					$submenu.attr( 'aria-expanded', 'true' );
					$submenu.attr( 'aria-hidden', 'false' );
					$submenu.slideDown();
					$submenu.children().children( 'a' ).attr( 'tabindex', '0' );
				} else {
					$btn.attr( 'aria-label', 'Open ' + $link.text() + ' submenu' );
					$btn.html( '<i class="eicon-caret-down"></i>' );
					$btn.attr( 'aria-expanded', 'false' );
					$submenu.attr( 'aria-expanded', 'false' );
					$submenu.attr( 'aria-hidden', 'true' );
					$submenu.slideUp();
					$submenu.children().children( 'a' ).attr( 'tabindex', '-1' );
				}
			} );
		} );
	});
} )( jQuery );

/**
 * Icon Box Widgets
 */
( function( $ ) {

	/** Remove (empty) link from icon. */
	$( window ).on( 'elementor/frontend/init', function() {
		$( '.elementor-widget-icon-box a.elementor-icon' ).each( function() {
			var $icon = $( this );
			$icon.after( '<span class="' + $icon.attr( 'class' ) + '">' + $icon.html() + '</span>' );
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
 * Toggle Widgets
 */
( function( $ ) {
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/toggle.default', function( $scope ) {

			/** Implement <details> on Elementor Toggle widgets. */
			$container = $scope.find( '.elementor-widget-container' );
			$scope.find( '.elementor-toggle-item' ).each( function() {
				$container.append(
					'<details>'
						+ '<summary>'
							+ $( this ).find( '.elementor-tab-title' ).text()
						+ '</summary>'
						+ '<div class="details-content">'
							+ $( this ).find( '.elementor-tab-content' ).html()
						+ '</div>'
					+ '</details>'
				);
			} );
			$scope.find( '.elementor-toggle' ).remove();

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

	/**
	 * Set focus on first tabbable element in popup after open it.
	 */
	$( document ).on( 'elementor/popup/show', ( event, id, instance ) => {
		instance.$element.find( ':tabbable' ).first().focus();
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

	$( document ).on( 'elementor/popup/show', ( event, id, instance ) => {
		$popup = $( '#elementor-popup-modal-' + id );
		focusableEls = $popup.find( ':tabbable' );
		firstFocusableEl = focusableEls.first();  
		lastFocusableEl = focusableEls.last();
		$( document ).on( 'keydown', trapFocus );
	} );

	$( document ).on( 'elementor/popup/hide', ( event, id, instance ) => {
		$( document ).off( 'keydown', trapFocus );
	} );

} )( jQuery );