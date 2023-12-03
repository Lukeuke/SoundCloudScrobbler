document.addEventListener('DOMContentLoaded', function () {
  let trackedTitles = []
  chrome.storage.local.get('trackedTitles', function (result) {
    trackedTitles = result.trackedTitles || [];
    const trackedTitlesList = document.getElementById('trackedTitlesList');

    trackedTitles.forEach(function (songObj) {
      const songContainer = document.createElement('div');
      songContainer.className = "song-contanier";

      const imgLink = document.createElement('a');
      
      imgLink.href = songObj.songUrl;
      const img = document.createElement('img');
      img.src = songObj.imageUrl;
      img.height = 30;

      imgLink.appendChild(img)

      const songDetails = document.createElement('div');
      songDetails.className = "song-details";

      const artistLink = document.createElement('a');
      artistLink.href = songObj.artist.url;

      const artist = document.createElement('div');
      artist.className = 'artist';
      artist.innerHTML = songObj.artist.name;

      artistLink.appendChild(artist)

      const songLink = document.createElement('a');
      songLink.href = songObj.songUrl;
      const songName = document.createElement('div');
      songName.innerHTML = songObj.title

      songLink.appendChild(songName)

      const time = document.createElement('span')
      time.className = 'time'
      time.innerHTML = new Date(songObj.time).toLocaleString('en-US')

      songDetails.appendChild(artistLink);
      songDetails.appendChild(songLink);
      songDetails.appendChild(time)
      
      songContainer.appendChild(imgLink);
      songContainer.appendChild(songDetails);
      trackedTitlesList.appendChild(songContainer);
    });
  });

  const clear = document.getElementById('clear');
  clear.addEventListener(('click'), () => {
    chrome.storage.local.set({'trackedTitles' : []})
    trackedTitles = []
  })

});