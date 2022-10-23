# Drive System
- [[drive-motor]] `MY1060`
- [[drive-motor-controller]] `roboclaw 2x30A`
- [[drive-motor-encoder-assembly]] `AMT103-V`
- [[drive-system-safety]]
- [[drive-system-wheel-assembly]]

![[chain_drive_system_nobg.PNG|400]]
## Description

The drive system is a dual motor chain drive using two 24 volt brushed DC motors. The motors are controlled with a closed-loop feedback PID motor controller. The feedback is provided by a pair of quadrature incremental encoders mounted on the motor shaft. The motor controller will also implement differential steering for improved handling. The gear ratio is 11-80 with an estimated maximum 378 RPM for the 10 inch pneumatic wheels. The high gear ratio was preferred to ensure the bot could handle rough terrain.

## Specs
Est. Max Power Consumption:  
- 720 Watts @ 30-A/24-VDC (w/ two motors)

Est. Typical Power Consumption: 
 - 400 Watts @ 16.6-A/24-VDC (w/ two motors)



---

## Components:

- [[drive-system-safety]]
- - [[drive-system-wheel-assembly]]
- [[drive-motor]] `MY1060`
- [[drive-motor-controller]] `roboclaw 2x30A`
- [[drive-motor-encoder-assembly]] `AMT103-V`
