const locale = {
    en: {
        flag: '🇬🇧'
    },
    fr: {
        flag: '🇫🇷'
    },
    de: {
        flag: '🇩🇪'
    },
    nl: {
        flag: '🇳🇱'
    },
    it: {
        flag: '🇮🇪'
    },
    es: {
        flag: '🇪🇸'
    },
    pt: {
        flag: '🇵🇹'
    }
};

function onReady() {}

function onBackgroundLoad() {
    wallpaper.fadeIn();
}

// Use this function to work with current language 
// outside we-lang tags
// wetransfer.language(lang => {
// 	console.log(lang);
// });