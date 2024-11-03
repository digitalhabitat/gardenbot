---
aliases:
  - rpi-setup
tags:
  - bookworm
  - debian
---
# Raspberry Pi Setup

This guide will outline the steps taken to setup the baseline software on the Raspberry Pi 4. 

>[!INFO] Requirements
> This project recommends using a Raspberry Pi with at least 4GB of RAM. Compiler issues have been encounter with the 2GB variant.
> - Raspberry Pi 4 Model B Rev 1.5 (4GB)
> - 64 GB Micro SD Card
> - Micro SD Card Reader
>

## Setup OS Installation

1. Install Raspberry PI Imager https://www.raspberrypi.com/software/
2. Select Raspberry PI OS (64-bit) Debian Bookworm
3. Select at Storage option of at least 64 GB 
4. Select gear for advance option to specify the following form fields.
	1. Check the **Set hostname** box.
		1. `hostname: rpi4` 
	2. Check the **Set username and password** box ^rpi-os-config
		1. `username: bot` 
		2. `password: bot
	3. Check the **Enable SSH** box
		1. Select the **Allow public-key authentication only** radio button
		2. Open a terminal and enter the following. You may skip this step if you already have performed it. ^rpi4-ssh-key
			1. `ssh-keygen -C "user@hostname" -f ~/.ssh/samsung-rpi4`
			2. `cat ~/.ssh/samsung-rpi4.pub`
		3. Copy the output the last command and paste it into the `Set authorized_keys for the 'bot':` form field.
	4. Check the **Configure wireless LAN** box and enter the required form fields.
	5. Select Save
5. Flash Raspberry PI OS 64-bit to the Micro SD Card
	1. Alternatively setup NVMe boot with NVMe hat
6. Once the flashing is successful install the Micro SD card into the rpi4, hook up a monitor, mouse, and keyboard and power on the device.

## Setup Raspberry Pi SSH config

> [!NOTE]
> There are two ssh keys involved for this project each for specific access. The key naming pattern used is `LocalMachineHostname-RemoteMachineHostname` understood as "We log in from Local Machine (the computer in front of us) to the Remote Machine (computer elsewhere)". 
> 1. `/home/user/.ssh/samsung-github` provides GitHub repo access to push commits to the repo
> 	1. The contents the of the public key `samsung-github.pub` is copied to Github via https://github.com/settings/keys
> 2. `/home/user/.ssh/samsung-rpi4` provides access to Raspberry Pi 4
> 	1. The contents the of public key `samsung-rpi4.pub` is copied from the local machine to the `/home/bot/.ssh/authorized_keys` file of the remote Raspberry Pi 4.  [[#^rpi4-ssh-config]]
> 
> The following notes will guide you setting up the ssh keys such that you may conveniently develop and commit code changes all entirely remotely (i.e Within a Docker Container that is running on the Raspberry Pi)

1. From your local machine (non-rpi4) open up a terminal and perfrom the following.
2. Test ssh access `ssh <user>@<rpi-local-ip>` Use the password you configured in the [[#^rpi-os-config]] step
3. Reserve a static local IP address for within the router's configuration
4. Reboot the pi 
	On host machine: `ssh -t <user>@<rpi-local-ip> "reboot"`
5. Test ssh access with machine name
	`ssh <user>@<hostname>`
7. Add ssh config to host machine ^rpi4-ssh-config
	1. On host machine: `xdg-open ~/.ssh/config`
	2. Copy-paste the following, this project is using `rpi4` as the config-name. Note the identity field uses the key we create earlier [[#^rpi4-ssh-key]] 

```shell
Host <config-name>
	HostName <local-reserved-static-ip>
	User bot
	IdentityFile ~/.ssh/samsung-rpi4.pub
	ForwardAgent yes 
	ForwardX11 yes
	ServerAliveInterval 120
