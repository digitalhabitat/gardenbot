## PiSugar

>[!NOTE]  Make sure USB cable is connected to bottom left charging port.
## Quick Start

### CLI
- Fetch battery charge percentage
```
echo "get battery" | nc -q 0 127.0.0.1 8423
```

Web UI: http://192.168.1.25:8421/#/

- Turn off Pi: 
	- Action: (Double Tap/Long Tap) Power button 
	- Note: Sugar Pi in Sleep mode
- Turn on Pi: 
	- Remove and Return **USB-C PS-Power**
	- Current Schedule Wake up Config = On Power Restore
- Status LED:
	- Solid Blue: On Battery
	- Incrementing Green: Charging (PS-Power Present)
	
![[pisugar-interface.drawio.svg]]
## Info
- Name: Pisugar 3 Plus Portable 5000 mAh UPS
- `i2c` Addresses
	- `0x57` PowerIC `i2cdump -y 1 0x57`
	- `0x68` [RTC](https://github.com/PiSugar/PiSugar/wiki/PiSugar-3-Series#rtc-on-board)
	- Shell Command: `i2cdetect -y 1`
- Links
	- [Amazon](https://www.amazon.com/Portable-Platform-Raspberry-Accessories-handhold/dp/B09MJ876FW/)
	- [Install](https://github.com/PiSugar/PiSugar/wiki/PiSugar-3-Series)
	- [TCP commands](https://github.com/PiSugar/pisugar-power-manager-rs)
	- [PiSugar Power Manager](https://github.com/PiSugar/PiSugar/wiki/PiSugar-Power-Manager-(Software))

>[!NOTE]
>**You can use SPI, I2C, and serial UART all at the same time**. There is no conflict. The Pi only has one usable UART. The simplest way to add additional serial links is to use a USB serial dongle. However UART0 and UART1 can not be used at the same time.


Default ports:

```
uds     /tmp/pisugar-server.sock
tcp     0.0.0.0:8423
ws      0.0.0.0:8422    # standalone websocket api
http    0.0.0.0:8421    # web UI and websocket (/ws)
```

## CLI Usage

```sh
nc -U /tmp/pisugar-server.sock
get battery
get model
rtc_alarm_set 2020-06-26T16:09:34+08:00 127
set_button_enable long 1
set_button_enable long sudo shutdown now
safe_shutdown_level 3
safe_shutdown_delay 30
<ctrl+c to break>
```

Or

```
nc -q 0 192.168.1.23
get battery
```

Or

```
echo "get battery" | nc -q 0 127.0.0.1 8423
```

- https://github.com/PiSugar/pisugar-power-manager-rs#unix-domain-socket--webscoket--tcp
- Output Current: 2.4A 
- Output Voltage:  5V 
- I2C: 0x75(BAT) 0x32(RTC)

### WebUI
**Local WebUI access**
- Via web browser visit http://192.168.1.22:8421

**Remote WebUI access** via Local Port Forwarding
0. `ssh -L <local-port>:<remote-server> -f user@<`
1. In a terminal enter
```sh
 ssh -L 8080:192.168.1.22:8421 proxy8.remoteiot.com
```
2. Via web browser visit http://localhost:8080/index.html

[[power_system_requirements_specifications]]