chrome.runtime.onInstalled.addListener(function () {
    // Initialize storage
    chrome.storage.local.get("trackedTitles", function (result) {
      if (!result.trackedTitles) {
        chrome.storage.local.set({ "trackedTitles": [] });
      }
    });
  });
  
  // Listen for changes in the tabs
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.title && tab.url.includes("://soundcloud.com")) {
      
      if (!tab.title.toLowerCase().includes("SoundCloud".toLowerCase())) {
        // console.log("Scrobbling:", tab.title);
        // // Add the title to the list of tracked titles
        // chrome.storage.local.get("trackedTitles", function (result) {
        //   const trackedTitles = result.trackedTitles || [];
        //   trackedTitles.push(tab.title);
        //   chrome.storage.local.set({ "trackedTitles": trackedTitles });
        // });
      }
    }
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractedInfo') {
    const song = request.data.song;
    console.log(song)

    chrome.storage.local.get("trackedTitles", function (result) {
      const trackedTitles = result.trackedTitles || [];
      trackedTitles.push(song);
      chrome.storage.local.set({ "trackedTitles": trackedTitles });
    });
  }
});