'use strict';

var is24Hour = document.querySelector('input[name=is24Hour]');
var timezoneOffset = document.querySelector('input[name=timezoneOffset]');
console.log('line 5' + timezoneOffset.value)

chrome.storage.sync.get('is24Hour', function(settings) {
  is24Hour.checked = !!settings.is24Hour;
  document.querySelector('#loading').setAttribute('done', 'true');
});

chrome.storage.sync.get('timezoneOffset', function(settings) {
  
  if (!!settings.timezoneOffset) {
    console.log('!!settings timezoneval' + timezoneOffset.value)
  }
  document.querySelector('#loading').setAttribute('done', 'true');
});

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.is24Hour) {
    is24Hour.checked = !!changes.is24Hour.newValue;
  }
  if (changes.timezoneOffset) {
    console.log('If changes!! new val: ' + changes.timezoneOffset.newValue);
    timezoneOffset = changes.timezoneOffset.newValue;
  }
});

is24Hour.onchange = function() {
  chrome.storage.sync.set({is24Hour: is24Hour.checked});
};

timezoneOffset.onchange = function() {
  alert(timezoneOffset.value);
  chrome.storage.sync.set({timezoneOffset: timezoneOffset.value});
}