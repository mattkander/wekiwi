# Wallpaper Toolbox

Set of helper components for wallpaper development written in [Riot.js](https://riot.js.org/).

- [`<we-wallpaper>`](#`<we-wallpaper>`)
- [`<we-clickbutton>`](#`<we-clickbutton>`)
- [`<we-background>`](#`<we-background>`)
- [`<we-button>`](#`<we-button>`)
- [`<we-video>`](#`<we-video>`)
- [`<we-lang>`](#`<we-lang>`)
- [`<we-container>`](#`<we-container>`)

# `<we-wallpaper>`
The `<we-wallpaper>` component is the root element of every advert. By default, we are assigning all ID elements within our advert as a global property.
## Options
##### onready
Executes immediately after the `<we-wallpaper>` component is loaded and ready to go. `onready` is optional.
```html
<we-wallpaper onload="onReady()">...</we-wallpaper>
<script>
  function onReady() {
    console.log('Wallpaper ready');
  }
</script>
```

# `<we-clickbutton>`
The `<we-clickbutton>` component redirects the user to the advert's external url. By default the `<we-clickbutton>` component covers the wallpaper and is on top of the rest of the components and takes its parent size. This can be overriden by updating the style of the component.

### Example:
```html
<we-clickbutton></we-clickbutton>
```

# `<we-background>`
The `<we-background>` component is used to display fullscreen images and is always displayed behind other content.
## Options
##### src
The source image for the wallpaper. `src` is required.
```html
<we-background src="path/to/image.jpg"></we-brackground>
```
##### align
Used to set the starting position of a background image. `align` is optional. Default is `center center`. Optional values are: `top left`, `top center`, `top right`, `center right`, `center center`, `bottom right`, `bottom center`, `bottom left`, `center left`
```html
<we-background align="center center"></we-brackground>
```

##### autoload
When set the `<we-background>` component will automatically load the best matching source available. `autoload` is optional and is set to `true` by default.
```html
<we-background autoload></we-brackground>
```

##### fullscreen
When set the `<we-background>` component will fill the browser window. Otherwise it will use fit aspect ratio. `fullscreen` is optional.
```html
<we-background fullscreen></we-brackground>
```

##### fade
When set the `<we-backround>` component will fade in once the initial image is loaded.
```html
<we-background fade></we-brackground>
```

##### width
Other components (see for example: `<we-container>`) can be positioned and scaled relative to the `<we-background>` component. If so than the `width` is used to determine the position and dimensions of that component. In that case `width` is required.

##### height
See `width`
```html
<we-background width="800" height="640"></we-brackground>
```

##### onload
Executes immediately after the `<we-background>` component loaded the initial image. `onload` is optional.
```html
<we-background onload="myOnLoadHandler()"></we-background>
<script>
  function myOnLoadHandler() {
    console.log('Background loaded');
  }
</script>
```

##### onerror
Executes immediately after the `<we-wallpaper>` component failed to load the initial image. `onerror` is optional.
```html
<we-background onerror="myOnErrorHanfler()"></we-background>
<script>
  function myOnErrorHandler() {
    console.log('Background loaded');
  }
</script>
```

# `<we-button>`
The `<we-button>` component is a simple replacement for the default HTML button element. It automatically tracks VAST events when the `vast` parameter is set.

## Options
##### vast
A `String` which is send to the Wetransfer API if the button is clicked
```html
<we-button vast="my_vast_id"></we-button>
```

##### disabled
When set the `<we-button>` component is disabled when instantiated. `disabled` is optional.
```html
<we-button disabled></we-button>
```

##### onclick
Executes immediately after the user clicks the `<we-button>` component.
```html
<we-background onclick="myOnClickHandler()"></we-background>
<script>
  function myOnClickHandler() {
    console.log('Button clicked');
  }
</script>
```

##### onmouseenter
Executes immediately after the user hover over the `<we-button>` component.
##### onmouseleave
Executes immediately after the user hovers out of the `<we-button>` component.
```html
<we-button onmouseenter="myOnMouseEnterHandler()" onmouseleave="myOnMouseLeaveHandler()"></we-button>
<script>
  function myOnMouseEnterHandler() {
    console.log('Mouse in');
  }
  function myOnMouseLeaveHandler() {
    console.log('Mouse out');
  }
</script>
```

| Methods |  |
| ------------- | ------------- |
| `buttonEl.enable()`  | Enables the `<we-button>` component. |
| `buttonEl.disable()`  | Disables the `<we-button>` component. |

# `<we-video>`
The `<we-video>` is used to play videos. Multiple sources are supported and the the best matching source is automatically played by the `<we-video>` component. Most modern browsers support the `video/mp4` filetype. The `<we-video>` automatically reports VAST tracking using the API. You can find examples on how to use `we-video` in both the `click-to-play` and `cinemagraph` templates.

```html
<we-video>
  <source src="assets/videos/video.mp4" type="video/mp4" />
  <source src="assets/videos/video.webm" type="video/webm" />
</we-video>
```
## Options
##### autoplay
Automatically play a video source. `autoplay` is optional.
```html
<we-video autoplay></we-video>
```

##### align
Used to set the starting position of the video. `align` is optional. Default is `center center`. Optional values are:         `top left`, `top center`, `top right`, `center right`, `center center`, `bottom right`, `bottom center`, `bottom left`, `center left`
```html
<we-video align="center center"></we-video>
```

##### clickout
Used to control clickout behaviour of the `we-video` element. By default, it will clickout to the wallpaper's default destination.
You can disable this behaviour by setting `clickout` to `false`:
```html
<we-video clickout="false"></we-video>
```
If you want a different destination for your video element you can pass it down:
```html
<we-video clickout="https://my-click-out-url.com"></we-video>
```

##### controls
This parameter will take an object containing configuration values for the video controls. If no `controls` attribute is present the `we-video` element won't render any UI. The most recommended setup is:
```html
<we-video controls="close, mute"></we-video>
```
This will rended a video player with a close and mute/unmute buttons. 
Other values `controls` take are:
```html
<we-video controls="close, mute, pause, primary: blue, secondary: #bada55"></we-video>
```
This will add a play/pause button and will alter the player primary and secondary colors.
##### fullscreen
When set the `<we-video>` component will fill the browser window. Otherwise it will use fit aspect ratio. `fullscreen` is optional.
```html
<we-video fullscreen></we-video>
```

##### loop
When set the `<we-video>` will automatically loop the video once playback is finished. The `onloop` event handler is executed instead of `onfinished`.
```html
<we-video loop></we-video>
```

##### muted
When set the `<we-video>` will automatically mute the video if playback is started.
```html
<we-video muted></we-video>
```

##### width
Other components (see for example: `<we-container>`) can be positioned and scaled relative to the `<we-video>` component. If so then the `width` is used to determine the position and dimensions of that component. In that case `width` is required.
##### height
See `width`.
```html
<we-video width="1920" height="1080"></we-video>
```

##### vast-id
By default the `<we-video>` component will track the filename of the video excluding its extension (for example: `https://wetransferbackgrounds-eu.s3.amazonaws.com/canalplus/loops/01_R.mp4` will be tracked as `/canalplus/loops/01_R`). When `vast-id` is set this will override the default value.
```html
<we-video vast-id="my_vast_id"></we-video>
```

##### disable-vast
When set the `<we-video>` component will not track VAST events by itself. Disabling tracking is useful for short looped videos.
```html
<we-video disable-vast></we-video>
```

##### onstart
Executes immediately after the `<we-video>` component loaded the video and playback has started.
```html
<we-video onstart="myOnStartHandler()"></we-video>
<script>
  function myOnStartHandler() {
      console.log('Video playback started');
  }
</script>
```

##### onplayback
Executes while the video is playing. The `currentTime`, `duration` and `progress` is passed to the event handler.
```html
<we-video onstart="myPlaybackHandler()"></we-video>
<script>
  function myPlaybackHandler(currentTime, duration, progress) {
      console.log('Current time: ' + currentTime);
      console.log('Duration: ' + duration);
      console.log('Progress: ' + progress);
  }
</script>
```

##### onfinished
Executes immediately after the `<we-video>` component finished playing the video. The event is not executed when the the `loop` parameter is set.
```html
<we-video onfinished="myOnFinishedHandler()"></we-video>
<script>
  function myOnFinishedHandler() {
      console.log('Video playback finished');
  }
</script>
```

##### onloop
Executes immediately after the `<we-video>` component finished playing and is looped the video. The event is only executed when the the `loop` parameter is set.
```html
<we-video onloop="myOnLoopHandler()"></we-video>
<script>
  function myOnLoopHandler() {
      console.log('Video playback looped');
  }
</script>
```

##### onmetadata
Executes immediately after the `<we-video>` component received the source metadata. The `metadata` is passed to the event handler. This means that the `<we-video>` element is ready to be used.
```html
<we-video onloop="myOnMetadataHandler()"></we-video>
<script>
  function myOnMetadataHandler(metadata) {
      console.log('Video is loaded', metadata);
  }
</script>
```

| Methods |  |
| ------------- | ------------- |
| `videoEl.play()`  | Start playing one of the sources supported by the browser. |
| `videoEl.pause()`  | Pause the current video played by the `we-video` component. |
| `videoEl.stop()`  | Stop the current video played by the `we-video` component. |
| `videoEl.mute()`  | Mutes the current video played by the `we-video` component. |
| `videoEl.unmute()`  | Unmutes the current video played by the `we-video` component. |
| `videoEl.setVolume(volume)`  | Sets the volume of the current video played by the `we-video` component. |

# `<we-lang>`
The `<we-lang>` component is used for localization of the component. It uses a locale `key` to display a translated word or phrase using the Wetransfer API. A default value is recommended and shown in case the `key` wasn't found by the API.

Important! `<we-lang>` expects to find a `locale` global variable in the wallpaper.

## Options
##### key
The locale key which is used to by the API to find the translation of the label. When the key isn't found the default value is used.

```html
<we-lang key="welcome">Welcome</we-lang>
<script>
const locale = {
    en: {
        welcome: 'Welcome'
    },
    fr: {
        welcome: 'Bienvenue'
    },
    nl: {
        welcome: 'Welkom'
    }
};
</script>
```

# `<we-container>`
The `<we-container>` is used to wrap basic HTML tags so they can be extended.

Futhermore components can be "pinned" to another components. For example, a `<we-button>` or `<we-label>` component can be positioned and scaled relatively to `<we-background>` and `<we-video>` components. An HTML tag however doesn't have this functionality by default. Therefor they need to be wrapped within a `<we-container>`.

Most other components inherit from the `<we-container>`. Not by inheritance but by composition. This means that for example `<we-button` has the same functionality.

## Options
##### positionWith
A string which references to the `id` parameter of a `<we-background>` or `<we-video>` component. The `<we-container>` component will position itself relatively to that component.
```html
<we-container positionWith="element-id"></we-container>
```

##### scaleWith
A string which references to the `id` parameter of a `<we-background>` or `<we-video>` component. The `<we-container>` component will scale itself relatively to that component.
```html
<we-container scaleWith="element-id"></we-container>
```

##### fullscreen
Scales the container to fit the viewport.
```html
<we-container fullscreen></we-container>
```

| Methods |  |
| ------------- | ------------- |
| `containerEl.show()`  | Shows the the `<we-container>` by setting `display: block;`. |
| `containerEl.hide()`  | Hides the the `<we-container>` by setting `display: none;`. |
| `containerEl.toggleVisibility()`  | Toggles the visibility of the component. |
| `containerEl.fadeIn()`  | Fades the `<we-container>` element in. |
| `containerEl.fadeOut()`  | Fades the `<we-container>` element out. |

### Example:
```html
<we-background id='background' width='1200' height='540' autoload fullscreen>
	<source src='large.jpg' media='(min-width: 60rem)' />
</we-background>

<!-- The we-container is positioned and scaled relatively to the <we-background> component -->

<we-container id='pinnedLabel' positionWith='background' scaleWith='background'>
	<span>Positioned and scaled relatively to #background</span>
</we-container>
```
