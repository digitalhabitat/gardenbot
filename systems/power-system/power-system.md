
# Power System Concept

The power system is responsible for safely supplying power to the loads while also isolating other devices during different modes of operation or charging. This design incorporates on-board chargers that may only connect and charge the batteries under specific conditions. Most low cost off the shelf sealed lead acid (SLA) absorbent glass mat (AGM) float chargers \[SLA battery maintainers\] require the battery not be under load during charging. The design provides a solution for the following requirements.
### Power Modes

1. **Charging mode:** Shall use relays or contractors to isolate the 12V and 24V batteries from the loads. The relays or contractors shall also route power from an on-board 12V power supply to the 12V load such that the on-board computer can remain on during charging operations. The on-board computer ([[rpi]]) will have a dedicated UPS/Battery [[pisugar]] to operate during power source transitions such as (12V Battery to 12V Power Supply).
2. **E-stop mode:** Shall use an emergency-stop button that disconnects power to the 24V Load and Pre-charge circuit such that the Pre-Charge, Start, and Stop buttons are disabled and **Relay Z** is opened. When releasing the e-stop button the system shall return to Standby-Mode.
3. **Pre-Charge mode:** Shall provide a Pre-charge Momentary-On push button that supplies a reduced voltage (5V) from the 24V battery to reduced the in-rush current from the capacitive load characteristics of the motor controllers.
4. **Drive mode:** Shall provide a Start button to latches the normally open switch **Relay Z** closed. **Relay Z** and **Relay C** shall be specified to handle at least 24V and 50A. **Relay Z** shall act as the main power switch to provide 24V to motors. 
5. **Standby mode:** Shall provide a Stop button to unlatch the normally open switch Relay Z.
### Relay Behavioral Descriptions

1. **Relay A**
	1. When not energized:
		1. Isolate the 12V Charger from the 12V Battery Circuit
		2. Connect the 12V Battery Circuit to the 12V Load Circuit.
		3. Isolate 12V Power Supply from the 12V Load Circuit
	2. When energized by the 12V Power Supply:
		1. Connect the 12V Charger to 12V Battery Circuit
		2. Isolate the 12V Battery Circuit from the 12V Load Circuit.
		3. Connect the 12V Power Supply to the 12V Load Circuit
2. **Relay B**
	1. When not energized:
		1. Isolate the 24V Charger from the 24V Load Circuit during Standby Mode and Drive Mode.
	2. When energized the 12V Power Supply:
		1. Connect the 24V Charger to the 24V Battery Circuit during Charging Mode.
3. **Relay C**
	1. When not energized:
		1. Connect the 24V Load Circuit to the 24V Battery Circuit to enable Standby Mode and Drive Mode.
	2. When energized the 12V Power Supply:
		1. Isolate the 24V Load Circuit from the the 24V Battery Circuit to enable Charging Mode.
4. **Relay X**
	1. When energized by the 12V Load Circuit:
		1. Latch ON and subsequently latch ON **Relay Z**.
	2. When not energized by the 12V Load Circuit
		1. Latch OFF and subsequently latch OFF **Relay Z**.
5. **Relay Y**
	1. When energized by the 24V Battery Circuit it enables the Start-Stop Latching Relay Circuit such that the start button will complete the **Relay X Coil Circuit**.
	2. The main purpose is to act as a stop button to unlatch **Relay Z** during anytime the Power from the 24V Battery Circuit cuts out. This may occur once the e-stop is engaged or the charging mode is engaged thus not energizing the coil.
6. **Relay Z**
	1. When energized by the 24V Battery Circuit:
		1. Connect the power from the 24V Battery Circuit to 24V Load Circuit. The completion of the Relay Z Coil Circuit is dependent on Relay X Contacts, Relay Y Contacts, E-Stop Contacts, Start Button, and Stop Button. 
	2. When not energized by the 24V Battery Circuit:
		1. Disconnect power to 24V Load Circuit.

![[power-system-concept_DM.drawio.svg]]

