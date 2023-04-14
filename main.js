const $addButton = document.querySelector('.add');
const $modalContainer = document.querySelector('.modal-container');

// data.js
let data = {
  editing: null,
  entries: [],
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (e) {
  const jsonString = JSON.stringify(data);
  this.localStorage.setItem('entry - data', jsonString);
});
// parse data back in
const previousJson = localStorage.getItem('entry - data');
if (previousJson !== null) {
  data = JSON.parse(previousJson);
}
//

document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});

$addButton.addEventListener('click', e => {
  $modalContainer.className = 'modal-container';
});

const $form = document.querySelector('form');
const $tBodyList = document.querySelectorAll('tbody');

function renderEntry(entry) {
  for (let i = 0; i < $tBodyList.length; i++) {
    if ($tBodyList[i].getAttribute('data-view') === entry.day) {
      const tBody = $tBodyList[i];
      const $tr = document.createElement('tr');
      // $tr.className('tbody');

      const $td = document.createElement('td');
      $td.textContent = entry.time;
      // $td.className('time');
      const $td2 = document.createElement('td');
      // $td2.className('description');
      $td2.textContent = entry.description;

      $tr.appendChild($td);
      $tr.appendChild($td2);

      tBody.appendChild($tr);
    }
  }
  viewSwap(entry.day);
}

// const $select = document.querySelector('select');

$form.addEventListener('submit', e => {
  event.preventDefault();
  const userInput = {
    day: $form.elements.weekday.value,
    time: $form.elements.time.value,
    description: $form.elements.description.value,
    entryId: data.nextEntryId
  };
  data.entries.push(userInput);
  renderEntry(userInput);
  data.nextEntryId++;
  $modalContainer.className = 'modal-container hidden';
  $form.reset();
});

function viewSwap(string) {
  for (let i = 0; i < $tBodyList.length; i++) {
    if (string !== $tBodyList[i].getAttribute('data-view')) {
      $tBodyList[i].className = 'hidden';
    } else {
      $tBodyList[i].className = '';
    }
  }
  const $current = document.querySelector('.current-day');
  $current.textContent = string[0].toUpperCase() + string.slice(1);
}

const $dayButton = document.querySelector('.weekdays');

$dayButton.addEventListener('click', e => {
  if (e.target.tagName === 'P') {
    viewSwap(e.target.textContent.toLowerCase());
  }
});
