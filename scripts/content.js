let currPlayBackTime

let song = {}

function extractSoundCloudInfo() {

    console.log(song)

    try {
        chrome.runtime.sendMessage({
            action: 'extractedInfo',
            data: {
                song
            }
        });
    }
    catch {

    }
}
 
function currPlayingSong() {
    const playbackSoundBadge = document.querySelector('.playbackSoundBadge');
    
    if (playbackSoundBadge) {
        if (playbackSoundBadge.className.includes('paused')) {
            return;
        }

      let songUrl = playbackSoundBadge.querySelector('a');

      let image = songUrl.querySelector('div').querySelector('span')
      let imageUrl = image.style.backgroundImage.substring(5, image.style.backgroundImage.length - 2);
      
      let title = document.getElementsByClassName('playbackSoundBadge__title')[0].querySelector('a').title;
      
      let artist = document.getElementsByClassName('playbackSoundBadge__lightLink')[0]

        let playbackTime = document.getElementsByClassName('playbackTimeline__duration')[0].querySelectorAll('span')[1].innerHTML;

      let newSong = {
        title: title,
        imageUrl: imageUrl,
        songUrl: songUrl.href,
        artist: {
          name: artist.title,
          url: artist.href
        },
        time: Date.now(),
        playbackState: {
            playbackTime: timeStringToUnixSeconds(playbackTime),
            playbackTimePassed: currPlayBackTime
        }
      }

      song = newSong;
    }
}

function observePlayback() {
    if (document.getElementsByClassName('playbackTimeline__timePassed')) {
        let currPlayback = document.getElementsByClassName('playbackTimeline__timePassed')[0].querySelectorAll('span')[1].innerHTML;
        currPlayBackTime = timeStringToUnixSeconds(currPlayback);
    }

}

function timeStringToUnixSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

// Listen for changes in the DOM and extract information when the DOM is modified
const observer = new MutationObserver(extractSoundCloudInfo);
let whatToObserve = document.getElementsByClassName('playbackSoundBadge')[0]
observer.observe(whatToObserve, { subtree: true, childList: true });

const observeCurrPlayback = new MutationObserver(observePlayback);
observeCurrPlayback.observe(document.body, { subtree: true, childList: true });

const currPlayingSongObs = new MutationObserver(currPlayingSong);
currPlayingSongObs.observe(document.body, { subtree: true, childList: true });

// Initial extraction when the content script is injected
extractSoundCloudInfo();
observePlayback();
currPlayingSong();