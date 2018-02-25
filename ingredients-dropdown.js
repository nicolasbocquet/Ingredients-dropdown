// Dropdown Accessible
function ingredientsDropdown() {
	"use strict";
	
	var options = {
		buttonSelector : '[data-dropdown="button"]',
		classOpened : 'isOpen'
	};

	var $buttons = document.querySelectorAll(options.buttonSelector),
		focusable = '[href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
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
		
	$buttons.forEach(function($button) {
		// Find the primary elements
		var $menu = document.getElementById($button.getAttribute('aria-controls')),
			$menuFocusableElements = $menu.querySelectorAll(focusable),
			$firstFocusableElement = $menuFocusableElements[0],
			$lastFocusableElement = $menuFocusableElements[$menuFocusableElements.length - 1];

		// Event Listening
		$button.addEventListener('mousedown', _buttonClickListener);
		$button.addEventListener('touchstart', _buttonClickListener);
		$button.addEventListener('keydown', _buttonKeyboardListener);
				
		// Listeners
		function _buttonKeyboardListener(event) {	
			if (!$button.getAttribute('aria-expanded')) {						
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
			}
			else {
				switch (event.which) {
					case keyCodes.ESCAPE :
						close();
						$button.focus();
						break;
				}
			}
		}
		
		function _buttonClickListener() {
			if ($button.getAttribute('aria-expanded')) {
				close();
			}
			else {
				open();
			}	
		}
		
		function _insideKeyboardListener(event) {	
			switch (event.which) {
				case keyCodes.ESCAPE :
						close();
						$button.focus();
					break;
					
				case keyCodes.ENTER :
					close();
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
			document.addEventListener('mousedown', _outsideClickListener, true);
			document.addEventListener('touchstart', _outsideClickListener, true);
			$menu.addEventListener('keydown', _insideKeyboardListener, true);
		}
			
		function close() {		
			$button.removeAttribute('aria-expanded');
			$button.classList.remove(options.classOpened);
			$menu.classList.remove(options.classOpened);
			
			// Remove events on closing
			document.removeEventListener('mousedown', _outsideClickListener, true);	
			document.removeEventListener('touchstart', _outsideClickListener, true);
			$menu.removeEventListener('keydown', _insideKeyboardListener, true);
		}	
	
		function focusMenuItem(target, event) {
			event.preventDefault();
			
			var	index = Array.prototype.indexOf.call($menuFocusableElements, event.target), // indexOf can't read an nodeList
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