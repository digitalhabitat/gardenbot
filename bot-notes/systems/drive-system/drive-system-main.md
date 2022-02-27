# Drive System

## Description

The drive system is a dual motor chain drive using two 24 volt brushed DC motors. The motors are controlled with a closed-loop feedback PID motor controller. The feedback is provided by a pair of quadrature incremental encoders mounted on the motor shaft. The motor controller will also implement differential steering for improved handling. The gear ratio is 11-80 with an estimated maximum 378 RPM for the 10 inch pneumatic wheels. The high gear ratio was perfered to ensure the bot could handle rough terrain.

## Specs
Est. Max Power Consumption:  
- 720 Watts @ 30-A/24-VDC (w/ two motors)

Est. Typical Power Consumption: 
 - 400 Watts @ 16.6-A/24-VDC (w/ two motors)

![[chain_drive_system.PNG]]


---

Components:

- [[drive-system-safety]]
- [[drive-system-motors]]
	- [[drive-motor-encoder-assembly]]
- [[drive-motor-controller]]

- [[drive-system-wheel-assembly]]

	