function onBackgroundLoad() {
    wallpaper.fadeIn();
}

function onVideoPlaying() {
    wetransfer.pauseTimer();
    topcontainer.hide();
    wetransfer.appHide();
}

function onVideoEnded() {
    wetransfer.resumeTimer();
    topcontainer.show();
    wetransfer.appShow();
    wetransfer.resetTimer();
}

function onEmbedReady() {
    topcontainer.show();
}

function onVideoPaused() {}

function onPlayButton() {
    myEmbed.play();
}
