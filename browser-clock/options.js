'use strict';

var is24Hour = document.querySelector('input[name=is24Hour]');
console.log('line 5' + timezoneOffset.value)
var whiteText = document.querySelector('input[name=whiteText]');
console.log(whiteText.value)

chrome.storage.sync.get('whiteText', function(settings) {
  whiteText.checked = !!settings.whiteTextSelector;
  console.log(whiteText.checked)
})

chrome.storage.sync.get('is24Hour', function(settings) {
  is24Hour.checked = !!settings.is24Hour;
  document.querySelector('#loading').setAttribute('done', 'true');
});

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.is24Hour) {
    is24Hour.checked = !!changes.is24Hour.newValue;
  }
  if (changes.whiteText) {
    console.log(changes.whiteText.newValue)
    whiteText.checked = !!changes.whiteText.newValue;
  }
});

whiteText.onchange = function() {
  chrome.storage.sync.set({whiteText: whiteText.checked});
}

is24Hour.onchange = function() {
  chrome.storage.sync.set({is24Hour: is24Hour.checked});
};
var defaultColor = "blue";

// stolen from https://julip.co/2010/01/how-to-build-a-chrome-extension-part-2-options-and-localstorage/
window.onload = function loadOptions() {
  console.log('loading options')
	chrome.storage.sync.get(['timezone'], function(result) {
    var timezoneOffset = result.timezone;
  });
	if (timezoneOffset == undefined) {
		timezoneOffset = 0;
	}
}

document.getElementById("saveOptions").addEventListener("click", function saveOptions() {
  console.log('tzone is ' + timezoneOffset.value)
  var selected = document.getElementById("timezoneOffset");
  console.log('saving option: ' + selected.value + ' is selected')
  chrome.storage.sync.set({'timezone': selected.value}, function(dat) {
    console.log('storage sync is ' + selected.value)
  });
  chrome.storage.sync.get(['timezone'], function(result) {
    console.log('Value currently is ' + result.timezone);
  });
  chrome.storage.sync.get(['whiteText'], function(result) {
    console.log('White text is set to ' + result.whiteText)
  })
  
})

document.getElementById("eraseOptions").addEventListener("click", function eraseOptions() {
  console.log('erasing options')
	localStorage.removeItem("timezoneOffset");
	location.reload();
})