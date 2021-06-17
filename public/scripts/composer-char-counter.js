$(document).ready(function() {
  // --- our code goes here ---

  /**
   * The following lines of code is made in reference from this site:
   *  https://codepen.io/zabielski/pen/gPPywv
   *  https://stackoverflow.com/questions/12742595/show-how-many-characters-remaining-in-a-html-text-box-using-javascript/12742721
   *  http://jsfiddle.net/r34gM/1/
   * 
   * Counts the number of chars available to be filled in the textarea
   */

  $('textarea').keyup(function() {
    let characterCount = $(this).val().length,
      currentNumChar = $('.counter');

      // Updates the html doc for the remainder of number of chars available
      currentNumChar.text(140 - characterCount);

      // Updates the counter color when number of characters exceed the given limit
      if (characterCount > 140) {
        currentNumChar.css('color', 'red');
      }

      // Updates the counter color when user deletes the excess characters
      if (characterCount <= 140) {
        currentNumChar.css('color', '#545149');
      }
  });
});