---
layout: post.njk 
title: 'Setting up and Customizing Windows Terminal'
date: 2020-09-13T17:47:51+0530
tags: ['post']
category: random
meta:

    description: "A short guide on how to setup Windows Terminal and customize it with oh-my-posh and terminal icons"

---

1. Install Windows Terminal
2. Install `oh-my-posh
3. Edit theme as per your liking

```bash
{
    "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh3/main/themes/schema.json",
    "blocks": [{
        "type": "prompt",
        "alignment": "left",
        "segments": [{
                "type": "os",
                "style": "diamond",
                "foreground": "cyan",
                "properties": {
                    "prefix": ""
                }
            },
            {
                "type": "path",
                "style": "powerline",
                "powerline_symbol": "\uE0B0",
                "foreground": "#ffffff",
                "background": "cyan",
                "properties": {
                    "prefix": " \uE5FF ",
                    "style": "folder"
                }
            }
        ]
    }],
    "final_space": true
}

``` 

```bash
{
    "type": "os",
    "style": "diamond",
    "foreground": "#E95420",
    "properties": {
        "prefix": "",
        "wsl": "",
        "wsl_separator": "",
        "linux": "\uF31C"
    }
}
```


4. Add [Terminal Icons](https://github.com/devblackops/Terminal-Icons)
Install-Module -Name Terminal-Icons -Repository PSGallery


    "editor.fontFamily": "FiraCode NF, Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true,

    https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraCode