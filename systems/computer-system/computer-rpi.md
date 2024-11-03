---
aliases: [ rpi4, rpi]
---

# Raspberry Pi 4  4GB

- Raspberry Pi 4 Model B Rev 1.5 (4GB)
- Raspberry Pi OS 64-bit
- Description: Debian GNU/Linux 12 (Bookworm)
- `Linux rpi4 6.6.51+rpt-rpi-v8 #1 SMP PREEMPT Debian 1:6.6.51-1+rpt3 (2024-10-08) aarch64 GNU/Linux`

- Quick Links
	- https://pinout.xyz/ #pinout
	- [[computer-rpi-setup|rpi-setup]]
	- [[pisugar]]

## Components

- Din Rail Enclosure

- 64 GB SD Card

## Software 
- Raspberry Pi OS 64-bit
- Visual Studio Code
- Docker
- ROS2 Workspace Remove Development Template
- See [[computer-rpi-setup]] for instructions.

## Peripheral Devices
- [[drive-motor-controller|roboclaw]]
- Bluetooth Controller
- [[usb-gnss-setup|GNSS Receiver]]
- - LED Status indication
	- https://github.com/todbot/blink1-tool.git
- [[computer-rpi-camera]]
	- OV5647
	- 15-pin MIPI Camera Serial Interface (CSI) connector
	- https://www.amazon.com/gp/product/B07RWCGX5K
	- https://www.raspberrypi.com/documentation/accessories/camera.html
- [[pisugar|Pi Sugar Battery Backup]]

 https://elinux.org/RPi_VerifiedPeripherals

## Caveats

- The the rpi's camera firmware and libraries will not work for Ubuntu 64bit builds. [64 bit build failures](https://github.com/raspberrypi/userland/issues/630)
- https://2byt.es/post/vcgencmd/ 
```shell
sudo usermod -aG video <user>
```