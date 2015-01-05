/*Functions to be used in challenges.js */

//Post Token to Page
function postTokenHTML(tokens){
  token.result = tokens;
  for (var object in token.result){
    $("#token").append(HTMLTokenStart);
    var formattedToken = HTMLChallengeText.replace("%data%", token[object].result);
    $(".token:last").append(formattedToken);
  }
}

/* Stage I : Reverse a String Functions */
//reverse a string using JavaScript reverse method
function reverseString(string){
  str.result = string;
  console.log(str.result);
  for(var object in str.result){
    var reverseStr = str[object].result.split('').reverse().join('');
    postReverseHTML(str[object].result,reverseStr);
    string = reverseStr;
  }
  return string;
}

function postReverseHTML(origString, reverseString){
  $("#challenge1").append(HTMLChallenge1Start);
  var formattedOriginal = HTMLChallengeText.replace("%data%", origString)
  $(".challenge-1:last").append("Original String: " + formattedOriginal);
  var formattedReverse = HTMLChallengeText.replace("%data%", reverseString);
  $(".challenge-1:last").append("Reverse String: " + formattedReverse);
}

//Return and validate string
function returnString(tokens, string){
  url = "http://challenge.code2040.org/api/validatestring";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": tokens,
      "string" : string
    }),
    success: function(){ console.log("returnString: The string has been validated.");},
    dataType: "json",
    contentType: "application/json"
  });
}

/* Stage II : Needle In a Haystack */
//Find the needle in the array haystack, and return the index where the haystack is.
function findNeedle(needle, haystack){
  var length = haystack.length -1
  for(var i = 0; i < length; i++){
    var index = haystack.indexOf(needle);
    postNeedleHTML(haystack, index);
    return index;
  }
}

function postNeedleHTML(haystack, index){
  $("#challenge2").append(HTMLChallenge2Start);
  var formattedHaystack = HTMLChallengeText.replace("%data%",haystack);
  $(".challenge-2:last").append("Haystack: " + formattedHaystack);
  var formattedNeedle = HTMLChallengeText.replace("%data%", index);
  $(".challenge-2:last").append("The index location of the needle is: " + formattedNeedle);
}
//Return and validate needle
function returnNeedle(index,token){
  url = "http://challenge.code2040.org/api/validateneedle";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token,
      "needle": index
    }),
    success: function(){
      console.log("returnNeedle: Needle successfully validated.");
    },
    dataType: "json",
    contentType: "application/json"
  });
}

/* Stage III : Prefix Challenge */
//determine if prefix is in array element, if so discard that element and add all elements that do not contain that prefix
function isPrefix(prefix, array){
  var length = array.length;
  var strArray = [];
  var j = 0;
  var index ;
  console.log(prefix);
  for(var i=length-1; i>=0; i--){
    var value = array[i];
    if(((value.substring(0,3)) === prefix)){
      array.splice(i,1);
    }

  }
  console.log("isPrefix strArray length: ", length)
  console.log("isPrefix Array: ", array);
  postPrefixHTML(prefix, array);
  return array;
}
function postPrefixHTML(prefix, strArray){
  $("#challenge3").append(HTMLChallenge3Start);
  var formattedPrefix = HTMLChallengeText.replace("%data%", prefix);
  $(".challenge-3:last").append("The prefix is: " + formattedPrefix);
  var formattedPrefixArray = HTMLChallengeText.replace("%data%",strArray);
  $(".challenge-3:last").append("The new array without the prefix is: " + formattedPrefixArray);
}
//Return and validate array
function returnArray(NewArray,token){
  url = "http://challenge.code2040.org/api/validateprefix";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token,
      "array" : NewArray
    }),
    success: function(){
      console.log("returnArray: Array successfully validated.");
    },
    dataType: "json",
    traditional: true,
    contentType: "application/json"
  });
}
/*Stage IV: ISOTime Challenge */
function addTime(datestamp, interval){
  var newInterval = new Date(interval) ;
  newInterval *= 1000;
  console.log(newInterval);
  var newDate = new Date(datestamp);
  newDate = newDate.getTime();
  console.log(newDate);
  var newTime = new Date(newDate + newInterval);
  console.log(newTime.toISOString());
  postISOHTML(newTime.toISOString(), datestamp);
  return newTime.toISOString();

}

function postISOHTML(isoString, datestamp){
  $("#challenge4").append(HTMLChallenge4Start);
  var formattedTime= HTMLChallengeText.replace("%data%", datestamp);
  $(".challenge-4:last").append("The original time was: " + formattedTime);
  formattedTime= HTMLChallengeText.replace("%data%", isoString);
  $(".challenge-4:last").append("The new time is: " + formattedTime);
}

function returnISOTime(newDatestamp,token){
  url = "http://challenge.code2040.org/api/validatetime";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token,
      "datestamp" : newDatestamp
    }),
    success: function(){
      console.log("returnISOTime: New datestamp has been successfully validated.");
    },
    dataType: "json",
    traditional: true,
    contentType: "application/json"
  });
}
/* Check Grades : End of Challenges */
function checkGrades(token){

  $.ajax({
    type: "POST",
    url: "http://challenge.code2040.org/api/status",
    data: JSON.stringify({
      "token": token
    }),
    success: function(data){
      console.log("Grades " , data);
    },
    dataType: "json",
    traditional: true,
    contentType: "application/json"
  });
}
