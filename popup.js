document.getElementById('shareTab').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (tab.url === "chrome-extension://aceopacgaepdcelohobicpffbbejnfac/accessBarrier.html") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractTeachers
      }, function(results) {
        if (results && results[0] && results[0].result) {
          displayTeachers(results[0].result);
        }
      });
    } else {
      alert("Please navigate to the Hapara access barrier page first.");
    }
  });
});

function extractTeachers() {
  var text = document.body.innerText;
  var lines = text.split('\n');
  var teachers = [];
  for (var line of lines) {
    line = line.trim();
    if (line.startsWith('Teacher ') && !line.includes('(offline)')) {
      var name = line.replace('Teacher ', '').replace('Select', '').trim();
      teachers.push(name);
    }
  }
  return teachers;
}

function displayTeachers(teachers) {
  var list = document.getElementById('teacherList');
  list.innerHTML = '';
  for (var teacher of teachers) {
    var li = document.createElement('li');
    li.textContent = teacher;
    list.appendChild(li);
  }
}