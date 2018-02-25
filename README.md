# Ingredients-dropdown
An accessible dropdown widget, with no dependencies. No framework, no preprocessing, no transpiling : just some plain native HTML, CSS and Javascript !

Based on the design pattern described by this [WAI-ARIA Authoring Practices Document](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton)

Browsers compatibility :
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