## 24V Motor Battery System	
 
 ### Components
 - 2x12V-9AH SLA Batteries 
 - 24 V  1.5 A Charger `W13112099014`
 - Fuse Holder
 - Fuses (procurement pending #todo)
 
 ### Loads
-  [[drive-system#Specs]] 400 Watts???

### 24 Volt Wire System
[DC cable sizing calculator](https://www.fabhabs.com/dc-cable-sizing-calculator)
Voltage (V): 24
Current (Amps): 30
Cable run, including return (m) : 2 
Voltage drop (%): 3
Calculated Minimum cable cross section (mm^2): 4
Closest American (AWG) gauge: AWG 11
  
### Motor Battery Specs
- Capacity: 216 Watt-Hours (Nominal)
- Runtime: #todo
- 24V SLA Battery System (2x12V-9AH in Series)
- Model: `EXP1290`
- Terminals: `F2 0.25in`
- Supplier Link: https://www.amazon.com/dp/B001NJ3H0C
- Pre-Charger
- Emergency Stop
- Cycle use : >260 cyles
- Floating and Standby use : 3-5 years
- Self Discharge 3% per month @ 25 C
- Charge Voltage @ 25C
	- 14.4-14.7  (-30mV/C), max. Current: 2.70A


###  Charger Specs
- 24V SLA Wall Charger
- Model: `W13112099014`
-  Input `AC 100 - 120V 50/60Hz`
-  Output `24V 1.5A`
-  UL listed, short circuit, over charge, and over voltage protection 
- Supplier Link: https://www.amazon.com/gp/product/B000K0675C/

---

## Logic Battery System
 
### Components
- 12V SLA Battery (procurement pending #todo)
- 12V SLA Charger (procurement pending #todo)
- 12V-to-5V Step Down Converter 
	- Anker Dual USB-A Car Charger
- Fuses (procurement pending #todo) 
- Estimated Capacity = #todo
- (Battery Rated Capacity)
- (Usable Capacity Correction Percentage)
- (Battery Voltage/Converter Voltage)
- (Converter Efficiency Percentage)
- Lead Acid 
- Battery Rated Capacity ~= Usable Capacity (~65% of Rated Capacity) (50% of Rated Capacity, in high current applications)
	 - https://www.youtube.com/watch?v=lPyDtuzYE5s&t=754s
 
### Loads
- [[computer-nano|nano]] ~12.5Watts~
	- Micro-USB Power: 5V 2.5 Amps (Current Configuration)
	- Barrel Jack Power: 5V 4 Amps 
- [[drive-motor-controller|roboclaw]] (Logic Power) #todo
- [[rpi4]] #todo
- usb watt meter
- Rate Capacity (amp-hours)
 
### Logic Battery Specs
- Capacity: #todo
- Runtime: #todo
- 12V SLA Battery Supply
	- Supplier Link: https://www.amazon.com/dp/B00A82A2ZS

### 12V SLA Wall Charger
- Model: #todo 
- Supplier Link: #todo 

### Step Down Converter Specs
- 12V-to-5V Step Down Convert
- Model: #todo 
- Max Current: #todo 
- Supplier Link: #todo 

## PiSugar2

> This UPS is only intended as a power fail safe for the Raspberry Pi in case the 12V logic battery fails

	[[pisugar]]
-  Pisugar2 Portable 1200 mAh UPS Lithium Battery
- https://github.com/PiSugar/PiSugar/wiki/PiSugar2
- https://github.com/PiSugar/pisugar-power-manager-rs#unix-domain-socket--webscoket--tcp
- Output Current: 2.4A 
- Output Voltage:  5V 
- I2C: 0x75(BAT) 0x32(RTC)

### CLI
- Fetch battery charge percentage
```
echo "get battery" | nc -q 0 127.0.0.1 8423
```

### WebUI
**Local WebUI access**
- Via web browser visit http://192.168.1.22:8421

**Remote WebUI access**
1. In a terminal enter
```sh
 ssh -L 8080:192.168.1.22:8421 proxy8.remoteiot.com
```
2. Via web browser visit http://localhost:8080/index.html

[[power_system_requirements_specifications]]