---
layout: post.njk 
title: 'Setting up and Customizing Windows Terminal Part II'
date: 2020-09-13T17:47:51+0530
tags: ['post']
category: random
meta:

    description: "A short guide on how to setup Windows Terminal and customize it with oh-my-posh and terminal icons"

---

### Windows

#### Install Scoop

```psh
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

Or use the shorter version

```psh
iwr -useb get.scoop.sh | iex
```

Note: if you get an error you might need to change the execution policy (i.e. enable Powershell) with

```psh
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

#### Install Starship using Scoop

```psh
scoop install starship
```

#### Add to PowerShell Profile

Add following lines in your PowerShell profile configuration file

```psh
Invoke-Expression (&starship init powershell)
```

### Linux/WSL

#### Install Starship using Prebuilt Binary

```bash
curl -fsSL https://starship.rs/install.sh | bash
```

#### Add to Bash Profile

Add following to your `.bashrc` file

```bash
eval "$(starship init bash)"
```

### Theme

```toml
# Don't print a new line at the start of the prompt
add_newline = true

# Wait 10 milliseconds for starship to check files under the current directory.
scan_timeout = 10

# Use custom format
format = """$cmd_duration

$OS$time$directory$git_branch$git_commit$git_state$git_status
[❯❯❯](bold green) """

# Show how much time it took for last command if it is more than 500ms
[cmd_duration]
min_time = 1000
format = "took [$duration](bold yellow)"

# Local Time
[time]
disabled = false
format = '[\[$time\]](#00ADEF)'
time_format = "%T"

[directory]
format = '[ $path ](#00ADEF)'

# Git Stuff
[git_branch]
format = '[\[$branch\]]($style)'
truncation_length = 16
truncation_symbol = ""
[git_status]
format = '( [$all_status$ahead_behind]($style))'
style = ""
untracked = "[?$count](#FF8C00) "
stashed = "$"
modified = "[M$count](#DC143C) "
staged = "[$count](green) "
renamed = "[~$count](#FFD700) "
deleted = "[X$count](#8B0000) "

[env_var]
variable = "SHELL"
default = "unknown shell"
```

Ubuntu orange: #E95420
