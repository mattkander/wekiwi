function onBackgroundLoad() {
    videoplayer.hide();
    wallpaper.fadeIn();
}

function onPlayButton() {
    wetransfer.vast('impression', videoplayer.getElementsByTagName('video')[0].currentSrc);
    wetransfer.resetTimer();
    videoplayer.play();
}

function onPlaybackStarted() {
    wetransfer.pauseTimer();
    wetransfer.appHide();
    videoplayer.show();
    topcontainer.hide();
}

function onPlaybackFinished() {
    wetransfer.resumeTimer();
    wetransfer.appShow();
    videoplayer.hide();
    topcontainer.show();
}
