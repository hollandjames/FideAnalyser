
var t= Date.now();
var fs = require('fs');
xml2js = require('xml2js');
var allValues;

var parser = new xml2js.Parser();

const MonthArray = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];


    

fs.readFile(__dirname + `/standard_aug12frl_xml.xml`, function(err, data) {
    parser.parseString(data, function (err, result) {
   allValues = result;
    });
    fs.writeFile(

        `./aug12.json`,
    
        JSON.stringify(allValues),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );
});
    




