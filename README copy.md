# Wallpaper SandBox

This repository contains a development task-runner for wallpaper studio. It also includes the source code for the [Wallpaper Toolbox](https://github.com/WeTransfer/wallpaper-sandbox/tree/master/src/toolbox) and a set of Wallpaper Templates.

# Getting started

## Install

* Download and install [Node.js and npm](https://nodejs.org/en/).
* Clone this repo.
* Run `npm install` to install dependencies.
* Run `npm link` to link your binaries.
* Make a copy of `config.json`  and name it `config.local.json`. There you can override the main config object to setup your local configuration.
* Generate your Toolbox local copy by running `we toolbox -d`. Learn more about the Wallpaper Toolbox [here](https://github.com/WeTransfer/wallpaper-sandbox/tree/master/src/toolbox).

## Create your first wallpaper

Now that all your dependencies are installed, you can run

`we create -a <account_name> -c <campaing_name>`

There is a third parameter, `-t <template_name>`. You can add it yo use a different template as starting point. Default template name is `static`, these are all the valid values:

| Valid template names |  |
| ------------- | ------------- |
| `static`  | Simplest wallpaper ever (plus a content area). |
| `cinemagraph`  | Wallpaper with a looping video background. |
| `click-to-play`  | Wallpaper with a self hosted click to play video. |
| `click-to-play-intro`  | Wallpaper with an intro video and a self hosted click to play video. |
| `click-to-play-embed`  | Wallpaper with a click to play YouTube or Vimeo embeded player. |
| `animated`  | Wallpaper with animation libraries and best practices. |
| `slideshow`  | Wallpaper with looping slideshow. |
| `multilang`  | Wallpaper with multilingual content. |

All arguments are required. This will copy your desired template to a location given by the **wallpaper identifier**. This identifier will have the following structure:

`account_name/YYMM/campaing_name`

A datecode is automatically added, plus the arguments you supplied before.
You can get more info about [naming convention in Notion](https://www.notion.so/wetransfer/Wallpapers-Creation-ff61927a7a1845f9b04f8daecdc44e02).

## Edit a wallpaper

After you create a wallpaper, if all goes good, you will get your wallpaper identifier and the edit command.

If you are editing a previously created wallpaper, use the path to that wallpaper.

Running `we edit -w <wallpaper_identifier>` you will perform some actions like:

* **Running a development server.**
* **Opening a browser window** with your wallpaper. Note that you can share your development url with people on the same LAN.
* **Wait for file changes** to recompile and **refresh** the browser every time you save a file.
* **Compile your template**.

Adding the `-p` flag will pause the timer during development: `we edit -w foo/1903/animated_v1 -p` If you do something in the scripts that resumes the timer (like after a ctp plays), the timer will resume as usual, but otherwise, in normal dev situations, your timer will be paused.

## Other tasks

#### Build wallpaper
`we build -w <wallpaper_identifier>` Builds and creates a copy of the wallpaper on your desired location. To update that location edit `export_dir` in your `config.local.json` file.
#### Start server
`we serve -w <wallpaper_identifier|optional>` Serves a wallpaper. No livereload or watch scripts added, just for sharing your wallpapers. Use the `-https` flag like `we serve -w <wallpaper_identifier|optional> -https`
#### Update
`we update` to update Wallpaper SandBox
#### Toolbox
`we toolbox -w <watch> -d <dist>`.


<br><br>
# Templates

## Basic structure

When creating a new template, make sure you have at least this files in place.
This is a minimum template structure. All files are mandatory. The folder name will also be the template name.

```
<template_name>
├── assets
│   ├── data.json
│   └── images
│       └── 1px.png
├── src
│   ├── index.mustache
│   ├── styles.scss
│   └── scripts.js
└── config.json
```

| Template contents |  |
| ------------- | ------------- |
| 1px.png  | Placeholder background file. |
| config.json  | JSON object with wallpaper dependencies. |
| assets/data.json  | JSON object with template data |
| index.mustache  | Mustache file. Read [Mustache docs](https://mustache.github.io/mustache.5.html). |
| styles.scss  | Default template styles, [Sass](https://sass-lang.com/) |
| scripts.js  | Default template scripts, [Babel](https://babeljs.io/). |
