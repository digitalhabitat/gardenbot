# Power System
```toc

```

## Components
- Power Strip
- Motor Battery System
- Logic Battery System
	- PiSugar Battery
- USB Isolator

---





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
> This UPS is only intended as a power fail safe for the Raspberry Pi incase the 12V logic battery fails
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