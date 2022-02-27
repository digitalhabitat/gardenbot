---
aliases: [roboclaw]
---

# Drive Motor Controller - Roboclaw
---
- Max Voltage: 34 VDC
- 30 Amps Continuous Per Channel
- 60 Amps Peak Per Channel
- Motor Type: Brushed DC

Version: `V5E 2x30`
Firmware: `4.1.34`
OEM: BASICMICRO
[OEM Site](https://www.basicmicro.com/RoboClaw-2x30A-Motor-Controller_p_9.html)
[User Manual](https://downloads.basicmicro.com/docs/roboclaw_user_manual.pdf)
Interfacing Components:
- [[drive-motor-encoder-assembly]]
- [[drive-system-motors]]
- [[DIN-rail]]

---

## Warnings
1. Disconnecting the negative power terminal is not the proper way to shut down a motor controller. Any connected I/O to RoboClaw will create a ground loop and cause damage to RoboClaw and attached devices. Always disconnect the positive power lead first.
2. Brushed DC motors are generators when spun. A robot being pushed or coasting can create enough voltage to power RoboClaws logic intermittenly creating an unsafe state. Always stop the motors before powering down RoboClaw.
3. RoboClaw has a minimum power requirement. Under heavy loads, without a logic battery, brownouts can happen. This will cause erratic behavior. A logic battery should be used in these situations.
4. Never reverse the main battery wires, Roboclaw will be permenantly damaged.Never disconnect the motors from RoboClaw when under power. Damage will result
5. When wiring encoders make sure the direction of spin is correct to the motor direction. Incorrect encoder connections can cause a run away state. Refer to the encoder section of this user manual for proper setup
6.  A voltage clamping circuit is required to correct any regenerative voltage issues when a power supply is used as the main power source
7.  Never reverse the main battery wires, Roboclaw will be permenantly damaged. 
8.  Never disconnect the motors from RoboClaw when under power. Damage will result.

---

## General Settings
### IO
S3 Mode: E-Stop (Inverted)
- The E-Stop is designed to be Open Wire Fault Fail Safe. For example if any wires are in inadvertently disconnected, the E-Stop will activate.
- S3-SIG pin has a 1k Ohm pull-up reistor S3-PWR. The E-Stop is activated by an the Arduino nano pin_2 in INPUT mode set to LOW. The E-Stop is deactiveated by an 

---

## Notes

>The robo manufacturer warns against removing the electrical power from the motorcontroller as this would still allow the motor to spin and generate power and possibly cause regenerative voltage issues. The roboclaw can will have voltage clamp installed to limit the regnerative voltage feeback to the main power bus but it not yet understood if this will work once power is removed from the roboclaw (#todo Test the voltage clamp with out power supply to roboclaw)

## Related Components
VClamp https://www.basicmicro.com/VClamp_p_57.html








