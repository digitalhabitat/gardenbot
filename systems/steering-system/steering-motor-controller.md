# Steering Motor Controller - ODrive

#todo

## Initial Testing of mjbots moteus controller with raspberry pi

https://github.com/mjbots/moteus/blob/main/docs/raspberry_pi.md

https://www.youtube.com/watch?v=6prAv9hbmeM&t=157s

Set defaults
```
conf default
```

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

 A command like `d pos nan 0 nan` can be used to "hold position"
## Starting fresh in July 2024

I recently purchased a new [moteus r4.11 controller](https://mjbots.com/products/moteus-r4-11)after accidentally frying my last one from the moteus dev kit. Referencing the moteus [getting_started.md](https://github.com/mjbots/moteus/blob/main/docs/getting_started.md)page on github. I was able to set some basic config parameters and calibrate the devices for the moteus. It is refreshing to see things moving again.

First I started the GUI and set the following configurations:
1. `servopos.position_min: 10`
2. `servopos.position_max: -10`
3. `servo.max_current_A: 40`

```
 python3 -m moteus_gui.tview
```

Second I launched the calibrating tool

```
python3 -m moteus.moteus_tool --target 1 --calibrate
```

Here is the output after calibrating
```
This will move the motor, ensure it can spin freely!
Starting calibration process
Testing 0.548V for resistance
Using 0.548 V for resistance and inductance calibration
Calculating winding resistance
0.274V - 5.235A
0.329V - 6.382A
0.383V - 7.368A
0.465V - 8.958A
0.548V - 10.543A
Calibrating | 
Storing encoder config
Calculating motor inductance
Calculated inductance: 2.7061918203661112e-05H
Calculated kp/ki: 0.01700350468413393/32.617144037664104
Calculating Kv rating
Testing 0.602V for Kv
0.000V - -0.019Hz
0.151V - 2.427Hz
0.301V - 3.627Hz
0.452V - 4.787Hz
0.602V - 6.035Hz
v_per_hz (pre-gearbox)=0.10409780857098226
Saving to persistent storage
Calibration complete
REPORT: moteus-cal-ADsAP1QwUBQgOTNO-20240707T053905.633576.log
------------------------
{
  "timestamp": "2024-07-07 05:39:05.633576",
  "device_info": {
    "serial_number": "ADsAP1QwUBQgOTNO",
    "model": "0",
    "git_hash": "1ba9e683e207d792060b45ea435dd6905589a7d4",
    "git_dirty": false,
    "git_timestamp": 1704573873,
    "uuid": "a6f2a76c-d89b-442a-ba72-c22e72c31101"
  },
  "calibration": {
    "invert": false,
    "phase_invert": true,
    "poles": 14,
    "offset": [
      0.9291043923982312,
      0.9080441376652112,
      0.923251210321675,
      0.9302735384682055,
      0.9209538083401249,
      0.9362829160504444,
      0.9336180211790873,
      0.9162088646671183,
      0.9246434017578448,
      0.9243608180641886,
      0.9119390176439753,
      0.9341803220114789,
      0.9441491999433136,
      0.9345091722948959,
      0.9546224644381333,
      0.9587009827621329,
      0.940866427591365,
      0.9424844926740586,
      0.9423741494825162,
      0.9235825680286207,
      0.9329791463628045,
      0.9395819222680403,
      0.9230719609761023,
      0.9374960274030024,
      0.9468792430204659,
      0.9287872090293436,
      0.9265690789435301,
      0.9319126340197734,
      0.9119536892725523,
      0.916217260685877,
      0.9284349729012737,
      0.9161694481877397,
      0.9229000983556694,
      0.9322429826765771,
      0.9135108888562541,
      0.9105339836755743,
      0.9188153374905843,
      0.8993951983411802,
      0.9003032776482336,
      0.9195018091414466,
      0.9173317960977031,
      0.9268154494523038,
      0.9456301398966219,
      0.9373080148629866,
      0.9323385738799804,
      0.9479210106497703,
      0.9344117173427554,
      0.935705686151873,
      0.9593096861645075,
      0.9561208809738951,
      0.9606123295540611,
      0.9794030530024259,
      0.9655958030423725,
      0.9483422603745693,
      0.9538860459595291,
      0.9382022290073622,
      0.9296042697770357,
      0.9472156147122485,
      0.9489999555065128,
      0.9477995316625859,
      0.9643512115052546,
      0.9561865550020834,
      0.9380360368044164,
      0.9416474922656203
    ]
  },
  "winding_resistance": 0.05191179703134584,
  "inductance": 2.7061918203661112e-05,
  "pid_dq_kp": 0.01700350468413393,
  "pid_dq_ki": 32.617144037664104,
  "torque_bw_hz": 100.0,
  "encoder_filter_bw_hz": 200.0,
  "encoder_filter_kp": 2513.2741228718346,
  "encoder_filter_ki": 1579136.7041742974,
  "v_per_hz": 0.10409780857098226,
  "kv": 288.1905047938025,
  "unwrapped_position_scale": 1.0
}

```

https://www.youtube.com/watch?v=6prAv9hbmeM&t=237s

## Test 3

1. Plug usb2can device into rpi4
2. Verify detection
```shell
$ lsub
> Bus 001 Device 062: ID 0483:5740 STMicroelectronics Virtual COM Port
```
3. run the gui
```
python3 -m moteus_gui.tview
```