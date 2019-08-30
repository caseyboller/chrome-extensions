'use strict';

var is24Hour = document.querySelector('input[name=is24Hour]');
console.log('line 5' + timezoneOffset.value)

chrome.storage.sync.get('is24Hour', function(settings) {
  is24Hour.checked = !!settings.is24Hour;
  document.querySelector('#loading').setAttribute('done', 'true');
});

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.is24Hour) {
    is24Hour.checked = !!changes.is24Hour.newValue;
  }
});

is24Hour.onchange = function() {
  chrome.storage.sync.set({is24Hour: is24Hour.checked});
};
var defaultColor = "blue";

// stolen from https://julip.co/2010/01/how-to-build-a-chrome-extension-part-2-options-and-localstorage/
window.onload = function loadOptions() {
  console.log('loading options')
	var timezoneOffset = localStorage.getItem('timezoneOffset')
	if (timezoneOffset == undefined) {
		timezoneOffset = 0;
	}
}

document.getElementById("saveOptions").addEventListener("click", function saveOptions() {
  var selected = document.getElementById("timezoneOffset");
  console.log('saving option: ' + selected.value + ' is selected')
  localStorage.setItem("timezoneOffset", selected.value);
  console.log(localStorage.getItem('timezoneOffset') + ' is local storage')
})

document.getElementById("eraseOptions").addEventListener("click", function eraseOptions() {
  console.log('erasing options')
	localStorage.removeItem("timezoneOffset");
	location.reload();
})