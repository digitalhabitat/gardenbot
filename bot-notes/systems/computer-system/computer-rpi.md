---
aliases: [ rpi4, rpi]
---

# Raspberry Pi 4  2GB

- Raspberry Pi 4 Model B Rev 1.5
- Raspberry Pi OS 64-bit
- Description: Debian GNU/Linux 11 (bullseye)
- `Linux raspberrypi 5.15.56-v8+ #1575 SMP PREEMPT Fri Jul 22 20:31:26 BST 2022 aarch64 GNU/Linux`
- [[computer-rpi-setup|rpi-setup]]

## Components

- Din Rail Enclosure
- LED Status indication
	- https://github.com/todbot/blink1-tool.git
- [[computer-rpi-camera]]
	- OV5647
	- 15-pin MIPI Camera Serial Interface (CSI) connector
	- https://www.amazon.com/gp/product/B07RWCGX5K
	- https://www.raspberrypi.com/documentation/accessories/camera.html
- Battery Backup
-  
https://elinux.org/RPi_VerifiedPeripherals

## Specs

- USB-C Power:
- Storage: 32 GB SD Card

## Software 
- Raspberry Pi OS 64-bit
- Visual Studio Code
- Docker
- ROS2 Workspace Remove Development Template
- See [[computer-rpi-setup]] for instructions.

## Peripheral Devices

- [[drive-motor-controller|roboclaw]]
- Bluetooth Controller (Procurement Pending)
- GNSS Receiver (Procurement Pending)

## Caveats

- The the rpi's camera firmware and libraries will not work for Ubuntu 64bit builds. [64 bit build failures](https://github.com/raspberrypi/userland/issues/630)
- https://2byt.es/post/vcgencmd/ 
```shell
sudo usermod -aG video <user>
```