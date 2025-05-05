const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyDDfXIbHqPUuGtw-7lRls3CFhPDQohczoI"; // Apni API key yahan daalein
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: 'dQw4w9WgXcQ' // Ek mashhoor video ID (Never Gonna Give You Up)
}))
.then(res => res.json())
.then(data => {
    console.log('Specific Video Data:', data);
    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    } else {
        videoCardContainer.innerHTML = '<p>No video found with this ID.</p>';
    }
})
.catch(err => {
    console.error(err);
    videoCardContainer.innerHTML = '<p>Error fetching video.</p>';
});

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        } else {
            video_data.channelThumbnail = 'img/default_channel_icon.png'; // Default icon ka path dein
            makeVideoCard(video_data);
        }
    })
    .catch(err => {
        console.error(err);
        video_data.channelThumbnail = 'img/default_channel_icon.png'; // Default icon ka path dein
        makeVideoCard(video_data);
    });
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="window.location.href = 'https://www.youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="${data.snippet.title}">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="${data.snippet.channelTitle}">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn img'); // Search button ke andar image ko select karein

searchBtn.addEventListener('click', () => {
    if (searchInput.value.trim().length) {
        window.location.href = `https://www.youtube.com/results?search_query=${searchInput.value.trim()}`;
    }
});