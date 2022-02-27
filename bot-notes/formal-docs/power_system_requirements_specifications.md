# Power System Requirements Specifications

## Purpose
The goal of of the Main Power System is to provide the necessary electrical energy to motors and electircal devices in a safe and controlled manner. There are several ways to turn off or on or disable the machine. This document is to describe how each way should be done under specific conditions and scenarios in order to acheive desired results in the power systems' system behavior.

1. Emergency Stop Switch
    * Since the machine has moving parts the first response during any system malfunction or emergency is to stop all moving parts. The design of the electrical motors controllers involve diverting excess power through a power resistor. #todo 

2. Battery Disconnect Switch
    * This switch shall primarily be used to remove electrical power from the system when the machine is not moving. Only in during an Emergency Stop Failure should the Battery Disconnect be use to disconnect the power while the machine is still moving. This action will provide a Category 0 stop only.

3. Pre-charge Switch
	- #todo

## Requirements

1. The power system shall have a Category 1 emergency stop switch mounted on the rear of the vehicle readily accessible.
    * A Category E-Stop is a controlled stop (see 3.11) with power available to the machine actuators to achieve the stop and then removal of power when the stop is achieved. The E-stop design must include electrical fail-safe measures that minimize the risk of the E-stop itself to not work or involve operator error. #todo
    