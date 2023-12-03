chrome.runtime.onInstalled.addListener(function () {
    // Initialize storage
    chrome.storage.local.get("trackedTitles", function (result) {
      if (!result.trackedTitles) {
        chrome.storage.local.set({ "trackedTitles": [] });
      }
    });
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractedInfo') {
    const song = request.data.song;
    console.log(song)

    if (!song) return;
    if(song == {}) return;

    console.log(`Scrobbling: ${song.title} by ${song.artist.name}`);

    if(!isHalf(song.playbackState.playbackTime, song.playbackState.playbackTimePassed)) {
      return;
    }

    chrome.storage.local.get("trackedTitles", function (result) {
      const trackedTitles = result.trackedTitles || [];
      trackedTitles.push(song);
      chrome.storage.local.set({ "trackedTitles": trackedTitles });
    });
  }
});

const isHalf = (time, currTime) => {
  return currTime * 2 >= time;
}