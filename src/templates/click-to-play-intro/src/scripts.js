function onVideoLoad() {
    ctp.hide();
    topcontainer.hide();
    wallpaper.fadeIn();
}

function onPlaying(currentTime, duration, progress) {
    if(progress > 0.25){
        intro.pause();
        topcontainer.show();
    }
}

function onIntroFinished() {
    topcontainer.show();
}

function onPlayButton(event) {
    wetransfer.vast('impression', ctp.getElementsByTagName('video')[0].currentSrc);
    wetransfer.resetTimer();
    ctp.play();
}

function onPlaybackStarted() {
    wetransfer.pauseTimer();
    wetransfer.appHide();
    intro.hide();
    topcontainer.hide();
    ctp.show();
}

function onPlaybackFinished() {
    wetransfer.resumeTimer();
    wetransfer.appShow();
    ctp.hide();
    intro.show();
    topcontainer.show();
}
