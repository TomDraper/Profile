// Source - https://stackoverflow.com/a/60290295
// Posted by Emiel Zuurbier
// Retrieved 2026-02-23, License - CC BY-SA 4.0

/**
 * What to do when an item enters the screen
 * If it is in the screen, isIntersecting will be true.
 * Add a class when it is.
 */
const scaleCallback = (entries) => {
  for (const entry of entries) { // Loop over all elements that either enter or exit the view.
    //entry.target.classList.remove('scaleHidden');
    if (entry.isIntersecting) { // This is true when the element is in view.
      entry.target.classList.remove('hidden');
      entry.target.classList.add('scaleIn'); // Add a class.
    }
    else {
      entry.target.classList.remove('scaleIn'); // Remove the class when it is not in view.
      entry.target.classList.add('hidden');
    }
  }
}

const scaleAndFadeCallback = (entries) => {
  for (const entry of entries) { // Loop over all elements that either enter or exit the view.
    //entry.target.classList.remove('scaleHidden');
    if (entry.isIntersecting) { // This is true when the element is in view.
      //entry.target.classList.remove('hidden');
      entry.target.classList.add('scaleInAndFadeIn'); // Add a class.
    }
    else {
      entry.target.classList.remove('scaleInAndFadeIn'); // Remove the class when it is not in view.
      //entry.target.classList.add('hidden');
    }
  }
}

/**
 * Create a observer and use the instersectionCallback as 
 * the instructions for what to do when an element enters
 * or leaves the view
 */
const cardObserver = new IntersectionObserver(scaleCallback);
const cardContentObserver = new IntersectionObserver(scaleAndFadeCallback);

/**
 * Get all .item elements and loop over them.
 * Observe each individual item.
 */
const items = document.querySelectorAll(".card, .cardLeft, .cardRight, .cardTop, .galleryCard");
for (const item of items) {
  cardObserver.observe(item);
}

const itemsContent = document.querySelectorAll('.cardInternal');
for (const item of itemsContent) {
  cardContentObserver.observe(item);
}