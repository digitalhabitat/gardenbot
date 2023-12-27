## PiSugar

>[!NOTE]  Make sure USB cable is connect to bottom left charging port.

[Amazon](https://www.amazon.com/Portable-Platform-Raspberry-Accessories-handhold/dp/B09MJ876FW/)
[Install](https://github.com/PiSugar/PiSugar/wiki/PiSugar-3-Series)
[TCP commands](https://github.com/PiSugar/pisugar-power-manager-rs)
[PiSugar Power Manager](https://github.com/PiSugar/PiSugar/wiki/PiSugar-Power-Manager-(Software))
Web UI: http://192.168.1.25:8421/#/

Default ports:

```
uds     /tmp/pisugar-server.sock
tcp     0.0.0.0:8423
ws      0.0.0.0:8422    # standalone websocket api
http    0.0.0.0:8421    # web UI and websocket (/ws)
```

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