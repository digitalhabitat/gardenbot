# Wire System

The the wiring of each major electrical system is documented with https://www.diagrams.net/ via `.drawio` or `.drawio.svg`  See [FAQ](https://www.diagrams.net/doc/faq/save-file-formats) for file format details. The construction of individual wires and harnesses is documented with [WireViz](https://github.com/formatc1702/WireViz) via `.yml` files. The `.yml` files are stored in the `wireviz` directory and are processed into `.svg` files with the VScode Task "Run wireviz" using the shell script  `wireviz.sh`

>[!Work in progress]
> - #WIP
> - 24 Volt System Diagram (mostly complete)
> - 12 Volt System Diagram (incomplete)
> - Wiring construction (incomplete)
> - Part documentation (incomplete)
> - Wire lables (incomplete)
> - Topics on how properly properly reference and annotate everything from a single circuit board to a collection of complete enclosures.   
> 	- https://en.wikipedia.org/wiki/Reference_designator
> 	- https://www.cosjwt.com/tag/asme-y1444-2008/
> 	- IEEE-200-1975 (ANSI Y32.16-1975)
> 		- ==Obsolete== Reference Designations for Electrical and Electronics Parts and Equipment
> 	- ASME Y14.44-2008
> 		- ==Renewed== Reference Designations for Electrical and Electronics Parts and Equipment
> 	- MIL-STD-1472H (Human Engineering)
> 		- Ideal spacing, size, dimension, and symbols for switches
> - [NASA Workmapship Standards](https://workmanship.nasa.gov/lib/insp/2%20books/frameset.html)
> - [NASA Wire and Cable Workmanship](https://workmanship.nasa.gov/lib/insp/2%20books/links/sections/407%20Splices.html)
> - [WireViz syntax](https://github.com/wireviz/WireViz/blob/dev/docs/syntax.md)
> - [Relay Pin Numbering](https://klc.kicad.org/general/g3/g3.1/)
> - [Regenerative Braking Safety](https://github.com/mjbots/moteus/blob/main/docs/reference.md#regenerative-braking-safety)
> - 
> - [Siemens Symbols Library](https://symbols.radicasoftware.com/)


>[!Info] **Golden rules** for harness reference designation from IEEE-200-1975 include:
> - The movable (less fixed) connector of a mating pair shall be designated P [where P means plug].
> - The stationary (more fixed) connector of a mating pair shall be designated J or X [where J means Jack].
> - If two cables are to be connected to each other, each of the mating cable connectors shall be designated P.


## 24 Volt Wire System

Labeling Convention `<Wire-id><Port-id><Mate-id>
- Wire id: Specifies a wire harness (maybe a single or multiple conductors)
- Port-id: Specifies a wire port (Always at least 2 per wire harness)
- Mate-id: Specifies a mating connect (Always a least a single matching pair)

[[power-system#24 Volt Wire System]]

>[!Note]
>[DC cable sizing calculator](https://www.fabhabs.com/dc-cable-sizing-calculator)
> Voltage (V): 24
> Current (Amps): 30
> Cable run, including return (m) : 2 (6.65 feet)
> Voltage drop (%): 3
> Calculated Minimum cable cross section (mm^2): 4
> Closest American (AWG) gauge: AWG 11
### Parts
- [[24v-battery|24V Battery (2x12VDC)]]
- [[24v-battery-charger|24V Battery Charger]]
-  50 Amp ANL Fuse and Fuse holder
	- Labels: `FH1` `F1`
- Main Battery Disconnect Switch
	- Label: `S1` 
- 24V SLA Charger Switch
	- Label: `S2`
- DIN Rail Terminal Blocks
	- Label: `TB1`
- Voltmeter Gauge
	- Label:
- Brushed DC Motor Controller
	- Label:
	- `Roboclaw V5E 2x30`
- 2x DC Motors
	- Label:
	- `MY1016`

## Power System Concept

The power system is responsible for safely supplying power to the loads while also isolating other devices during different modes of operation or charging. This design incorporates on-board chargers that may only connect and charge the batteries under specific conditions. Most low cost off the shelf sealed lead acid (SLA) absorbent glass mat (AGM) float chargers \[SLA battery maintainers\] require the battery to not be under load during charging. The design provides a solution for the following requirements.
1. Charging mode: Shall use relays or contractors to isolate the 12V and 24V batteries from the loads. The relays or contractors shall also route power from an on-board 12V power supply to the 12V load such that the on-board computer can remain on during charging operations.
2. E-stop mode: Shall use an emergency-stop button that disconnects power to the 24V load and pre-charge circuit such that the Pre-Charge, Start, and Stop buttons have no battery electrical power supplied to them. This shall effectively unlatch **Relay Z**.
3. Pre-Charge mode: Shall provide a pre-charge button that supplies a reduced voltage (5V) from the 24V battery to minimize the in-rush current from the capacitive load characteristics of the motor controllers.
4. Start/Stop mode: Shall provide a Start and Stop button to latch a normally open switch (relay_z) closed. Relay Z and Relay C shall be spec'd to handle at least 24V and 50A. Relay Z shall act as the main power switch to provide 24V to motors.

![[power-system-concept.drawio.svg]]
## 24 Volt Supply Wiring Diagram

[![[wire-system-24-volt.drawio.svg]]](wire-system-24-volt.drawio.html)


---

## 12 Volt Supply Wiring Diagram

---
![[12v_battery_system.drawio.svg]]## Glossary

changeover contact