---
aliases: [ rpi-setup ]
---
# Raspberry Pi Setup

This guide will outline the steps taken to setup the baseline software on the Raspberry Pi 4. 

>[!INFO]
> This project recommends using a Raspberry Pi with at least 4GB of RAM. Compiler issues have been encounter with the 2GB variant.


## Setup OS Installation
1. Install Raspberry PI Imager https://www.raspberrypi.com/software/
2. Select gear for advance option to specify a hostname, username, password, and network configurations ^rpi-os-config
3. Flash Raspberry PI OS 64-bit to Micro SD Card
	1. Alternatively setup NVMe boot with NVMe hat/

## Setup SSH
1. Test ssh access `ssh <user>@<rpi-local-ip>` Use the password you configured in the [[#^rpi-os-config]] step
2. Reserve a static local IP address for within the router's configuration
3. Reboot the pi 
	On host machine: `ssh -t <user>@<rpi-local-ip> "reboot"
	Or, within the pi ssh terminal `reboot`
4. Test ssh access with machine name
	`ssh <user>@<hostname>`
5. Create SHH Key Pair
	On host machine: `ssh-keygen -f ~/.ssh/<key-name>`
6. Copy SHH pubic key to the raspberry pi
	 On host machine: `ssh-copy-id -i ~/.ssh/<key-name> <user>r@<rpi-machine-name>`
7. Add ssh config to host machine ^rpi4-ssh-config
	1. On host machine: `xdg-open ~/.ssh/config`
	2. Copy-paste the following, this project is using `rpi4` as the config-name
```
Host <config-name>
	HostName <local-reserved-static-ip>
	User bot
	IdentityFile ~/.ssh/<key-name>.pub
	ForwardAgent yes 
	ForwardX11 yes
	ServerAliveInterval 120
```
8.  Test ssh `ssh <config-name>`

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
cd
git clone https://github.com/digitalhabitat/bot_ros2_workspace
```

## Install Docker
1. Open a ssh terminal on the Raspberry Pi 4
2. Install docker will the following commands
```shell
sudo apt-get update && sudo apt-get upgrade
```

``` shell
curl -fsSL https://get.docker.com -o get-docker.sh
```

```shell
 sudo sh get-docker.sh
```
4. [more Info about script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)
5. These next steps maybe necessary for docker to work it VS Code remote development click [here](https://docs.docker.com/engine/install/linux-postinstall/) for more info
```shell
sudo groupadd docker
```

```shell
sudo usermod -aG docker $USER
```

```shell
exit
```

## Setup VS Code Remote Development 
1. Install VS Code on your host machine
2. Open VS Code on host machine
3. Install the remote [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension) more info about remote development [here](https://code.visualstudio.com/docs/remote/remote-overview)
4. Connect to the `rpi4` via VS Code on your host machine
	1. With VS Code open press Ctrl + Shift + P  and enter "Connect to Host"
	2. You should be prompted  with a drop down menu of the known host that was configured in [[#^rpi4-ssh-config]] step
5. Open ros2 workspace folder
	1.  With VS Code, Select File, Open Folder, `/home/bot/bot_ros2_workspace/` then click okay
6. Make sure the repo is currently on the `humble-rpi4` branch
	1. Check that the bottom left hand corner reads `humble-rpi4`
	2. if not, on VS Code press Ctrl + Shift + P  and enter "Checkout to... " 
	3. Select "origin/humble-rpi4"
6. Open Docker the Humble ROS2 container
	1. on VS Code press Ctrl + Shift + P  and enter "Rebuild and Reopen in Container" 
	2. Check out the readme for the workspace to get started. Click [here](https://www.allisonthackston.com/articles/vscode-docker-ros2.html)to read a blog about this ROS2 workspace template 

## Setup github ssh keys

```shell
ssh-keygen -t ed25519 -C "<youremail>" -f ~/.ssh/<key_file>
```

```shell
ssh -T -i ~/.ssh/<private-key> git@github.com
```

```shell
git config --global user.email "youremail@yourdomain.com"
git config --global user.name "Your Name"
```