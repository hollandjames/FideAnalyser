const stats = require('./objectdump');
function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function calcPercentile(title,age,rating){

    let thisTitleObject = stats[title];

    thisTitleObject.ratingByAge[age].allRatings.push(rating);
let ratingArray=thisTitleObject.ratingByAge[age].allRatings;

function findFirstLargeNumber(element) {
    return element =rating;
  }
bubbleSort(ratingArray);
//console.log(ratingArray);
let indexOfRating = ratingArray.findIndex(findFirstLargeNumber);
let allIndexes = ratingArray.length;

let percentile = (100/allIndexes)/indexOfRating;

return percentile;

}

console.log(calcPercentile('GM',22,2500));