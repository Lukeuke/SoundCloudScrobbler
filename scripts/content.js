function extractSoundCloudInfo() {
    const playbackSoundBadge = document.querySelector('.playbackSoundBadge');
    
    console.log(playbackSoundBadge)
    if (playbackSoundBadge) {
      const songTitle = playbackSoundBadge.querySelector('.playbackSoundBadge_title').innerText;
      const artistName = playbackSoundBadge.querySelector('.playbackSoundBadge_lightLink').innerText;
      
      // Send the extracted information to the background script
      chrome.runtime.sendMessage({
        action: 'extractedInfo',
        data: {
          songTitle,
          artistName
        }
      });
    }
  }
  
  // Listen for changes in the DOM and extract information when the DOM is modified
  const observer = new MutationObserver(extractSoundCloudInfo);
  observer.observe(document.body, { subtree: true, childList: true });
  
  // Initial extraction when the content script is injected
  extractSoundCloudInfo();