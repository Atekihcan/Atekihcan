---
layout: post.njk 
title: 'Setting up and Customizing Windows Terminal'
date: 2020-09-13T17:47:51+0530
tags: ['post']
category: random
meta:
    description: "A short guide on how to setup Windows Terminal and customize it with oh-my-posh and terminal icons"
---

If you are using any sort of command line interface while in Windows, check out {% link_out "Windows Terminal" "https://docs.microsoft.com/en-us/windows/terminal/get-started" %}. It is a highly customizable terminal emulator that can do anything you want it do. You can have tabbed terminals running PowerShell, WSL Bash, cloud SSH, and many more side by side. Check out the link above to explore more on this.

{% image "/images/2021/14_windows_terminal.jpeg" "Windows Terminal" %}

In this article and the [next]({% link '15_setting_up_windows_terminal_ii' %}), I'll list down some customizations that I like and would want to explore more.

### oh-my-posh

**Oh My Posh** is a custom prompt engine which can be used to customize your command line prompt for almost any shells that allows for customization. You can get the detailed instructions on how to install and customized it in the {% link_out "official documentation" "https://ohmyposh.dev/docs/" %}.

Below is a customization that I prefer. The Git stuff tends to slow down the prompt, so I have not been using that.

```json
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
```

I did not like the WSL icon/appearance for OS submodule, so I modified it to match the Ubuntu orange color.

```json
"type": "os",
"style": "diamond",
"foreground": "#E95420",
"properties": {
    "prefix": "",
    "wsl": "",
    "wsl_separator": "",
    "linux": "\uF31C"
}
```

### Terminal Icons

You can also customize further using {% link_out "Terminal Icons" "https://github.com/devblackops/Terminal-Icons" %}. This is only for powershell, if you are using any other shell, there might be similar options out there.

{% image "/images/2021/14_before_terminal_icon.jpg" "Powershell before using terminal icons" "" "Powershell before using terminal icons" %}

{% image "/images/2021/14_after_terminal_icon.jpg" "Powershell after using terminal icons" "" "Powershell after using terminal icons" %}

You can install it using the below command:

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery
```

### VS Code Terminal Customization

Honestly, this doesn't have anything to with customizing Windows Terminal, but how to have the customizations discussed above in VS Code integrated terminal.

**Oh My Posh** and **Terminal Icons** both need {% link_out "Nerd Fonts" "https://www.nerdfonts.com/" %} to support all icons properly. So, to have the same customizations in VS Code integrated terminal, install a font of your liking ({% link_out "Fira Code NF" "https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraCode" %} for me) and modify your VS Code settings as below.

```json
"terminal.integrated.fontFamily": "FiraCode NF, Consolas, 'Courier New', monospace",
```

While we are on the topics of Nerd Fonts and VS Code, you might also want to change you editor settings as well and make your code look modern and beautiful!

```json
"editor.fontFamily": "FiraCode NF, Consolas, 'Courier New', monospace",
"editor.fontLigatures": true,
```
