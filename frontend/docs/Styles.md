# Styles

## `/styles`

### `_variables.css`

This file defines CSS variables for colors and fonts that are used throughout the application.

- `--primary-color`, `--secondary-color`, `--primary-color-hover`, `--secondary-color-hover`, `--text-color`, and `--background-color` are color variables.
- `--primary-font` is a font variable.

### `main.css`

This is the main stylesheet that imports all other CSS files.

## `/styles/base`

### `_global.css`

This file contains global styles and resets for the entire document. It includes styles for `html`, `body`, and `button` elements.

### `_typography.css`

This file contains `@font-face` declarations for the 'Josefin Sans' font family in various styles and weights. It also sets the default font for `html` and `body` elements.

## `/styles/components`

### `_button.css`

This file contains the styles for different types of buttons in the application. It includes the base button style, hover and focus states, and a flat button style.

### `_calendar.css`

This file contains the styles for the calendar page and its components. It includes styles for the calendar page layout, the react calendar component, navigation within the calendar, and specific day tiles. It also includes styles for a popup modal and a repair list.

### `_card.css`

This file contains the styles for card components in the application. It includes styles for the card layout, car data, and icons within the card.

### `_form.css`

This file contains the styles for forms in the application. It includes styles for the form layout, form controls, error messages, and form actions. It also includes styles for checkboxes within the form.

### `_navbar.css`

This file styles the navigation bar, including the main bar, container, search input, and icon container.

### `_modal.css`

This file styles the modal components, including the overlay, content, buttons, and cancel button.

### `_copyButton.css`

## `/styles/pages`

This file contains the styles for the `CopyButton` component, including the succesfully copied information popup.

### `_dashboard.css`

This file styles the dashboard page, including the body, car list, cancel button, and responsive styles for smaller screens.

### `_editDetails.css`

This file styles the edit details page, including the container, go back arrow, input fields, save button, and responsive styles for smaller screens.

### `_login.css`

This file styles the login page, including the buttons and responsive styles for smaller screens and phones.

### `_notFound.css`

This file styles the not found page, including the container, header, text, and previous page icon.

## `/styles/utilities`

### `_helpers.css`

This file contains utility styles for icon buttons, including base styles, hover and focus states, and responsive adjustments for smaller screens.

### `_mixins.css`

This file defines CSS variables and utility classes for common styles, including flex center, flex column, flex row, box shadow, border radius, transition, and button base. It also includes hover and focus states for the button base.
