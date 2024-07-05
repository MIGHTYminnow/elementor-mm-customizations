# Elementor MM Customizations

List of accessibility enhancements:

## Mobile Navigation
- Convert menu toggle to \<button\>.
- Make parent menu links act as links and not as toggle buttons.
- Add toggle buttons for submenus.

## ~~Button Widgets~~ (Already fixed by Elementor).
- ~~Remove role="button" from links on Button Widgets.~~

## Icon Box Widgets
- Remove (empty) link from icon.

## Search Form Widgets

###  On fullscreen mode:
- Convert Search Form Toggle and Lightbox Close to \<button\>.
- Disallow focus on searchform fields when lightbox is closed to improve TABs navigation.
- Limit tab navigation to popup (don't allow to focus on elements outside the popup using tabs).

## ~~Tabs~~ (Already fixed by Elementor).
- ~~Fix the behavior of the Space key on the tabs widget.~~ (Already fixed by Elementor).

## Toggle
- Implement \<details\> on Elementor Toggle widgets.

## Elementor Popups
- Convert popup close button from \<div\> to \<button\>.
- Set focus on header logo after closing an Elementor Popup.
- Set focus on first tabbable element in popup after open it.
- Limit tab navigation to popup (don't allow to focus on elements outside the popup using tabs).

# How to test the plugin

Test each of the features twice:

- With the plugin disabled, to confirm if Elementor has not implemented it yet (if they implemented it, remove the feature).

- With the plugin enabled, to confirm it still works with the latest version.
