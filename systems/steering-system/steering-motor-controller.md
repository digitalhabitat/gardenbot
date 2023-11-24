# Steering Motor Controller - ODrive

#todo

## Initial Testing of mjbots moteus controller with raspberry pi

https://github.com/babel-robotics/mjbots_Moteus/blob/main/docs/raspberry_pi.md


### CLI tool

```
pip3 install moteus
```

Basic info test

```
moteus -h
moteus -i
```


Serial console test
```
moteus -c
conf get id.id
```

List telemetry channels
```
tel list
```

```
tel get servo_stats
```

Get the current motor position offset value
```
conf get motor_position.output.offset
```

Set the current motor position offset value
```
conf set motor_position.output.offset -0.4
```

Run moteus_gui
```
sudo python3 -m moteus_gui.tview
```

### GUI tool

```
sudo apt install python3-pyside2* python3-serial python3-can python3-matplotlib python3-qtconsole
sudo pip3 install asyncqt importlib_metadata pyelftools
sudo pip3 install --no-deps moteus moteus_gui
```

---
## November Notes

https://github.com/mjbots/moteus/blob/main/docs/reference.md

https://github.com/mjbots/moteus/blob/main/docs/getting_started.md

### Added udev rules

https://github.com/mjbots/fdcanusb/blob/master/70-fdcanusb.rules

### Run GUI or CLI

```
python3 -m moteus_gui.tview
```

```
python3 moteus_tool --console
```
### Etc

 A command like `d pos nan 0 nan` can be used to "hold position"
```
python3 -m moteus.moteus_tool --target 1 --calibrate
```
 
https://www.youtube.com/watch?v=6prAv9hbmeM&t=237s