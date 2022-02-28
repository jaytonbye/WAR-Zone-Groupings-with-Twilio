//TODO
// Write a function that takes the 6 parameters
// Make the button click read the 6 inputs and run the function

let wrestlerArray;
let resultArray = [];

let onChangeTextMessage = () => {
  $("#characterCount").empty();
  $("#characterCount").append(
    `Character Count: ${$("#messageToSend").val().length}.`
  );
};

$("#messageToSend").change(() => {
  onChangeTextMessage();
});

$("#loadDataButton").click(() => {
  fetch("/getData").then((res) => {
    if (res.ok) {
      alert(`The data is loaded!`);
      //I force a reload so that the page loads the new data
      location.reload();
    } else {
      alert(`Something didn't work... The wrestler list is not current`);
    }
  });
});

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
      resultArray = [];
      let minWeight = $("#minimumWeightInput").val();
      let maxWeight = $("#maximumWeightInput").val();
      let minWAR = $("#minimumWARInput").val();
      let maxWAR = $("#maximumWARInput").val();
      let minAge = $("#minimumAgeInput").val();
      let maxAge = $("#maximumAgeInput").val();
      grabTheWrestlers(minWeight, maxWeight, minWAR, maxWAR, minAge, maxAge);
    });

    $("#submitButtonForSpecificWrestler").click(() => {
      resultArray = [];
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

    let grabWrestlersForSpecificWrestler = (
      weightPercentage,
      WARDifference,
      agePercentage,
      name
    ) => {
      $("#tbody").empty();
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

      let maxWeight =
        theSpecificWrestlersWeight +
        (theSpecificWrestlersWeight * weightPercentage) / 100;

      let minWAR = theSpecificWrestlersWAR - Number(WARDifference);
      let maxWAR = theSpecificWrestlersWAR + Number(WARDifference);

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
          `<tr><td>${resultArray[x][1]}</td><td>${resultArray[x][2]}</td><td>${resultArray[x][4]}</td><td>${resultArray[x][3]}</td><td>${resultArray[x][5]}</td><td>${resultArray[x][6]}</td></tr>`
        );
      }
    };

    let requestOptions;
    $("#sendMassTextButton").click(() => {
      alert("attempting to send mass text");
      if ($("#thePassword").val() === "fakepassword") {
        console.log(resultArray);
        for (let x = 0; x < resultArray.length; x++) {
          if (resultArray[x][5]) {
            requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                textMessageBody: `${$("#messageToSend").val()}`,
                toPhoneNumber: `+1${resultArray[x][5]}`,
              }),
            };
            fetch(`/sendMessage`, requestOptions).then((res) => {
              if (res.ok) {
                console.log({ x });
                //why is it x-1 instead of x?
                console.log(`Text sent to ${resultArray[x][1]}!`);
              } else {
                alert(
                  `The text was NOT sent to ${resultArray[x][1]}, something went wrong...`
                );
              }
            });
          }
        }
        alert("done sending the texts (if it even worked)!");
      } else {
        alert(
          "Incorrect Password. You are not authorized to use this tool. Piss off!"
        );
      }
    });
  });
