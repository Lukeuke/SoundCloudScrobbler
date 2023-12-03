chrome.runtime.onInstalled.addListener(function () {
    // Initialize storage if needed
    chrome.storage.local.get("trackedTitles", function (result) {
      if (!result.trackedTitles) {
        chrome.storage.local.set({ "trackedTitles": [] });
      }
    });
  });
  
  // Listen for changes in the tabs
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.title && tab.url.includes("://soundcloud.com")) {
      
      if (!tab.title.includes("SoundCloud")) {
        console.log("Scrobbling:", tab.title);
        // Add the title to the list of tracked titles
        chrome.storage.local.get("trackedTitles", function (result) {
          const trackedTitles = result.trackedTitles || [];
          trackedTitles.push(tab.title);
          chrome.storage.local.set({ "trackedTitles": trackedTitles });

          chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'extractedInfo') {
              const { songTitle, artistName } = request.data;
          
              // Log the extracted information (you can modify this part as needed)
              console.log(`Song Title: ${songTitle}`);
              console.log(`Artist: ${artistName}`);
            }
          });

        //   fetch('https://cat-fact.herokuapp.com/facts').then((res) => {
        //     let body = res.json()
        //     console.log(body)
        //   })
        });
      }
    }
  });
  