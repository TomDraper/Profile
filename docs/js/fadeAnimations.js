const fadeCallback = (entries) => {
  for (const entry of entries) { // Loop over all elements that either enter or exit the view.
    //entry.target.classList.remove('scaleHidden');
    if (entry.isIntersecting) { // This is true when the element is in view.
      entry.target.classList.remove('fadeOut');
      entry.target.classList.add('fadeIn'); // Add a class.
    }
    else {
      entry.target.classList.remove('fadeIn'); // Remove the class when it is not in view.
      entry.target.classList.add('fadeOut');
    }
  }
}

let options = {
    root: null,
    rootMargin: "0%",
    threshold: 0.9
  };

let observer = new IntersectionObserver(fadeCallback, options);

const items = document.querySelectorAll(".fadeWhenInView");
for (const item of items) {
  observer.observe(item);
}