function checkForm(elemId, msg, errorTag) {
  if (document.getElementById(elemId).value.length < 1) {
    document.getElementById(errorTag).innerHTML = msg;
    document.getElementById(errorTag).style = 
        "font-size: 10px; font-style: italic; color: red;";
    return false;
  }
  return true;
}

function checkConsentForm(elemId1) {
  if (checkForm(elemId1, "* Please enter your name!", "errorTag")) {
    window.location.href = "questionnaire-part-1.html";
  }
}

function checkInt(elemId, msg, errorTag) {
  if (isNaN(Number(document.getElementById(elemId).value.trim()))) {
    document.getElementById(errorTag).innerHTML = msg;
    document.getElementById(errorTag).style = 
        "font-size: 10px; font-style: italic; color: red;";
    return false;
  }
}

function checkRadioButtons(elemName, msg, errorTag) {
  var buttonGroup = document.getElementsByName(elemName);

  for(var i = 0; i < buttonGroup.length; i++) {
    if(buttonGroup[i].checked) {
      return true;
    }
  }
  
  document.getElementById(errorTag).innerHTML = msg;
  document.getElementById(errorTag).style = 
        "font-size: 10px; font-style: italic; color: red;";
  return false;
}

function checkEmptyComment(elemName, elemId, msg, errorTag) {
  var buttonGroup = document.getElementsByName(elemName);

  var checked = "0";
  for(var i = 0; i < buttonGroup.length; i++) {
    if(buttonGroup[i].checked) {
      checked = buttonGroup[i].value;
    }
  }
  
  if (document.getElementById(elemId).value.length < 1 && checked.length > 0 && checked === "2") {
    document.getElementById(errorTag).innerHTML = msg;
    document.getElementById(errorTag).style = 
        "font-size: 10px; font-style: italic; color: red;";
    return false;
  }
  return true;
}

/*
  msg - the error message displayed if no value.
  questions - the number of questions on the page (except the ones where radio buttons are
  used).
  rows - the number of radio button groups.
*/
function checkPart1(msg, questions, rows) {
  var next = true;
  if (checkInt("q6", "Please give a number!", "errorTag6")) {
    next = false;
  }
  for (var i = 1; i <= questions; i++) {
    if (!checkForm("q" + i.toString(), msg, "errorTag" + i.toString())) {
      next = false;
    }
  }
  
  for (var i = 1; i <= rows; i++) {
    if (!checkRadioButtons("row-" + i.toString(), msg, "row" + i.toString() + "ErrorTag")) {
      next = false;
    }
  }
  
  if (next) {
    window.location.href = "cm-sheet.html";
  }
}

/*
  msg - the error message displayed if no value.
  rows - the number of radio button groups.
*/
function checkPart2(msg, rows) {
  // Clear previous error messages.
  for (var i = 1; i <= rows; i++) {
    document.getElementById("row" + i.toString() + "ErrorTag").style = 
        "visibility: hidden;";
  }
  
  var next = true;
  for (var i = 1; i <= rows; i++) {
    if (!checkRadioButtons("row-" + i.toString(), msg, "row" + i.toString() + "ErrorTag")) {
      next = false;
    }
  }
  
  for (var i = 1; i <= rows; i++) {
    if (!checkEmptyComment("row-" + i.toString(), "text-row-" + i.toString(),
        "You selected 'No'. Why?", "row" + i.toString() + "ErrorTag")) {
      next = false;
    }
  }
  
  if (next) {
    window.location.href = "finish.html";
  }
}