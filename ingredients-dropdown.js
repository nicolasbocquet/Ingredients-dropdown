// Dropdown Accessible
function ingredientsDropdown() {
	"use strict";
	
	var options = {
		buttonSelector : '[data-dropdown="button"]',
		classOpened : 'isOpen',
		focusable : '[href], input:not([type="hidden"]), button, select, textarea, [tabindex]:not([tabindex="-1"])',
		closable : '[href], [type="button"], [type="submit"]'
	};

	var $buttons = document.querySelectorAll(options.buttonSelector),
		keyCodes = {
		  'TAB': 9,
		  'ENTER': 13,
		  'ESCAPE': 27,
		  'SPACE': 32,
		  'UP': 38,
		  'DOWN': 40,
		  'HOME': 36,
		  'END': 35
		};
		
	[].forEach.call($buttons, function($button) {
		// Find the primary elements
		var $menu = document.getElementById($button.getAttribute('aria-controls')),
			$menuClosableElements = $menu.querySelectorAll(options.closable),
			$menuFocusableElements = $menu.querySelectorAll(options.focusable),
			$firstFocusableElement = $menuFocusableElements[0],
			$lastFocusableElement = $menuFocusableElements[$menuFocusableElements.length - 1];

		// Event Listening
		$button.addEventListener('mousedown', _buttonClickListener);
		$button.addEventListener('keydown', _buttonKeyboardListener);
		
		// Listeners
		function _buttonClickListener() {
			if (!$button.getAttribute('aria-expanded')) {
				open();
			}
			else {
				close();
			}	
		}
						
		function _buttonKeyboardListener(event) {
			switch (event.which) {		
				case keyCodes.ENTER :
				case keyCodes.SPACE :
				case keyCodes.DOWN :
					open();
					focusMenuItem("first", event);
					break;
				
				case keyCodes.UP :
					open();
					focusMenuItem("last", event);				
					break;
			}
			
			if ($button.getAttribute('aria-expanded')) {
				switch (event.which) {
					case keyCodes.ESCAPE :
						close();
						$button.focus();
						break;
				}
			}
		}
		
		function _menuClickListener(event) {
			var isClosable = [].indexOf.call($menuClosableElements, event.target) !== -1; // .matches() polyfill
			
			if(isClosable) {
				close();
			}
		}
		
		function _menuKeyboardListener(event) {
			switch (event.which) {
				case keyCodes.ESCAPE :
					close();
					$button.focus();
					break;

				case keyCodes.DOWN :
					focusMenuItem("next", event);
					break;
				
				case keyCodes.UP :
					focusMenuItem("previous", event);
					break;
					
				case keyCodes.END :
					focusMenuItem("last", event);
					break;
					
				case keyCodes.HOME :
					focusMenuItem("first", event);
					break;
					
				case event.shiftKey && keyCodes.TAB :
					if (event.target === $firstFocusableElement ) {
						event.preventDefault();
						close();
						$button.focus();
					}
					break;	
										
				case keyCodes.TAB : 
					if (event.target === $lastFocusableElement ) {
						event.preventDefault();
						close();
						$button.focus();
					}	
					break;
										
				default :
					// Todo : Selection by chars
					break;			
			}
			
		}
		
		function _outsideClickListener(event) {
			if (!$menu.contains(event.target) && !$button.contains(event.target)) {
				close();
			}
		}
		
		// Functions
		function open() {
			$button.setAttribute('aria-expanded', 'true');
			$button.classList.add(options.classOpened);
			$menu.classList.add(options.classOpened);
			
			// Add events on opening
			document.addEventListener('mousedown', _outsideClickListener);
			$menu.addEventListener('click', _menuClickListener);
			$menu.addEventListener('keydown', _menuKeyboardListener);
		}
			
		function close() {		
			$button.removeAttribute('aria-expanded');
			$button.classList.remove(options.classOpened);
			$menu.classList.remove(options.classOpened);
			
			// Remove events on closing
			document.removeEventListener('mousedown', _outsideClickListener);	
			$menu.removeEventListener('click', _menuClickListener);
			$menu.removeEventListener('keydown', _menuKeyboardListener);
		}	
	
		function focusMenuItem(target, event) {
			event.preventDefault();
			
			var	index = [].indexOf.call($menuFocusableElements, event.target), // indexOf can't read an nodeList
				$previousFocusableElement = $menuFocusableElements[index - 1],
				$nextFocusableElement = $menuFocusableElements[index + 1];
			
			switch (target) {
				case "first" :
					$firstFocusableElement.focus();
					break;
					
				case "last" :
					$lastFocusableElement.focus();
					break;
					
				case "previous" :					
					if (event.target === $firstFocusableElement) {
						$lastFocusableElement.focus();
					}
					else {
						$previousFocusableElement.focus();
					}
					break;
					
				case "next" :
					if (event.target === $lastFocusableElement){
						$firstFocusableElement.focus();
					}
					else {
						$nextFocusableElement.focus();		
					}
					break;
			}
		}
	});	
}