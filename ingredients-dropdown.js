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
			'END': 35,
			keyMap: {
				48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 190: "."
			}
		};

	[].forEach.call($buttons, function($button) {
		// Find the primary elements
		var $menu = document.getElementById($button.getAttribute('aria-controls')),
			$menuClosableElements = $menu.querySelectorAll(options.closable),
			$menuFocusableElements = $menu.querySelectorAll(options.focusable),
			$firstFocusableElement = $menuFocusableElements[0],
			$lastFocusableElement = $menuFocusableElements[$menuFocusableElements.length - 1];

		// Event Listening
		$button.addEventListener('click', _buttonClickListener);
		$button.addEventListener('keydown', _buttonKeyboardListener);
		
		// Listeners
		function _buttonClickListener() {
			if ($button.getAttribute('aria-expanded') == 'false') {
				open();
			}
			else {
				close();
			}	
		}
						
		function _buttonKeyboardListener(event) {
			switch (event.which) {	
				case keyCodes.ESCAPE :
					if ($button.getAttribute('aria-expanded') == 'true') {
						close();
						$button.focus();
					}
					break;
				
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
					var character = event.key;
					if ((character.length === 1) && (character.match(/\S/))) { // Is a printable character
						console.log(event.target);
						console.log(event.target.textContent.charAt(0));
						//setFocusByFirstCharacter(character);
					}
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
			document.addEventListener('click', _outsideClickListener);
			$menu.addEventListener('click', _menuClickListener);
			$menu.addEventListener('keydown', _menuKeyboardListener);
		}
			
		function close() {		
			$button.setAttribute('aria-expanded', 'false');
			$button.classList.remove(options.classOpened);
			$menu.classList.remove(options.classOpened);
			
			// Remove events on closing
			document.removeEventListener('click', _outsideClickListener);	
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