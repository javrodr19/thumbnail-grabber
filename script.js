// Function to Extract YouTube Video ID
function getYouTubeID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

// Main Function to Fetch Thumbnails
function getThumbnail() {
    const inputUrl = document.getElementById('videoUrl').value;
    const errorMsg = document.getElementById('error-msg');
    const resultArea = document.getElementById('result-area');
    
    // Reset display
    errorMsg.innerText = "";
    resultArea.classList.add('hidden');

    const videoId = getYouTubeID(inputUrl);

    if (!videoId) {
        errorMsg.innerText = "Invalid YouTube URL. Please try again.";
        return;
    }

    // Construct Image URLs
    const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const sdRes = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    const hqRes = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Update DOM elements
    document.getElementById('img-max').src = maxRes;
    document.getElementById('btn-max').href = maxRes;

    document.getElementById('img-sd').src = sdRes;
    document.getElementById('btn-sd').href = sdRes;

    document.getElementById('img-hq').src = hqRes;
    document.getElementById('btn-hq').href = hqRes;

    // Show Results
    resultArea.classList.remove('hidden');
}

// Cookie Consent Logic
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Check if user already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
});
