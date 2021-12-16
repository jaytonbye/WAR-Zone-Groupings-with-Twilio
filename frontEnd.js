//TODO
// Write a function that takes the 6 parameters
// Make the button click read the 6 inputs and run the function

let wrestlerArray;

fetch("newOutput.json")
  .then((result) => {
    return result.json();
  })
  .then((otherResult) => {
    wrestlerArray = otherResult;

    //sets up my autocompletes:
    for (x = 0; x < wrestlerArray.length; x++) {
      $("#specificWrestlerDatalist").append(
        `<option>${wrestlerArray[x][1]}</option>`
      );
    }

    $("#submitButton").click(() => {
      let minWeight = $("#minimumWeightInput").val();
      let maxWeight = $("#maximumWeightInput").val();
      let minWAR = $("#minimumWARInput").val();
      let maxWAR = $("#maximumWARInput").val();
      let minAge = $("#minimumAgeInput").val();
      let maxAge = $("#maximumAgeInput").val();
      grabTheWrestlers(minWeight, maxWeight, minWAR, maxWAR, minAge, maxAge);
    });

    $("#submitButtonForSpecificWrestler").click(() => {
      let weightPercentage = $("#percentageOfWeightInput").val();
      let WARDifference = $("#WARRangeInput").val();
      let agePercentage = $("#percentageOfAgeInput").val();
      let name = $("#specificWrestler").val();
      grabWrestlersForSpecificWrestler(
        weightPercentage,
        WARDifference,
        agePercentage,
        name
      );
    });

    $("#sendMassTextButton").click(() => {
      alert("do something");
    });

    let grabWrestlersForSpecificWrestler = (
      weightPercentage,
      WARDifference,
      agePercentage,
      name
    ) => {
      $("#tbody").empty();
      let resultArray = [];
      let theSpecificWrestlersWeight;
      let theSpecificWrestlersWAR;
      let theSpecificWrestlersAge;
      let theSpecificWrestlersName;

      //finds the weight, WAR, and age of the specific wrestler
      for (x = 0; x < wrestlerArray.length; x++) {
        if (wrestlerArray[x][1] === name) {
          theSpecificWrestlersName = wrestlerArray[x][1];
          theSpecificWrestlersWeight = parseFloat(wrestlerArray[x][2]);
          theSpecificWrestlersWAR = parseFloat(wrestlerArray[x][4]);
          theSpecificWrestlersAge = parseFloat(wrestlerArray[x][3]);
        }
      }

      let minWeight =
        theSpecificWrestlersWeight -
        (theSpecificWrestlersWeight * weightPercentage) / 100;
      console.log(minWeight);
      let maxWeight =
        theSpecificWrestlersWeight +
        (theSpecificWrestlersWeight * weightPercentage) / 100;
      console.log(maxWeight);
      let minWAR = theSpecificWrestlersWAR - Number(WARDifference);
      let maxWAR = theSpecificWrestlersWAR + Number(WARDifference);
      console.log(maxWAR);
      let minAge =
        theSpecificWrestlersAge -
        (theSpecificWrestlersAge * agePercentage) / 100;
      let maxAge =
        theSpecificWrestlersAge +
        (theSpecificWrestlersAge * agePercentage) / 100;

      grabTheWrestlers(minWeight, maxWeight, minWAR, maxWAR, minAge, maxAge);
    };

    let grabTheWrestlers = (
      minWeight,
      maxWeight,
      minWAR,
      maxWAR,
      minAge,
      maxAge
    ) => {
      let resultArray = [];
      for (x = 0; x < wrestlerArray.length; x++) {
        if (
          parseFloat(wrestlerArray[x][2]) >= minWeight &&
          parseFloat(wrestlerArray[x][2]) <= maxWeight &&
          parseFloat(wrestlerArray[x][4]) >= minWAR &&
          parseFloat(wrestlerArray[x][4]) <= maxWAR &&
          parseFloat(wrestlerArray[x][3]) >= minAge &&
          parseFloat(wrestlerArray[x][3]) <= maxAge
        ) {
          resultArray.push(wrestlerArray[x]);
        }
      }

      $("#tbody").empty();
      for (x = 0; x < resultArray.length; x++) {
        $("#tbody").append(
          `<tr><td>${resultArray[x][1]}</td><td>${resultArray[x][2]}</td><td>${resultArray[x][4]}</td><td>${resultArray[x][3]}</td></tr>`
        );
      }
    };
  });
