var fs = require('fs');
const median = require('median');
var averageRatingObject = {};
var allFideRatings = [];
var currTitle;
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

  //clear vars for new iteration
  //let adjustedzzz=(z<10)?'0'+z:z;

 fs.readFile(`apr06frl.txt`, 'utf8', async function(err, contents) {    
 let ThisData = await contents;
 let rows = ThisData.split("\n");

 var parsedRows = rows.reduce((acc, row) => {
  var parsed = parseRow(row);
  acc[parsed.id] = parsed;
  return acc;
}, {});

//console.log(`const jan06 =[${JSON.stringify(parsedRows,null,2)}]`);
//parsedRows ={parsedRows};
var thisObjectKeys = Object.keys(parsedRows);

for(let y=0;y<thisObjectKeys.length;y++){
  var thisPlayer = parsedRows[thisObjectKeys[y]];

  if (thisPlayer.title != '' && thisPlayer.title !=undefined && thisPlayer.born !=0  && typeof thisPlayer.born =='number') {
  var tmp=[];
  tmp.push(parseInt(thisPlayer.grade));
  tmp.push(parseInt(thisPlayer.born));
  tmp.push(thisPlayer.title);
  allFideRatings.push(tmp);
  }
}
averageRatingObject = {};

for (let y = 0; y < allFideRatings.length; y++) {

  if (allFideRatings[y][2] != '' && !isNaN(parseFloat(allFideRatings[y][1]))) {

      currTitle = allFideRatings[y][2];
      //pre 2013 titling system just uses g instead of GM
switch (currTitle.trim()) {
  case 'm':
    currTitle = 'IM';
    break;
  case 'wm':
  currTitle = 'WIM';
  break;
  case 'wh':
  case 'h':
  case 'hg':
  currTitle = currTitle.toUpperCase();
  break;
  default:
  currTitle = (currTitle+'m').toUpperCase();
    break;
}

    
      let currAge = (2018 - allFideRatings[y][1]);


      if (averageRatingObject[currTitle] == undefined) {

          averageRatingObject[currTitle] = {
              count: 1,
              age: (2018 - allFideRatings[y][1]),
              mean: allFideRatings[y][0],
              mode: [allFideRatings[y][0]],
              ratingByAge : {},
              highestRating: allFideRatings[y][0],
              lowestRating:allFideRatings[y][0]
            
          };

         
          averageRatingObject[currTitle].ratingByAge[currAge]={};
          averageRatingObject[currTitle].ratingByAge[currAge].averageRating =allFideRatings[y][0];
          averageRatingObject[currTitle].ratingByAge[currAge].count =1;
      } 
      else {
          averageRatingObject[currTitle].count++;
          averageRatingObject[currTitle].age += (2018 - allFideRatings[y][1]);
          averageRatingObject[currTitle].mean += allFideRatings[y][0];
          averageRatingObject[currTitle].mode.push(allFideRatings[y][0]);

          if(averageRatingObject[currTitle].ratingByAge[currAge]){

              averageRatingObject[currTitle].ratingByAge[currAge].averageRating += allFideRatings[y][0];
              averageRatingObject[currTitle].ratingByAge[currAge].count +=1;
          }
          else{
          averageRatingObject[currTitle].ratingByAge[currAge] = {
          averageRating : allFideRatings[y][0],
          count :1
      }
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
    averageRatingObject[keyValueRef].ratingByAge[thisAge].averageRating =
    averageRatingObject[keyValueRef].ratingByAge[thisAge].averageRating
    /
    averageRatingObject[keyValueRef].ratingByAge[thisAge].count;
}
}

allFideRatings = [];
currTitle='';

console.log(`const apr06=`+JSON.stringify(averageRatingObject, null, 2)+';');

 });



 function parseRow(row) {
  const id = row.slice(0, 10).trim();
  const name = row.slice(10, 44).trim();
  const title = row.slice(44, 48).trim();
  const country = row.slice(48, 53).trim();
  const grade = row.slice(53, 60).trim();
  const games = row.slice(60, 64).trim();
  const born = row.slice(64, 70).trim();
  const flag = row.slice(70, 72).trim();
 
  return {
    id,
    name,
    title,
    country,
    grade: grade && parseInt(grade),
    games: games && parseInt(games, 10),
    born : born && parseInt(born, 10),
    flag
  }
}


