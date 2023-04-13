const clientId = "7e948b5ccdc24182b66949a29ad0ed3e";
const clientSecret = "c0e67f6bfdfa47c18506fb39ef0fb9ee";
let i = 0;
var duration = document.getElementById("duration-bar");
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  //   console.log(data);
  const accessToken = data.access_token;
  console.log(accessToken);
  const artistId = "1mYsTxnqsietFxj1OgoGbG";
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      var datalength = data.tracks.length;
      var datatracks = data.tracks;
      console.log(datatracks);
      data.tracks.forEach((m, i) => {
        let data = JSON.stringify(m);
        // console.log(m.name);
        localStorage.setItem(`spotifydata${i}`, data);
        i++;
        let data1 = localStorage.getItem(`spotifydata${i}`);
        let data2 = JSON.parse(data1);
        // console.log(data2);
        // console.log(data2.album.images[0].url);
        //  console.log(data2.preview_url);
        //  console.log(data2.album.id);
        //  console.log(data2.name);
        //  let res = data2.album.external_urls.spotify;
        //  console.log(res);
        document.getElementById(
          "div"
        ).innerHTML += `<div class="album" id="album${i}">    
        <img id="img" src="${data2.album.images[0].url}" alt="img" /><br />
        <h1 src="${data2.preview_url}" id="audio${i}">${data2.album.name.slice(
          0,
          20
        )}...</h1>
        </div>
        `;
        let Audio = document.getElementById("audio");
        let AudioImg = document.getElementById("audio-img");
        let AudioName = document.getElementById("audio-name");
        var running = true;

        function fun() {
          let time = setInterval(() => {
            if (running == true) {
              console.log(Audio.currentTime);
              duration.style.width = `${20}px`;
            } else {
              time.clearInterval();
            }
          }, 1000);
        }

        //Click Event

        document.getElementById("div").onclick = function (e) {
          let currentSong = e.target.children[2].getAttribute("src");
          let currentSongImg = e.target.children[0].getAttribute("src");
          let currentSongName = e.target.children[2].innerHTML;
          // console.log(currentSongName);
          let audio = document.getElementById("audio");
          audio.setAttribute("src", currentSong);
          // console.log(audio.getAttribute("src").length);
          if (audio.getAttribute("src").length > 5) {
            AudioImg.setAttribute("src", currentSongImg);
            AudioName.innerHTML = currentSongName;
          }
          playbtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
          // Audio.setAttribute("id", i);
          // fun();
          Audio.onended = () => {
            running = false;
          };
        };
        // console.log(btn);

        //Play and Pause Button
        let playbtn = document.getElementById("audio-play");
        playbtn.onclick = e => {
          let status = playbtn.classList.toggle("active");
          console.log(status);
          if (status == true) {
            Audio.play();
            playbtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
          } else {
            Audio.pause();
            playbtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
          }
        };
        //next Button
        let nextbtn = document.getElementById("audio-next");
        nextbtn.onclick = () => {
          let trackNo = Audio.getAttribute("src");
          console.log(trackNo);
          let arrOfTracks = [];
          let arrOfImgs = [];
          let arrOfNames = [];
          for (let i = 0; i < datalength; i++) {
            runningTracks = datatracks[i].preview_url;
            arrOfTracks.push(runningTracks);
            runningImgs = datatracks[i].album.images[0].url;
            arrOfImgs.push(runningImgs);
            runningSongName = datatracks[i].album.name.slice(0, 20);
            arrOfNames.push(runningSongName);
            // console.log(runningSongName);
          }
          let indexOfTrack = arrOfTracks.indexOf(`${trackNo}`);
          console.log(Audio.setAttribute("src", arrOfTracks[indexOfTrack + 1]));
          AudioImg.setAttribute("src", arrOfImgs[indexOfTrack + 1]);
          AudioName.innerHTML = arrOfNames[indexOfTrack + 1];
        };
        //previous button
        let previousbtn = document.getElementById("audio-previous");
        previousbtn.onclick = () => {
          let trackNo = Audio.getAttribute("src");
          console.log(trackNo);
          let arrOfTracks = [];
          let arrOfImgs = [];
          let arrOfNames = [];
          for (let i = 0; i < datalength; i++) {
            runningTracks = datatracks[i].preview_url;
            arrOfTracks.push(runningTracks);
            runningImgs = datatracks[i].album.images[0].url;
            arrOfImgs.push(runningImgs);
            runningSongName = datatracks[i].album.name.slice(0, 20);
            arrOfNames.push(runningSongName);
            // console.log(runningSongName);
          }
          let indexOfTrack = arrOfTracks.indexOf(`${trackNo}`);
          console.log(Audio.setAttribute("src", arrOfTracks[indexOfTrack - 1]));
          AudioImg.setAttribute("src", arrOfImgs[indexOfTrack - 1]);
          AudioName.innerHTML = arrOfNames[indexOfTrack - 1];
        };

        //reshuffle button
        let resuffelebtn = document.getElementById("audio-shuffel");
        resuffelebtn.onclick = e => {
          let status = resuffelebtn.classList.toggle("active");
          console.log(status);
          let trackNo = Audio.getAttribute("src");
          console.log(trackNo);
          let arrOfTracks = [];
          let arrOfImgs = [];
          let arrOfNames = [];
          for (let i = 0; i < datalength; i++) {
            runningTracks = datatracks[i].preview_url;
            arrOfTracks.push(runningTracks);
            runningImgs = datatracks[i].album.images[0].url;
            arrOfImgs.push(runningImgs);
            runningSongName = datatracks[i].album.name.slice(0, 20);
            arrOfNames.push(runningSongName);
            // console.log(runningSongName);
          }
          if (status === true) {
            resuffelebtn.style.color = "green";
            Audio.onended = function fun() {
              if (status === true) {
                let songSuffele = Math.ceil(Math.random() * 7);
                let indexOfTrack = arrOfTracks.indexOf(`${trackNo}`);
                console.log(indexOfTrack);
                console.log;
                Audio.setAttribute(
                  "src",
                  arrOfTracks[indexOfTrack + songSuffele]
                );
                AudioImg.setAttribute(
                  "src",
                  arrOfImgs[indexOfTrack + songSuffele]
                );
                AudioName.innerHTML = arrOfNames[indexOfTrack + songSuffele];
              }
            };
          } else {
            resuffelebtn.style.color = "black";
            Audio.onended = function fun() {
              Audio.pause();
            };
          }
        };

        //repeat button
        let repeatebtn = document.getElementById("audio-repeat");
        repeatebtn.onclick = e => {
          let status = resuffelebtn.classList.toggle("active");
          console.log(status);
          let trackNo = Audio.getAttribute("src");
          console.log(trackNo);
          let arrOfTracks = [];
          let arrOfImgs = [];
          let arrOfNames = [];
          for (let i = 0; i < datalength; i++) {
            runningTracks = datatracks[i].preview_url;
            arrOfTracks.push(runningTracks);
            runningImgs = datatracks[i].album.images[0].url;
            arrOfImgs.push(runningImgs);
            runningSongName = datatracks[i].album.name.slice(0, 20);
            arrOfNames.push(runningSongName);
            // console.log(runningSongName);
          }
          if (status === true) {
            repeatebtn.style.color = "green";
            Audio.onended = function fun() {
              if (status === true) {
                let indexOfTrack = arrOfTracks.indexOf(`${trackNo}`);
                console.log(indexOfTrack);
                console.log(
                  Audio.setAttribute("src", arrOfTracks[indexOfTrack])
                );
                AudioImg.setAttribute("src", arrOfImgs[indexOfTrack]);
                AudioName.innerHTML = arrOfNames[indexOfTrack];
              }
            };
          } else {
            repeatebtn.style.color = "black";
            Audio.onended = function fun() {
              Audio.pause();
            };
          }
        };
        // just try
      });
    });
};
getToken();

// let btn = document.getElementById("audio");
// console.log(btn);

// console.log(Math.ceil(Math.random() * 10));
