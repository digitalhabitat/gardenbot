---
aliases: [nano]
---
# Nvidia Jetson Nano (B01)
https://elinux.org/Jetson_Nano
## Components
- Enclosure
- M.2 WIFI/Bluetooth Adapter
- Power Supply

## Specs
-  Micro-USB Power: 5V 2.5 Amps (Current Configuration)
- Barrel Jack Power: 5V 4 Amps [Setup](https://www.jetsonhacks.com/2019/04/10/jetson-nano-use-more-power/)
- Max Est. Power Consumption:  12.5 Watts
- M.2 Slot: 802.11ac WiFi/BT adapter 
- Storage: 32 GB FashDisk

## Software
- OS: Ubuntu 20.04
	- https://qengineering.eu/install-ubuntu-20.04-on-jetson-nano.html ^links
- ROS2

```shell
ssh jetson@192.168.1.14
```

## Caveats
- The Jetson Nano uses a custom kernel (GNU/Linux 4.9.253-tegra aarch64) that can't properly install WireGuard due to a [WireGuard bug](https://forums.developer.nvidia.com/t/kernel-error-when-using-wireguard/184764). The workaround is to use a user space implementation, [wireguard-go](https://github.com/WireGuard/wireguard-go)
---


## Power Supply
- [[power-system]]
- 5V 2.5 USB power supply

## Notes
Fetch rpis model info
```shell
tail -n10 /proc/cpuinfo
```

tools not already installed on rpi
```shell
sudo apt install net-tools
```