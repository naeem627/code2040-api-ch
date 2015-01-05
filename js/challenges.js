/*CODE 2040 Challenge Problems JS, Naeem Turner-Bandele January 2015 */
//Globals
var token = {};
var dictionary = {};
/* Register CODE2040 API  to complete Challenges*/
$.ajax({
  type: "POST",
  url: url,
  data: JSON.stringify({
    "email": email,
    "github": github
  }),
   success: function (data){
    console.log("Successfully posted email and github account.");
    dictionary.token = data;
    executeChallenges(dictionary.token);
  },
  dataType: "json",
  contentType: "application/json",
});

//Execute all challenges and pass the token along.
function executeChallenges(tokens){
  token.result = tokens;
  for(var obj in token.result){
    //Post Token to Page
    postTokenHTML(tokens);
    //Challenge #1
    getString(token[obj].result);
    //Challenge #2
    getNeedleHaystack(token[obj].result);
    //Challenge #3
    getPrefix(token[obj].result);
    //Challenge #4
    getISOTime(token[obj].result);

    //Check Grades
    checkGrades(token[obj].result);

  }
  console.log("Successfully passed all tokens!");

}


/* Stage I : Reverse a String */
var url;
var str ={ };
var string;
function getString(tokens){
  url = "http://challenge.code2040.org/api/getstring";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token" : tokens
    }),
    success: function(data){
      console.log("Retrieved string from CODE2040.");
      string = reverseString(data);
      console.log(string);
      returnString(tokens, string);
    },
    dataType: "json",
    contentType: "application/json"
  });
}


/* Stage II: Needle In a Haystack */
function getNeedleHaystack(token){
  url = "http://challenge.code2040.org/api/haystack";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token
    }),
    success: function(data){
      console.log("Token successfully entered for Stage II");
      for(var i in data){
        console.log("Needle: ", data[i].needle);
        console.log("Haystack: ", data[i].haystack);
        var value = findNeedle(data[i].needle, data[i].haystack);
        console.log(value);
        returnNeedle(value,token);
      }
    },
    dataType: "json",
    contentType: "application/json"
  });
}

/* Stage III: Prefix */
function getPrefix(token){
  url = "http://challenge.code2040.org/api/prefix";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token
    }),
    success: function(data){
      console.log("getPrefix: Successfully posted to Prefix.");
      for(var obj in data){
        var NewArray = [];
        console.log("Prefix: ", data[obj].prefix, "Array: ",data[obj].array);
        NewArray = isPrefix(data[obj].prefix, data[obj].array);
        console.log("Array to be returned: ", NewArray);
        returnArray(NewArray,token);
      }
    },
    dataType: "json",
    contentType: "application/json"
  });
}

/* Stage IV: The dating game */
function getISOTime(token){
  url = "http://challenge.code2040.org/api/time";
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      "token": token
    }),
    success: function(data){
      console.log("getTime: Time Successfully retrieved.");
      for(var obj in data){
        console.log("Datestamp: " , data[obj].datestamp);
        console.log("Interval: ", data[obj].interval);
        var datestamp = data[obj].datestamp;
        var interval = data[obj].interval;
        var newTime = addTime(datestamp, interval);
        console.log("The new datestamp is: " ,newTime );
        returnISOTime(newTime,token);
      }
    },
    dataType: "json",
    traditional: true,
    contentType: "application/json"
  });
}
