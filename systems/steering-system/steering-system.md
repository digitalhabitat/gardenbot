# Steering System

Supplier Links
- https://us.misumi-ec.com/
- https://www.harborfreight.com/
- https://www.mcmaster.com/
## Dual motor skid steering

This is the simplest design. The design is similar to what you may see on a zero-radius turn lawn mower. Two independently controlled rear wheel drives with two caster wheels in the front. The draw backs are low handling performance at moderate speeds and on non-flat surfaces or rough terrain. This could be improve with a wider wheel base geometry. 

Materials
- [8 in. Pneumatic Swivel Caster](https://www.harborfreight.com/material-handling/tires-casters/swivel-casters/8-inch-pneumatic-swivel-caster-42485.html)

<iframe width="560" height="315" src="https://www.youtube.com/embed/C3Nxp40HBfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Ackerman Steering Notes
- https://web.archive.org/web/20180325200857/http://sariel.pl/2015/03/virtual-pivot-steering-system/
- Gear Motor Options
    - [NEMA 17 10:1 5mm input to 8mm output](https://www.omc-stepperonline.com/mg-series-planetary-gearbox-gear-ratio-10-1-backlash-30-arc-min-for-nema-17-stepper-motor-mg17-g10)
    - [NEMA 17 5:1 5mm input to 8mm output](https://www.omc-stepperonline.com/mg-series-planetary-gearbox-gear-ratio-5-1-backlash-30-arc-min-for-nema-17-stepper-motor-mg17-g5)
    - [NMEA 23 5:1 8mm Input to 14mm output ](https://www.omc-stepperonline.com/en-gb/mg-series-planetary-gearbox-gear-ratio-5-1-backlash-30arc-min-for-8mm-shaft-nema-23-stepper-motor-mg23-g5-d8)
## Ackermann Steering with Odrive Motor

### Motor Details
Model: [D5065 270kv](https://shop.odriverobotics.com/products/odrive-custom-motor-d5065)
Torque: 1.99 Nm
Primary Shaft Diameter: 8 mm (D-shaft cut)
Primary Shaft Length: 30 mm
Secondary Shaft diameter: 8 mm
Secondary Shaft length: 16 mm
## Ackermann Steering with mjbots Motor

### Gear motor Details
 - Model: - MG17-G5 [NEMA 17 5:1 5mm input to 8mm output](https://www.omc-stepperonline.com/mg-series-planetary-gearbox-gear-ratio-5-1-backlash-30-arc-min-for-nema-17-stepper-motor-mg17-g5)
 - Max.Permissible Torque: 9Nm(79.66lb-in)

### Motor Controller Details
[moteus r4.11](https://mjbots.com/products/moteus-r4-11)
- 3 phase brushless FOC based control
- Voltage Input: 10-44V (<=10S)
- Temperature: -40-85C
- Peak Electrical Power: 500W
- Mass: 14.2g
- Control rate: 15-30kHz
- PWM switching rate: 15-60kHz
- 170 MHz 32 bit STM32G4 microcroprocessor
- Peak phase current: 100A
- Continuous phase current: 11A / 22A (w/o and w/ thermal management)
- Max electrical frequency: 3kHz
### Motor Details
Model:[mj5280](https://mjbots.com/products/mj5208)
- Peak torque: 1.7 Nm
- Mass (with wires): 193 g
- Peak power: 600W
- Kv: 330
- Maximum RPM: 7500
- Outer diameter: 63mm
- Length: 25mm

