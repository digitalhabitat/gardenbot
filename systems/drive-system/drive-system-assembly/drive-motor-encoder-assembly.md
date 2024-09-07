---
aliases:
  - encoder
  - encoders
  - AMT103-V
---
# Drive Motor Encoder Assembly
---
![[drive_motor_encoder.PNG|300]]


## Parts

> [!NOTE]- Parts List Table
> ![[encoder-assembly-parts-list]]

[[Flat pattern of encoder-bracket-AMT103 Drawing 1.pdf]]

- Hex Nut Encoder Adapter (3D printed)
	- Material: MJF Nylon
	- File: encoder_adapter_v0.stl
	- Qty: 2
	- Drawing: [[Hex Nut Encoder Adapter Rev-.pdf]]
	- Supplier Link: https://www.jawstec.com/

- AMT10 Encoder Mount (3D printed)
	- Material: MJF Nylon	
	- File: encoder_mount_v3.stl
	- Note: The mounting holes for AMT103 where too large for the M3 Philip Machine Screws. A small amount of glue was used to shrink the holes. Version 4 should resize the holes to be 5-10% smaller (2.7mm) than the screw diameter(3mm). Also, the length from the mount surface to the motor shaft should be 56.5mm not 55mm. See [[MY1060_dimension.webp]]
	- Qty: 2
	- Drawing: [[AMT10 Encoder Mount Rev-.pdf]]
	- Supplier Link: https://www.jawstec.com/

- AMT103-V (Rotary Encoder Incremental Programmable Quadrature) #amt103
	- Qty: 2
	- Supplier Link: https://www.digikey.com/en/products/detail/cui-devices/AMT103-V/827016
	- Default Resolution: 2048 (qppr) (2048 is Maximum)
	- Resolution
		- `4*ppr*gear_ratio = Steps per wheel revolution`
		- `(4x2048)*(80/11)=59578.1818182`
		- `2*pi*r
		- meters per rev = 0.7979645340119
		- step per meter = `step/rev * (meters/rev)^-1`
		- steps per meter = 74662.6939905
		- 59578.1818182 Steps per Revolution (59,578)
	https://www.desmos.com/calculator/nbb1lyeses
	

		

- M3 x 0.5 mm Thread, 8 mm Long (Philip Machine Screw)
	- Purpose: Mounting AMT103-V to Encoder Mount
	- Qty: 2
	- Supplier Data: 
		- Menards SKU: ## 873146
		- https://www.homedepot.com/p/Everbilt-M3-0-5-x-10-mm-Phillips-Flat-Head-Zinc-Plated-Machine-Screw-3-Pack-841658/204849607

- Data Communication Cable (6C 24AWG DOUBLE SHIELDED CABLE)
	- Supplier Link: https://www.mcmaster.com/75985K63/
	- Order Length: 10 feet Spool
	- Qty: 1
	- Cut:
		2 parts of 3 feet cuttings
		
		
	[amt103-ppr]: 2048