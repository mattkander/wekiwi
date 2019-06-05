function onReady() {
	// first value is the amount of time each slide stays on screen,
	// second value is the transition time (needs to be the same as CSS)
	startSlideshow(4000, 2000);
}; 

function onBackgroundLoad() {
    wallpaper.fadeIn();
};