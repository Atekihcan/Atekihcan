---
layout: post.njk 
title: How to setup fastai on Windows 10
date: 2020-04-26T09:43:51+0530
tags: ['post']
category: DL
meta:
    description: "Setting up fastai to run on Windows 10 locally is not that difficult. This is a decent alternative to running it on the cloud as suggested for the course Practical Deep Learning for Coders"
---

xxx [Intro of why and stuff]

## Update Nvidia Drivers

Before starting to install anything, update your Nvidia drivers. And stick to Windows update for this instead of updating from the GeForce Experience program or downloading driver from Nvidia website. I had issues with last two every time. With Windows update you might not get latest drivers, but you'll have something stable that work well with Windows.

The easiest way to go about this is to open Device Manager and uninstall the Nvidia drivers from the *Display Adaptors* section.

Restart.

Open Windows update and check for updates if the drivers are not automatically installed while rebooting. Nvidia drivers update should be listed just follow standard Windows update procedure to  install those.

## Install fastai Using Anaconda/Miniconda

Installing fastai environment using conda package management system will be the easiest way to do it. You can choose {% link_out "Anaconda" "https://www.anaconda.com/products/individual" %} (installs a relatively large number of packages) or {% link_out "Miniconda" "https://docs.conda.io/en/latest/miniconda.html" %} (smaller and minimal).

I went with Miniconda when I used conda environment. The steps are as follows:

1. Install Miniconda. Installers are {% link_out "available here" "https://docs.conda.io/en/latest/miniconda.html" %}
2. Once the installation is done, update conda using

    ``` text
    conda update conda

3. Install `pytorch` and `fastai`

    ``` text
    conda install -c pytorch -c fastai fastai

4. Install Jupyter

    ``` text
    conda install jupyter

And that's all you can go on and start downloading course materials and running notebooks.

## Install fastai Using Nothing but Pip

I have never been very comfortable using conda environments. Possibly because I love to have granular control over what package I install and which one I skip.

Also it is a pain to always work from conda environment. It's good enough if your only requirement is to learn about data analysis or deep learning etc. as the conda package management has been built around to serve purposes like that. But I feel more comfortable with having the capability to run Python from anywhere.

Anyway, soon after setting this environment, I wanted to use `mplfinance` package for some financial data analysis. To my surprise I could not install it as apparently it is not available in any conda channels. I can install it easily using `pip` but couldn't make that work under conda environment as well.

Eventually I went onto uninstall Miniconda and everything related to it, and setup everything from scratch using just `pip`

* Install Python. Duh! Installers available {% link_out "here" "https://www.python.org/downloads/release/python-382/" %}. *Note: You must install 64 bit version, otherwise there will be problem with installing `pytorch` later.*

* Open PowerShell as administrator (<i class="fa fa-windows"></i> + x, i). This way everything will be always ready whichever environment you work from (CMD, PowerShell, VS Code etc. etc.)

* Upgrade `pip` and install `wheel`(might not be required, but no harm in doing it)

    ``` text
    python -m pip install --upgrade pip
    python -m pip install --upgrade pip setuptools wheel

* Identify your CUDA version. This is required to install proper version of `pytorch`. To do this go to Nvidia settings from you system tray icons. And click on *System Information*.
{% image "/images/2020/2_nvidia_cuda_version_nv_settings.jpg" "Screenshot of Nvidia settings" %}

* Note your CUDA version. As shown in the screenshot below, it is 10.1 for me.

{% image "/images/2020/2_nvidia_cuda_version_nv_sysinfo.jpg" "Screenshot of Nvidia settings system information" %}

* Install `pytorch` by selecting your system details and configurations {% link_out "here" "https://pytorch.org/get-started/locally/" "PyTorch installation instructions" %}. The command should look something like this...

    ``` text
    pip install torch==1.5.0+cu101 torchvision==0.6.0+cu101 -f https://download.pytorch.org/whl/torch_stable.html

* If you get errors like below, you might have selected a wrong combo. Confirm that you have **64 bit Python** installed.

    ``` text//0-2
    ERROR: Could not find a version that satisfies the requirement torch==1.5.0+cu101 (from versions: 0.1.2, 0.1.2.post1, 0.1.2.post2)
    ERROR: No matching distribution found for torch==1.5.0+cu101

* If you still cannot make it work, try downloading required wheel package from {% link_out "here" "https://download.pytorch.org/whl/torch_stable.html" "PyTorch Wheels" %}. But this should be your last resort.

* Install `jupyter`

    ```bash
    pip install jupyterlab

## Start Learning

By now everything that is required to run the course notebooks should be installed and ready. You can confirm that by running

```text
jupyter notebook
```

This should open up the notebook in your browser.

Let's go ahead and start the actual course notebooks.

* If you haven't done it already, clone the git repo of the course

    ```bash
    git clone https://github.com/fastai/course-v3

* Navigate to the particular course directory and start Jupyter notebook

    ```bash
    cd course-v3/nbs/dl1
    jupyter notebook

* That's all. You should now be able to run all fastai course notebooks locally in your Windows 10 machine without any issues.

## How to check if torch is actually using GPU

Launch a Jupyter notebook, and try running these short snippets to check how much time it is taking to run on CPU and how much GPU.

Measure CPU time

``` python
import torch
t_cpu = torch.rand(500,500,500)
%timeit t_cpu @ t_cpu
```

This should output something like below (on my AMD Ryzen 5 1600)

``` text
1.12 s ± 51.6 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

Now try to run the same but using CUDA cores

```python
t_gpu = torch.rand(500,500,500).cuda()
%timeit t_gpu @ t_gpu
```

You should either get some error, which might mean something wrong with you installation, or output like below

``` text
99.7 µs ± 15.3 µs per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

That's almost 11.2k times faster! Definitely torch is using my GPU

If you are familiar with `pytorch`, by this point you might be thinking there are many other simpler ways to check if GPU is being used.

True.

You could've simply run this to check if CUDA is available

```python
torch.cuda.is_available()
```

But that's not half as much as fun as getting actual numbers and feeling good about it!

I mean my puny GTX 1050ti is 11,200 times faster than my CPU!

Who doesn't need such number is their life!
