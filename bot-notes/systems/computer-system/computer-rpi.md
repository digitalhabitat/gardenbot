---
aliases: [ rpi4, rpi]
---
# Raspberry Pi 4  2GB
-  Raspberry Pi 4 Model B Rev 1.5
### Components
- Din Rail Enclosure
- Camera
- Battery Backup
- 
https://elinux.org/RPi_VerifiedPeripherals

### Specs
- USB-C Power:
- Storage: 32 GB SD Card

### Software
-  Ubuntu 22.04 LTS (GNU/Linux 5.15.0-1011-raspi aarch64)
- ROS2

```shell
ssh bot@192.168.22
```

### Installations 
- https://roboticsbackend.com/install-ros2-on-raspberry-pi/
- docker
	- ROS docker Image https://hub.docker.com/_/ros
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