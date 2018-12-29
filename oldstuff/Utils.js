class FideFunctions{

static GetAllRatingsByAge(){
    let totalRating=0;
let counter = 0;

    for(let x =0;x<allValues.length;x++){
        let tmp =[];

tmp.push(parseInt(allValues[x].rating));
tmp.push(parseInt(allValues[x].birthday));
allFideRatings.push(tmp);
        }

for(let z=1918;z<2019;z++){

    for(let y =0;y<allFideRatings.length;y++){

        if(allFideRatings[y][1]==z){

            counter +=1;
            totalRating += allFideRatings[y][0];
        }
}
totalRating =totalRating/counter;

averageRatingObject[z] = totalRating;
totalRating=0;
counter =0;


}

return averageRatingObject;
}


}

module.exports = FideFunctions;