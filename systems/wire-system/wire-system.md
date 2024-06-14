# Wire System

The the wiring of each major electrical system is documented with https://www.diagrams.net/ via `.drawio` or `.drawio.svg`  See [FAQ](https://www.diagrams.net/doc/faq/save-file-formats) for file format details. The construction of individual wires and harnesses is documented with [WireViz](https://github.com/formatc1702/WireViz) via `.yml` files. The `.yml` files are store in the `wire-diagrams` directory and are processed into `.svg` files with the VScode Task "Run wireviz" using the shell script  `wireviz.sh`

>[!Work in progress]
> - #WIP
> - 24 Volt System Diagram (mostly complete)
> - 12 Volt System Diagram (incomplete)
> - Wiring construction (incomplete)
> - Part documentation (incomplete)
> - Wire lables (incomplete)
> - https://www.cosjwt.com/tag/asme-y1444-2008/
> - IEEE-200-1975 (ANSI Y32.16-1975)
> - ASME Y14.44-2008 
> - [NASA Workmapship Standards](https://workmanship.nasa.gov/lib/insp/2%20books/frameset.html)
> - [NASA Wire and Cable Workmanship](https://workmanship.nasa.gov/lib/insp/2%20books/links/sections/407%20Splices.html)

>[!Info] **Golden rules** for harness reference designation from IEEE-200-1975 include:
> - The movable (less fixed) connector of a mating pair shall be designated P [where P means plug].
> - The stationary (more fixed) connector of a mating pair shall be designated J or X [where J means Jack].
> - If two cables are to be connected to each other, each of the mating cable connectors shall be designated P.


## 24 Volt Wire System

### Parts

- 24 Battery (2x12VDC )
	- Labels: `BAT1`  `BAT2`
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

### Electrical Cabling and Wires

- 10 AWG, Single conductor, Stranded Copper
	- Manufacturer: Southwire
	- Seller:
	- Labels: W1, W2
- 16 AWG, Single conductor, Stranded Copper
	- Manufacturer: Southwire
	- Seller: 

- 20 AWG, 2 Conductor, PVC Jacked, Stranded Copper 
	- Manufacturer: TZMOIK
	- Seller: Amazon
		- ASIN : B093LBG853
	- Labels: WX1, WX2


![[wireviz-w1.svg|w1]] ![[wireviz-w2.svg|w2]]

## 24 Volt Supply Wiring Diagram

![[wire-system-24-volt.drawio.svg]]


---

## 12 Volt Supply Wiring Diagram

---
![[12v_battery_system.drawio.svg]]