---
layout: post.njk 
title: 'Hash Sum Mismatch Error on Ubuntu Virtual Machine'
date: 2020-09-06T16:40:51+0530
tags: ['post']
category: random
meta:
    description: "There is an annoying hash sum mismatch error on Linux distro virtual machines whenever you try to update/upgrade/install anything with apt. Here is a fix for that."
---

Recently I have started to prepare for a YouTube tutorial series on OpenGL. The goal of the project is to record all my expertise and knowledge on OpenGL in one place and help others. One key point of the codebase I'm preparing for the tutorial is to be cross platform. It should run on Windows/Linux as well as on mobile platform like Android.

For Linux, I needed a working Linux distro with display enabled. WSL2 is not yet supporting display, even on Windows insider update channel I have subscribed to. {% link_out "It is on the way though" "https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-build-2020-summary/#wsl-gui" %}.

So for now, I have resorted back to using Ubuntu via VirtualBox.

However, soon I came across an annoying problem which made it seem completely unusable.

`apt` was broken.

