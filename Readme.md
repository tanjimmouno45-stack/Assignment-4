What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
​These methods are used to target HTML elements in the DOM, but they differ in selection criteria, return types, and performance:
​getElementById('id'): Finds a single element by its unique ID. It returns a single DOM element (or null) and is the fastest method.
​getElementsByClassName('class'): Selects all elements with a given class name. It returns a live HTMLCollection, meaning if elements are added/removed from the DOM later, the collection updates automatically.
​querySelector('css-selector'): Takes any CSS selector (like .btn, #main, div > p) and returns the first matching element.
​querySelectorAll('css-selector'): Takes a CSS selector and returns a static NodeList of all matching elements. Unlike an HTMLCollection, a static NodeList does not automatically update when the DOM changes, but it does support built-in array methods like .forEach().

How do you create and insert a new element into the DOM?
​To create and insert an element using vanilla JavaScript, you follow a three-step process: create the element, add content/attributes, and append it to an existing parent node.

// 1. Create the element
const newDiv = document.createElement('div');

// 2. Set content or attributes
newDiv.textContent = 'Hello World';
newDiv.classList.add('card');

Alternatively, insertBefore() or insertAdjacentElement() can be used to insert elements at specific positions relative to other nodes.

// 3. Attach it to a parent in the DOM
const container = document.getElementById('container');
container.appendChild(newDiv); 
// Or use container.append(newDiv) / container.prepend(newDiv)

What is Event Bubbling? And how does it work?
​Event Bubbling is a mechanism in the DOM where an event (like a click) first runs on the target element that triggered it, and then "bubbles up" through its parent elements all the way to the document and window objects.
​How it works:
​You click a <button> nested inside a <div> which is inside a <section>.
​The click event triggers on the <button> first.
​Next, the event triggers on the <div> handler (if any exists).
​Then it moves up to the <section>, <body>, html, and document.
​Most DOM events bubble by default (e.g., click, keydown, submit), though a few do not (e.g., focus, blur, mouseenter, mouseleave).

What is Event Delegation in JavaScript? Why is it useful?
​Event Delegation is a pattern where instead of attaching an event listener to multiple child elements individually, you attach a single listener to a common parent element. It relies on Event Bubbling to catch events triggered by child nodes.
​Why it's useful:
​Memory Efficiency: Reduces memory overhead by attaching one event listener instead of dozens or hundreds (e.g., in a long <ul> list).
​Dynamic Elements: Automatically handles dynamically created elements. If new child elements are added to the DOM later, you don't need to bind new event listeners to them.
​Example:
document.getElementById('parent-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked item:', e.target.textContent);
  }
});

What is the difference between preventDefault() and stopPropagation() methods?
​Both methods are used inside event handlers to control default behaviors and event flow, but they do completely different things:
​e.preventDefault(): Stops the browser's default action for that event. It does not stop event propagation/bubbling.
​Example: Preventing a form from submitting and refreshing the page, or preventing a link (<a>) from navigating to a URL.
​e.stopPropagation(): Prevents the event from bubbling up the DOM tree to parent elements.
​Example: Clicking a modal's close button without triggering click handlers attached to the overlay background behind it
