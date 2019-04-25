// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can flip a coin for your experiment here
// Declare your variables here



/* Helper functions
*
*
*/

/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
}
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Compares the chosen answer to the value of `option1`
 const check_response = function(data, next) {
 $('input[name=answer]').on('change', function(e) {
        if (e.target.value === data.option1) {
            alert('Your answer is correct! Yey!');
        } else {
            alert('Sorry, this answer is incorrect :(');
        }
        next();
    });
};
// Declare your hooks here
