---
aliases: [estop]
---
# Drive System Safety

Emergency Stop and Pause Systems should be Open Wire Fault Tolerant. This fail-safe means that if you rip out the wires that connects the E-Stop switches from the power supply, microcontroller, or relays it should activate the Stopping system regardless of the state of the Emergency Stop Switch.  

We want to ensure to near absolute certainty that the E-Stop will always work as expected. In the pursuit of extremely high reliability the overall design should be low-tech and simple. Before diving into the design it is important to discuss different categories of E-stops.

## Category 2 E-Stop
 Category 2 means that when the E-stop is activated the system will stop all moving electrical devices and power will remain available to the motor controlling systems. Simply put, a Cat 2 E-Stop has the following conditions when activated:
 1. Halt all movement of the machine as soon as possible.
 2. Electrical power is still supplied to devices.

## Category 1 E-Stop
Category 1 means that the moment the E-stop is activated the system will stop all moving electrical devices while simultaneously removing power from the motor controlling systems.[^1] Simply put, a Cat 1 E-Stop has the following conditions when activated:
1. Halts all movement of the machine as soon as possible.
2. Electrical power is removed from the motor controllers and electromechanical devices.

[^1]: Some electrotechnical devices use the supplied electrical power to stop the moving parts known as E-Braking. In this case you might see a system delay the removal of power so the E-Brakes have enough time to sufficiently stop all moving devices. Another solution could implement mechanical brakes that passively active under the event of power being removed from the system. 

## Category 0 E-Stop
Category 0 means that when the E-stop is activated the result is  **power is immediately removed** from the motor controllers and the motors. If the motors are moving when this occurs it will result in an uncontrolled stop. This behavior is identical to "pulling the plug" from the system. This is not an optimal strategy to disable the bot if it already moving and has any kinetic energy. [^2] Simply put, a Cat 0 E-Stop has the following conditions when activated:
1. Removes electrical power from the motor controllers and electromechanical devices.

[^2]: The Category 0 E-Stop should be considered a last-ditch effort to disable the machine once all E-Stop systems fail. It is possible to design a mechanical braking system that would activate in the event of removing power, but it is not a priority for this project.

## E-Stop Design

#todo

## Additional Reading

https://robotics.stackexchange.com/questions/112/how-should-emergency-stops-be-wired