```

8.  Test ssh `ssh <config-name>`

## Install Docker on Raspberry Pi OS (64-bit) Debian Bookworm

> [!CAUTION]
> Installing Docker for Raspberry PI OS (64-bit) Debian Bookworm is not as straight forward at the time this note was authored (2024-11-1). The convenience script for Debian `get-docker.sh` will not be applicable and manual installation with need tweaking for the targeted OS. The following notes are based on https://docs.docker.com/engine/install/debian/#install-using-the-repository

- Open a ssh terminal on the Raspberry Pi 4
```
ssh <username>@<hostname>
```
- Update APT repos and upgrade packages
```bash
sudo apt-get update && sudo apt-get upgrade
```
-  Uninstall all conflicting packages
```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```
-  Add GPG keys
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

- Add the **bookworm** repository to Apt sources. ^bookworm-apt

> [!CAUTION]
> Note `$VERSION_CODENAME` is ==NOT applicable==  as it's used in the official Docker install for Debian. So we replace it with `bookworm` 
> ```bash
> # Add the repository to Apt sources:
> echo \
>   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
>   $(. /etc/os-release && echo "bookworm") stable" | \
>   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
> sudo apt-get update
> ```

- Install the Docker Packages
```bash
# Install the Docker packages.
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> [!attention]
> - If you previously added and updated an incorrect Apt sources (didn't replace `$VERSION_CODE` with `bookworm`) you may get the following error when you attempt to `sudo apt install` docker packages. See section [[#^bookworm-apt]]
> ```
> The following packages have unmet dependencies: 
>  docker-ce : Depends: iptables but it is not installable
>              Recommends: pigz but it is not installable
> E: Unable to correct problems, you have held broken packages.
> ```
> - This can be corrected by removing the updating the list and retrying the previous `sudo apt install` command.
> ```bash
> sudo rm -rf /var/lib/apt/lists/*`
> sudo apt-get update
> ```

- Run the docker `hello-world` image:
```bash
sudo docker run hello-world
```

## Post install steps to manage Docker as a non-root user

These next steps maybe necessary for docker to work it VS Code remote development click [here](https://docs.docker.com/engine/install/linux-postinstall/) for more info

- Create the `docker` group.
```shell
sudo groupadd docker
```
-  Add your user to the `docker` group.
```shell
sudo usermod -aG docker $USER
```
- Activate the changes to groups.
```bash
newgrp docker
``````
- Verify that you can run `docker` commands without `sudo`.
```bash
docker run hello-world
```

## Setup GitHub ssh keys

> [!NOTE]
> For alternate authentication methods see  [Sharing Git credentials with your container](https://code.visualstudio.com/docs/remote/containers#_sharing-git-credentials-with-your-container)

1. Create private-public key pairs on your local machine (non-rpi4) and add public key to GitHub via https://github.com/settings/keys
```shell
ssh-keygen -t ed25519 -C "<youremail>" -f ~/.ssh/<private-key>
```
2. Test credentials
```shell
ssh -T -i ~/.ssh/<private-key> git@github.com
```
3. Configure global settings
```shell
git config --global user.email "youremail@yourdomain.com"
git config --global user.name "Your Name"
```
4. Retrieve the fingerprint of the key just created
```
ssh-kengen lf ~/.ssh/<private-key>
```
6. Add key to ssh agent
```
ssh-add ~/.ssh/<private-key>
```
7. Verify key finger print is present in the ssh-agent
```
ssh-add -l
```
## Setup VS Code and ROS2 Workspace Repository

1. Open a ssh terminal on the Raspberry Pi 4
2. Install [Visual Studio Code](https://code.visualstudio.com/docs/setup/raspberry-pi) on the pi

```shell
sudo apt update
```

```shell
sudo apt install code
```

4. Clone the ros2 workspace repo into the Raspberry Pi's home directory for the current user

```shell
git clone git@github.com:digitalhabitat/bot2_ros2_workspace.git
```
## Setup VS Code Remote Development 
1. Install VS Code on your host machine
2. Open VS Code on host machine
3. Install the remote [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) more info about remote development [here](https://code.visualstudio.com/docs/remote/remote-overview)
4. Connect to the `rpi4` via VS Code on your host machine
	1. With VS Code open press `Ctrl + Shift + P`  and enter "Connect to Host"
	2. You should be prompted  with a drop down menu of the known host that was configured in [[#^rpi4-ssh-config]] step
5. Open `bot2_ros2_workspace` workspace folder
	1.  With VS Code, Select File, Open Folder, `/home/bot/bot2_ros2_workspace/` then click okay
6. Make sure the repo is currently on the `humble` branch
	1. Check that the bottom left hand corner reads `humble`
	2. if not, on VS Code press Ctrl + Shift + P  and enter "Checkout to... " 
	3. Select "origin/humble"
6. Open Docker the Humble ROS2 container
	1. on VS Code press Ctrl + Shift + P  and enter "Rebuild and Reopen in Container" 
	2. Check out the readme for the workspace to get started. Click [here](https://www.allisonthackston.com/articles/vscode-docker-ros2.html)to read a blog about this ROS2 workspace template 