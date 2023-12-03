function extractSoundCloudInfo() {
    const playbackSoundBadge = document.querySelector('.playbackSoundBadge');
    
    if (playbackSoundBadge) {

      let songUrl = playbackSoundBadge.querySelector('a');

      let image = songUrl.querySelector('div').querySelector('span')
      let imageUrl = image.style.backgroundImage.substring(5, image.style.backgroundImage.length - 2);
      
      let title = document.getElementsByClassName('playbackSoundBadge__title')[0].querySelector('a').title;
      
      let artist = document.getElementsByClassName('playbackSoundBadge__lightLink')[0]

      let song = {
        title: title,
        imageUrl: imageUrl,
        songUrl: songUrl.href,
        artist: {
          name: artist.title,
          url: artist.href
        },
        time: Date.now()
      }

      // Send the extracted information to the background script
      chrome.runtime.sendMessage({
        action: 'extractedInfo',
        data: {
          song
        }
      });
    }
}
  
// Listen for changes in the DOM and extract information when the DOM is modified
const observer = new MutationObserver(extractSoundCloudInfo);
let whatToObserve = document.getElementsByClassName('playbackSoundBadge')[0]
observer.observe(whatToObserve, { subtree: true, childList: true });
  
// Initial extraction when the content script is injected
extractSoundCloudInfo();