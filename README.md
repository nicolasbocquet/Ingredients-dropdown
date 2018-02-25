# Ingredients-dropdown
An accessible dropdown widget, with no dependencies. No framework, no preprocessing, no transpiling : just some plain classic HTML, CSS and Javascript !
Also, adding multiple dropdowns on a page will work.

Browser compatibilities :
IE11, Edge, Firefox, Chrome, Safari, etc

## Codepen Example
https://codepen.io/nicolas-bocquet/pen/OQQyxd

## HTML attributes requirements
Associate **aria-controls** attribute value on the button with the menu **id** attribute value
```
<elementButton aria-controls="X" ...></elementButton>
<elementMenu id="X" ...></elementMenu>
```

## CSS requirements
```
{menu selector} {
	display:none;
}

.isOpen {
	display:block;
}
```

## HTML / CSS default
* Attribute `data-dropdown="button"` on the element button
* Class `isOpen` is added on the element menu when opening it
