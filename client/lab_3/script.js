/* eslint-disable max-len */
/*
  Welcome to Javascript!

  This file contains parts of a simple script to make your carousel work.
  Please feel free to edit away - the main version of this with all the notes is safely stored elsewhere
*/
/* eslint-enable max-len */
// set our first slide's position to "0", the opening position in an array
let slidePosition = 0;

// gather a reference to every slide we're using via the class name and querySelectorAll
const slides = document.querySelectorAll('.carousel_item');

// change that "NodeList" into a Javascript "array", to get access to "array methods"
const slidesArray = Array.from(slides);

// Figure out how many slides we have available
const totalSlides = slidesArray.length;

function updateSlidePosition() {
  slidesArray.forEach(slide => {
    // loop through all the slides in your slideArray
    slide.classList.remove('visible');
    // and remove the 'visible' class from each classList
    slide.classList.add('hidden');
    // then add a class 'hidden' to all of them
  });

  console.log(slidePosition)
  slides[slidePosition].classList.add('visible'); 
  // add a 'visible' class to the slide at the current slidePosition in slides 
}

updateSlidePosition();

function moveToNextSlide() {
  if(slidePosition == totalSlides - 1){
    // if you're already at the max number of slides
    slidePosition = 0;
    // sets your slidePosition to the first index of an array
  } else {
    slidePosition += 1;
    // set the slidePosition to the current position plus one
  }

  updateSlidePosition(); // this is how you call a function within a function
}

function moveToPrevSlide() {
  if(slidePosition == 0){
    //if you're already at the first index position for an array
    slidePosition = totalSlides - 1;
    //sets your slidePosition to the last slide position in totalSlides
  } else {
    slidePosition -= 1;
    //set the slidePosition to the current position minus one
  }

  updateSlidePosition();
}

/*
  These two functions have been assigned via "addEventListener"
  to the elements accessed by the "querySelector" set to the class name on each
*/
document.querySelector('.next') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked next'); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });

document.querySelector('.prev')
  .addEventListener('click', () => {
      console.log('clicked prev');
      moveToPrevSlide();
  });