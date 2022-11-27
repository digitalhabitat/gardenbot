# Wire System

The the wiring of each major electrical system is documented with https://www.diagrams.net/ via `.drawio` or `.drawio.svg`  See [FAQ](https://www.diagrams.net/doc/faq/save-file-formats) for file format details.The construction of individual wires and harnesses is documented with [WireViz](https://github.com/formatc1702/WireViz) via `.yml` files. The `.yml` files are store in the `wire-diagrams` directory and are processed into `.svg` files with the VScode Task "Run wireviz" using the shell script  `wireviz.sh`

>[!Work in progress]
> - #WIP
> - 24 Volt System Diagram (mostly complete)
> - 12 Volt System Diagram (incomplete)
> - Wiring construction (incomplete)
> - Part documentation (incomplete)
> - Wire lables (incomplete)

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


![[wireviz-w1.svg|w1]] ![[wireviz-w2.svg]]

## 24 Volt Supply Wiring Diagram


![[wire-system-24-volt.drawio.html]]


![[wire-system-24-volt.drawio.svg]]


---

## 12 Volt Supply Wiring Diagram

---
![[12v_battery_system.drawio.svg]]