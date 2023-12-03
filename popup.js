document.addEventListener('DOMContentLoaded', function () {
  
  chrome.storage.local.get('trackedTitles', function (result) {
    const trackedTitles = result.trackedTitles || [];
    const trackedTitlesList = document.getElementById('trackedTitlesList');

    trackedTitles.forEach(function (title) {
      const listItem = document.createElement('li');
      listItem.textContent = title;
      trackedTitlesList.appendChild(listItem);
    });
  });
});
