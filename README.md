# Elementor MM Customizations

List of accessibility enhancements:

## Button Widgets
- Remove role="button" from links on Button Widgets.

## Icon Box Widgets
- Remove (empty) link from icon.

## Search Form Widgets

###  On fullscreen mode:
- Convert Search Form Toggle and Lightbox Close to \<button\>.
- Disallow focus on searchform fields when lightbox is closed to improve TABs navigation.
- Limit tab navigation to popup (don't allow to focus on elements outside the popup using tabs).

## Tabs
- ~~Fix the behavior of the Space key on the tabs widget.~~ (Already fixed by Elementor).

## Toggle
- Implement \<details\> on Elementor Toggle widgets.

## Elementor Popups
- Convert popup close button from \<div\> to \<button\>.
- Set focus on header logo after closing an Elementor Popup.
- Set focus on first tabbable element in popup after open it.
- Limit tab navigation to popup (don't allow to focus on elements outside the popup using tabs).
