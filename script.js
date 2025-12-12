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

    // Elements
    const imgMax = document.getElementById('img-max');
    const btnMax = document.getElementById('btn-max');
    const imgSd = document.getElementById('img-sd');
    const btnSd = document.getElementById('btn-sd');
    const imgHq = document.getElementById('img-hq');
    const btnHq = document.getElementById('btn-hq');

    // 1. Try to load HD. If it fails (404), fallback to HQ automatically
    imgMax.onload = function() {
        // Image loaded successfully, ensure button is correct
        btnMax.href = maxRes;
        btnMax.innerText = "Download HD";
    };
    
    imgMax.onerror = function() {
        // HD failed, switch to HQ
        this.src = hqRes;
        btnMax.href = hqRes;
        btnMax.innerText = "Download HQ (HD Unavailable)";
    };
    
    // Trigger load
    imgMax.src = maxRes;
    btnMax.href = maxRes; // Default link

    // 2. Load SD and HQ normally
    imgSd.src = sdRes;
    btnSd.href = sdRes;

    imgHq.src = hqRes;
    btnHq.href = hqRes;

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
