//var november18Json = require('./nov18.json');
//var september18Json = require('./dec18.json');
//var currentPlayers = september18Json.playerslist.player;
const median = require('median');
var averageRatingObject = {};
let thisJson = require(`./${MonthArray[x]}12.json`);
var currentPlayers = thisJson.playerslist.player;


function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [],
        count = [],
        i, number, maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }

    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }

    return modes;
}
//need to assign value to z
const currentYear = parseInt('20'+z);
const MonthArray = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
var allFideRatings = [];
var currTitle;

// for(let x=7;x<12;x++){
//     averageRatingObject = {};
//     let thisJson = require(`./${MonthArray[x]}12.json`);
//     var currentPlayers = thisJson.playerslist.player;
//     console.log(`const ${MonthArray[x]}12=`+JSON.stringify(CreateData(currentPlayers), null, 2)+';');
// }

function CreateData(allValues) {
    for (let x = 0; x < allValues.length; x++) {
        if (allValues[x].title != '') {
            let tmp = [];

            tmp.push(parseInt(allValues[x].rating));
            tmp.push(parseInt(allValues[x].birthday));
            tmp.push(allValues[x].title);
            tmp.push(allValues[x].sex);

            allFideRatings.push(tmp);
        }
    }


    for (let y = 0; y < allFideRatings.length; y++) {

        if (allFideRatings[y][2] != '' && !isNaN(parseFloat(allFideRatings[y][1]))) {

            currTitle = (allFideRatings[y][2]).toUpperCase();
            if(currTitle=='WF' || currTitle =='WC'){currTitle +='M'}
            if(currTitle =='WH'|| currTitle=='HM'){currTitle='HON'}
            let genderOption = allFideRatings[y][3];
            let currAge = (currentYear - allFideRatings[y][1]);


            if (averageRatingObject[currTitle] == undefined) {

                averageRatingObject[currTitle] = {
                    count: 1,
                    age: (currentYear - allFideRatings[y][1]),
                    mean: allFideRatings[y][0],
                    mode: [allFideRatings[y][0]],
                    ratingByAge : {},
                    highestRating: allFideRatings[y][0],
                    lowestRating:allFideRatings[y][0]
                  
                };

               
                averageRatingObject[currTitle].ratingByAge[currAge]={};
                averageRatingObject[currTitle].ratingByAge[currAge].averageRating =allFideRatings[y][0];
               // averageRatingObject[currTitle].ratingByAge[currAge].modeRating = [allFideRatings[y][0]];

                averageRatingObject[currTitle].ratingByAge[currAge].count =1;

                   

              //  averageRatingObject[currTitle].ratingByAge[currAge].rating = allFideRatings[y][0];
                

                if (genderOption == 'M') {
                    averageRatingObject[currTitle].gender = {
                        male: 1,
                        female: 0,
                        other: 0,
                    }
                }
                if (genderOption == 'F') {
                    averageRatingObject[currTitle].gender = {
                        male: 0,
                        female: 1,
                        other: 0,
                    }
                } else if (genderOption != 'F' && genderOption != 'M') {
                    averageRatingObject[currTitle].gender = {
                        male: 0,
                        female: 0,
                        other: 1,
                    }
                }


            } else {
                averageRatingObject[currTitle].count++;
                averageRatingObject[currTitle].age += (currentYear - allFideRatings[y][1]);
                averageRatingObject[currTitle].mean += allFideRatings[y][0];
                averageRatingObject[currTitle].mode.push(allFideRatings[y][0]);

                if(averageRatingObject[currTitle].ratingByAge[currAge]){
    
                    averageRatingObject[currTitle].ratingByAge[currAge].averageRating += allFideRatings[y][0];
                   // averageRatingObject[currTitle].ratingByAge[currAge].modeRating.push(allFideRatings[y][0]);
                    averageRatingObject[currTitle].ratingByAge[currAge].count +=1;
                }
                else{
                averageRatingObject[currTitle].ratingByAge[currAge] = {
                averageRating : allFideRatings[y][0],
                //modeRating:[allFideRatings[y][0]],
                count :1
            }
                }

                if (genderOption == 'M') {
                    averageRatingObject[currTitle].gender.male++;

                }
                if (genderOption == 'F') {
                    averageRatingObject[currTitle].gender.female++;
                } else if (genderOption != 'F' && genderOption != 'M') {
                    averageRatingObject[currTitle].gender.other++;

                }

                if(averageRatingObject[currTitle].highestRating < allFideRatings[y][0]){
                    averageRatingObject[currTitle].highestRating= allFideRatings[y][0];
                }
                if(averageRatingObject[currTitle].lowestRating > allFideRatings[y][0]){
                    averageRatingObject[currTitle].lowestRating = allFideRatings[y][0];
                }




            }


        }
    }

    for (let x = 0; x < Object.keys(averageRatingObject).length; x++) {
        let keyArray = Object.keys(averageRatingObject);
        keyValueRef = keyArray[x];
        averageRatingObject[keyValueRef].age =
            averageRatingObject[keyValueRef].age /
            averageRatingObject[keyValueRef].count;

        averageRatingObject[keyValueRef].mean =
            averageRatingObject[keyValueRef].mean /
            averageRatingObject[keyValueRef].count;

        averageRatingObject[keyValueRef].median =
            median(averageRatingObject[keyValueRef].mode);

        averageRatingObject[keyValueRef].mode =
            mode(averageRatingObject[keyValueRef].mode);

      let allAgesArr = Object.keys(averageRatingObject[keyValueRef].ratingByAge);

      for(let y=0;y<allAgesArr.length;y++){
        thisAge = allAgesArr[y];
        //  let modeRating =  mode(averageRatingObject[keyValueRef].ratingByAge[thisAge].modeRating);
         // let medianRating =  median(averageRatingObject[keyValueRef].ratingByAge[thisAge].modeRating);
          
          averageRatingObject[keyValueRef].ratingByAge[thisAge].averageRating =
          averageRatingObject[keyValueRef].ratingByAge[thisAge].averageRating
          /
          averageRatingObject[keyValueRef].ratingByAge[thisAge].count;

        //   averageRatingObject[keyValueRef].ratingByAge[thisAge].modeRating =
        //   modeRating;

        //   averageRatingObject[keyValueRef].ratingByAge[thisAge].medianRating =
        //   medianRating;

      }
    }
    allFideRatings = [];
    currTitle='';
    

    return averageRatingObject;
}
console.log(`const ${MonthArray[x]}12=`+JSON.stringify(CreateData(currentPlayers), null, 2)+';');










