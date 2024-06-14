# USB GNSS RTK Receiver Setup


>[!Work in Progess]-
> - Initial testing notes #WIP 
> - https://learn.sparkfun.com/tutorials/what-is-gps-rtk/all
> - https://www.ardusimple.com/rtk-explained/
> - [rtkexplorer – Exploring low cost solutions for high precision GPS/GNSS](http://rtkexplorer.com/)
> - https://en.wikipedia.org/wiki/NMEA_0183
> - https://incors.in.gov/rtk.aspx
> - [open mower ntrip](https://wiki.openmower.de/index.php?title=System_Image#STR2STR_(optional,_recommended;_only_needed_if_you're_using_NTRIP,_so_probably_most_of_you))
> - https://ntrip-list.com/
> - http://reach.local
> - https://github.com/rtklibexplorer/RTKLIB
> - https://packages.ubuntu.com/search?keywords=rtklib
> - http://magnav.mit.edu/
> - https://youtu.be/lQuVkbphOog
>   


>[!INFO] Helpful Resources
> - [RTK Explained](https://www.ardusimple.com/rtk-explained/)
> - [What is str2str](https://github.com/septentrio-gnss/Septentrio_AgnosticCorrectionsProgram/blob/main/str2str/README.md#what-is-str2str)
> - [simpleRTK2B – Basic Starter Kit](https://www.ardusimple.com/product/simplertk2b-basic-starter-kit-ip65/)
> - https://incors.in.gov/

This setup provides a tutorial on how to use a GNSS RTK Receiver, a Linux Machine, and an RTK Correction Service (or Base Station) to access position data with centimeter-level precision. Many GNSS RTK Receivers will connect to an NTRIP Caster directly utilizing its on-board LoRa,WiFi, Bluetooth, or Cellular Modem. However this tutorial is geared towards using a Linux Machine to connect to an NTRIP Caster to receive the RTK Correction Data and then relay the data to the RTK Receiver via USB. This use case is more relevant to a robotic platform that already has access to the Internet or a Local Network with an NTRIP Caster/Server. Main reason to do it this way is because your Linux Machine may already be using a Cellular Modem or Long Distance Wireless Access Point. This would render the wireless capabilities of the RTK Receiver as redundant or less capable than what the Linux machine is using.

![[gnss-rtk-diagram.drawio.svg]]
## Basic Concepts

### GNSS RTK Receiver (Rover)

These devices have recently became available in low-cost forms with comparable performance to higher end products. It is basically a micro-controller with a GNSS antenna and receiver with the capability to run complex calculations that enable it to resolve position data with centimeter precision under the right conditions. The micro-controller may be using a library like [RTKLIB](https://github.com/rtklibexplorer/RTKLIB) to perform the calculations. The most important condition for resolving centimeter-level precision is access to RTK corrections from a nearby (approximately 35 km) Base Station.

### Base Station

The Base Station is basically a stationary GNSS RTK Receiver that is configured to stream out RTK correction data using a NTRIP Server (COTS products offer this as a single package). A Base Station and Reference Station are synonymous.

### Continuously Operating Reference Stations (CORS) network

A CORS Network is a collection of GNSS Base stations combined in a single network to provide wider coverage of valid RTK correction data. Recall that RTK correction data is only valid within approximately a 35 km radius of the Base Station. A CORS network may provide convenient access to RTK correction data from the nearest base station. There also exist advance techniques to combine correction data from multiple base stations to provide correction data from a Virtual Reference Station (VRS) to further reduce location error. [See VRS for details](https://geo-matching.com/content/the-principles-and-performance-of-cors-network-rtk-and-vrs)

### NTRIP Client

[RTKLIB](https://packages.ubuntu.com/jammy/rtklib) provides a suite of CLIs and GUIs that simplify much of the work. In theory could configure your design to perform the RTK calculations on the Linux Machine. However in this tutorial, the Linux Machine is only used to relay the RTK correction data from the NTRIP Caster to the GNSS RTK Receiver. To do this we use the RTKLIB CLI `str2str` which enables us to connect to a NTRIP caster as a data input source and a GNSS RTK Receiver has a data output target. This employs our Linux machine as a NTRIP Client. Alternatively, instead of using the RTKLIB CLI, we can use the ROS package [ntrip_client](http://wiki.ros.org/ntrip_client). See OpenMower's [ntrip_client](https://github.com/ClemensElflein/open_mower_ros/blob/63f11ded7ed5eafcaaefb1778d315079e11c6fed/src/open_mower/launch/include/_ntrip_client.launch) launch file for further details.

https://software.rtcm-ntrip.org/wiki

## RTKLIB str2str

[str2str manual](https://www.rtklib.com/prog/manual_2.4.2.pdf#page=101)

0. Open a terminal and enter the following command to capture the serial port device label e.g. `/dev/tty*` [More info](https://en.wikipedia.org/wiki/Serial_port#Hardware_abstraction)
```shell
dmesg --follow
```

1. Plugin in the USB RTK module and on the Linux terminal you should see this something like the following: 

```stdout
[604400.525618] cdc_acm 1-1.3:1.0: ttyACM0: USB ACM device
                                   ^^^^^^^ make note of this label
```

> [!NOTE]
> If you're using a terminal within a docker container you may need to try running the 
> container in "privileged" mode. This is consider unsafe in some circumstances so you may look [here](#TODO) for details on how to expose serial interfaces more securely.

2. Cancel the process from step 0. In the terminal, enter the following.
```shell
sudo screen /dev/ttyACM0 9600
```

or

```shell
sudo cutecom
```

3. You should be able to observe [NMEA strings](http://lefebure.com/articles/nmea-gga/) streamed to the terminal. If not, your device may need to be manually configured to do so. One, alternative method is to configure the GNSS receiver to output data via TCP. Enter the either the following commands to observe the data stream.

```shell
nc 192.168.0.20:9002
```

or

```shell
socat - TCP4:192.168.0.20:9002
```

4. The `str2str` rtklib CLI application is use to connect to a NTRIP Caster and receive correction data. 

```
$ sudo ./str2str -in ntrip://username:password@hostname:port/mountpoint -out serial://ttyACM0:115200#52001 -b 1
```


### Access RTK correction service and RTK correction data

- If your using a RTK correction service then we need a convenient way to store the login credentials securely. This is can be done with Environment Variables
- Alternatively you can set up your own base station (this requires an additional Receiver that can stream out RTK corrections).
- Each method will perform similarly. The limitations of each will be based on the following:

|Method|Base Station Coverage| Cost|
|-|-|-|
|RTK Service| Typically Statewide| Free or Subscription (depending on state)|
|RTK Base station | 6 mi (single band) 36 mi (multi-band)| +$300 for additional receiver and antenna|

---

### Environment Variables

https://www.linode.com/docs/guides/how-to-set-linux-environment-variables/

0. Open new terminal,  and append the `.bashrc` file with the following template and overwriting the characters with `...` 

```shell
sudo vim ~/.bashrc
```

>[!WARNING]
> Note login credentials environment variables have been omitted. Use this snippet as a template. Be careful **NOT** to upload theses to the internet. This should pasted at the bottom of the .bashrc file of the Linux machine. This will create permanent environment variables to store RTK correction service login credentials. This template has two separate ports and endpoints for connecting to a network that automatically selects a reference station and one for connecting a specific reference station. 

>[!Info] 
> If you prefer not to store secrets as environment variables [OWSAP recommends](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html#32-where-should-a-secret-be) using secrets-manager such as:
> >[AWS Secret Manager](https://aws.amazon.com/secrets-manager/), [Azure Key Vault](https://azure.microsoft.com/nl-nl/services/key-vault/), [Google Secret Manager](https://cloud.google.com/secret-manager)), or other third-party facilities ([Hashicorp Vault](https://www.vaultproject.io/), [Conjur](https://www.conjur.org/), [Keeper](https://www.keepersecurity.com/), [Confidant](https://lyft.github.io/confidant/))
> 
> Other secret managers are [bitwarden](https://bitwarden.com/products/secrets-manager/)and [infisical](https://infisical.com/infisical-vs-hashicorp-vault)

```shell
# InCORS RTK correction service credentials https://incors.in.gov/
# Save the environment variables to to .bashrc i.e `sudo vim ~/.bashrc`
#########################################################
# DO NOT PUBLISH, THIS CONTAINS USERNAMES and PASSWORDS #
#########################################################
export NT_HOSTNAME='...'
# Automatic cells
export NT_PORT_AUTO='9000'
export NT_ENDPOINT_AUTO='RTCM3_MAX'
# single site
export NT_PORT_SINGLE='...'
export NT_ENDPOINT_SINGLE='...'
# secret
export NT_USER='...'
export NT_PASSWORD='...'
```

1. After saving edits, close the terminal then run `source ~/.bahsrc`
2. Verify environment variables
```shell
echo -e '\n'\
'ntrip hostname:        ' $NT_HOSTNAME'\n'\
'ntrip port_auto:       ' $NT_PORT_AUTO'\n'\
'ntrip endpoint_auto:   ' $NT_ENDPOINT_AUTO'\n'\
'ntrip port_sigle:      ' $NT_PORT_SINGLE'\n'\
'ntrip endpoint_single: ' $NT_ENDPOINT_SINGLE'\n'\
'ntrip user:            ' $NT_USER'\n'\
'nitrip password:       ' $NT_PASSWORD
```

---

### Installing RTKLIB

0. In the terminal install the rtklib

```
sudo apt install rtklib
```

1. Attempt to receive RTK corrections.

 - Single Site
 
```shell
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_SINGLE/$NT_ENDPOINT_SINGLE#rtcm3
```

- Automatic Site

> [!warning]
> Automatic site requires communication with a **GNSS RTK Receiver** in order to automatically send you correction data from the nearest site (mount point). Since there is NO target `-out` parameter provided in the example below `str2str` will timeout as it waits to receive GNSS coordinate data. In this case the `-in` `-out` abstraction is not strictly accurate since the data is being exchanged both directions between server and client. #todo explain `-b 1` argument.

```shell
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_AUTO/$NT_ENDPOINT_AUTO#rtcm3
```

## GNSS RTK Receiver
### Configure RTK device correction input and position out methods

This project is using the [Emlid Reach RTK Module](https://docs.emlid.com/reach/reference/specifications/reach-module-specs/) and following [documentation](https://docs.emlid.com/reach/). Once the device is connected to a local WiFi network device can be accessed via the web app http://reach.local

### Emlid Reach 

- Raw data receiver: U-blox NEO-M8T – 72 channels, output rate is up to 18Hz, supports GPS L1, GLONASS G1, BeiDou B1, QZSS, SBAS, ready for Galileo E1
- Processing unit: Intel Edison – dual-core 500 MHz
- Connectivity: I2C, UART, GPIO, TimeStamp, OTG USB, Bluetooth, Wi-Fi
- GNSS Antenna: external with MCX connector
### Interface
- USB-to-PC 
	- On Reach Module: Micro-USB 
- UART
	- On Reach Module: Hirose DF13-6P-1.25H(50) colloquially  "DF13 Female headers"
	- https://www.lambdrive.com/depot/Robotics/Controller/PixhawkFamily/Connector/index.html
	- https://store.emlid.com/us/product/reach-m-cable-for-pixhawk/
	-   [Molex PicoBlade](https://www.amazon.com/1-25mm-Adapter-Pixhawk-Controller-Quadcopter/dp/B07PWZTC88/)- Can be inserted into DF13 Female headers (but not visa versa)
	- https://raspberrypi.stackexchange.com/questions/104464/where-are-the-uarts-on-the-raspberry-pi-4
	- https://raspberrypi.stackexchange.com/questions/45570/how-do-i-make-serial-work-on-the-raspberry-pi3-pizerow-pi4-or-later-models/107780#107780

 >[!info]- The Emlid is configured with the following settings:
#todo: update the config below
> ```
> [details="Simple system report"]
> app version: 28.4-r0
> enabled: true
> mode: client
> correction_input:
>   base_corrections:
>     io_type: serial
>     settings:
>       serial:
>         baud_rate: 115200
>         device: ttyGS0 (USB-to-PC)
>         send_position_to_base: true
> position_output:
>   output1:
>     io_type: serial
>     nmea_settings:
>       serial:
>         gga:
>           enabled: true
>           update_rate: 1
>         gsa:
>           enabled: false
>           update_rate: 1
>         gst:
>           enabled: false
>           update_rate: 1
>         gsv:
>           enabled: false
>           update_rate: 1
>         main_talker_id: gn
>         rmc:
>           enabled: false
>           update_rate: 1
>         vtg:
>           enabled: false
>           update_rate: 1
>         zda:
>           enabled: false
>           update_rate: 1
>     settings:
>       serial:
>         baud_rate: 9600
>         device: ttyGS0 (USB-to-PC)
>         format: NMEA
> positioning_settings:
>   elevation_mask_angle: 15
>   glonass_ar_mode: true
>   gnss_settings:
>     positioning_systems:
>       beidou: false
>       galileo: true
>       glonass: true
>       gps: true
>       qzss: true
>       sbas: true
>     update_rate: 5
>   gps_ar_mode: fix-and-hold
>   max_horizontal_acceleration: 1
>   max_vertical_acceleration: 1
>   positioning_mode: kinematic
>   snr_mask: 35
> [/details]
> ```

###  Creating a persistent label for the RTK GNSS USB device

To use the serial device as non-root user, udev rules must be installed.

> [!CAUTION] 
> This serial interface label e.g. `ttyACM0` is liable to change depending on various reasons. 
> The following commands will be used create a persistent label for serial port device and enable use by a non-root user.
>
>  - http://reactivated.net/writing_udev_rules.html?#example-printer
>  - http://weng-blog.com/2017/05/udev-rule/
> 

0. Open a terminal and enter the following follow commands.

```shell
lsusb
```

```stdout
Bus 003 Device 063: ID 3032:0014 Emlid Reach
                       ^^^^ ^^^^
                    vendor  product
```

1. On the Linux terminal you should see this something like the following:

```stdout
[604400.525618] cdc_acm 1-1.3:1.0: ttyACM0: USB ACM device
                                   ^^^^^^^ make note of this label
```

2. Run the udev management tool `udevadmn` to capture additional info.

```shell
udevadm info -q all -n /dev/ttyACM0
```

```stdout
P: /devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.2/tty/ttyACM0
N: ttyACM0
....
E: DEVPATH=/devices/pci0000:00/0000:00:14.0/usb3/3-1/3-1:1.2/tty/ttyACM0
E: DEVNAME=/dev/ttyACM0
E: MAJOR=166
E: MINOR=0
E: SUBSYSTEM=tty       <----------- make note of this label
E: USEC_INITIALIZED=166592821213
E: ID_BUS=usb
E: ID_VENDOR_ID=3032   <------------
E: ID_MODEL_ID=0014    <------------
E: ID_PCI_CLASS_FROM_DATABASE=Serial bus controller
....
```

4. Next we need to provide the system instructions on how to treat our GNSS USB device. Here our goal is to create a persistent name for a device node by creating a symbolic link to the default device node.

```shell
cd /etc/udev/rules.d/;
sudo vim 51-emlid.rules
```

```shell
# Copy this udev with "sudo cp 51-emlid.rules /etc/udev/rules.d/"
# When done, do "sudo udevadm control --reload && sudo udevadm trigger"
# Edit it to suit your type of Linux. It's currently set up for modern Ubuntu
ATTRS{idProduct}=="0014", ATTRS{idVendor}=="3032", MODE:="666", GROUP="plugdev", SUBSYSTEM=="tty", SYMLINK+="emlid_rtk"
```

> [!INFO] Explanation
> 1. **`ATTRS{idProduct}=="0014", ATTRS{idVendor}=="3032":`**
>	- This helps identify a particular type or brand of device.
>2. ***`MODE:="666"`***
>	- "666" corresponds to read (4), write (2), and execute (1) permissions for the owner, group, and others, respectively. In this context, "666" means read and write permissions for everyone.
>3. **`GROUP="plugdev":`**
>    - This specifies the group ownership of the device node. The device will be assigned to the "plugdev" group. The "plugedev" group is primarilty associated with serial commuication devices such as UART ports.
>4. **`SUBSYSTEM=="tty":`**
>    - This condition narrows down the rule to devices in the "tty" (terminal) subsystem. It's often used for serial port devices.
>5. **`SYMLINK+="emlid_rtk":`**
>    - This creates a symbolic link named "emlid_rtk" pointing to the device node. Symbolic links provide an additional name for the device, making it more user-friendly or predictable.

5. Next we must reload udev rules and then trigger udev to reevaluate devices based on those updated rules. This enables our recent changes to take effect without requiring a system restart.

```shell
sudo udevadm control --reload && sudo udevadm trigger
```

Re-plug in USB GNSS receiver and verify [NMEA strings](http://lefebure.com/articles/nmea-gga/) streamed to the terminal

```shell
ls -l /dev/emlid*
sudo screen /dev/emlid_rtk
```

6.  Run the `str2str` rtklib CLI application

- To receive **Single site** corrections via NTRIP and relay to USB GNSS receiver via serial

```shell
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_SINGLE/$NT_ENDPOINT_SINGLE#rtcm3 -out serial://emlid_rtk:115200#52001
```

- Alt. to Receive **Automatic cell** corrections via NTRIP and relay to USB GNSS receiver via serial 
> [!Note]
> Not sure if `hostname` is require for `serial://emlid_rtk:115200#NT_HOSTNAME`. For VRS or Automatic Cell sites, just be sure to include `-b 1` with your output stream

 
```shell
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_AUTO/$NT_ENDPOINT_AUTO#rtcm3 -out serial://emlid_rtk:115200#NT_HOSTNAME -b 1
```

> [!Note]
> STR2STR also implements "Output Received Stream to TCP Port" option like STRSVR 2.4.3 b34
> https://github.com/tomojitakasu/RTKLIB/issues/573#issuecomment-760017844

- Alt. to Receive **Automatic cell** corrections via NTRIP and stream RTCM sentences via serial port. Stream reciever NMEA sentences via serial and TCP port 52001.
```shell
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_AUTO/$NT_ENDPOINT_AUTO#rtcm3 -out serial://emlid_rtk:115200#52001
```

7. Listen

```shell
nc localhost 52001
```

### Explanation of `str2str` parameters

[Running str2str](https://github.com/septentrio-gnss/Septentrio_AgnosticCorrectionsProgram/blob/main/str2str/README.md#running-str2str)

#todo
- -in ntrip://<mark style="background: #FFB8EBA6;">username</mark>:<mark style="background: #FFB86CA6;">password</mark>@<mark style="background: #BBFABBA6;">host</mark>:<mark style="background: #ADCCFFA6;">port</mark>/<mark style="background: #CACFD9A6;">mount</mark>#<mark style="background: #FF5582A6;">format</mark>
	- username: 
	- password:
	- host: Required
	- port:
	- mount:
	- format:
- -out serial://<mark style="background: #FFF3A3A6;">device_port</mark>:<mark style="background: #ABF7F7A6;">bitrate</mark>:<mark style="background: #D2B3FFA6;">parity</mark>:<mark style="background: #FFB8EBA6;">stopbit</mark>:<mark style="background: #FFB86CA6;">fctr</mark>#<mark style="background: #BBFABBA6;">output_tcp_port -b 1</mark>
	- device_port: 
	- bitrate: 
	- parity: 
	- stopbit: 
	- fctr: 
	- output_tcp_port -b 1: The `-b 1` indicates that we want to use the **1st** of many output streams (if multiple outputs streams are used) as the source of NMEA sentences to stream to a TCP server 

## Extras

- Set trace level with `-t 3` and you can read logs with `cat str2str.trace`

```sh
str2str -in ntrip://$NT_USER:$NT_PASSWORD@$NT_HOSTNAME:$NT_PORT_SINGLE/$NT_ENDPOINT_SINGLE#rtcm3 -t 3
```

```shell
cat str2str.trace
```

## ROS2 Demo

### Initial Testing

- Configure the Emlid Reach device "Correction input" settings to connect to an NTRIP server via the webapp. 
- Install the nmea_serial_driver ROS2 package
```shell
ros2 run nmea_navsat_driver nmea_serial_driver --ros-args --params-file ./config/nmea_serial_driver.yaml
```
- Echo the ROS2 topic `/fix` which contains the `sensor_msgs/msg/NavSatFix`  messages
```shell
ros2 topic info /fix
```
- Observe the `NavSatFix` messages with covariance data. 
```shell
header:
  stamp:
    sec: 1705213614
    nanosec: 891449711
  frame_id: gps
status:
  status: 2
  service: 1
latitude: omitted
longitude: omitted
altitude: omitted
position_covariance:
- 0.000144
- 0.0
- 0.0
- 0.0
- 0.000144
- 0.0
- 0.0
- 0.0
- 0.0144
position_covariance_type: 1
```

- **Takeaway**: This initial test verifies the principles, but one draw back is that the RTCM messages are streamed to the Reach module via it's onboard WiFi connection from the local network. Ideally I would prefer the RTCM messages were streamed to the Reach Module via the Raspberry Pis' in a "PC-to-USB" fashion. The main hurdle with this is we will need to use the UART ports on the the Reach module and Raspberry Pi to receive NMEA sentences. Using a single serial port for transmitting correction data to GNSS receiver and reading the NMEA sentences  (using two separate processes) **doesn't seem possible or is error prone** at this time so two serial port may be necessary. 

My current understanding of possible configurations at this moment are:
1. Utilize Reach Modules' on-board WiFi and NTRIP client software to receive RTCM and stream the receiver "Position Output" to the Raspberry Pi in a "Serial-To-PC" fashion and utilize `nmea_navsat_diver` (Initial Testing Config)
2. Utilize `str2str` and `nmea_navsat_driver` and **UART** as a second channel for receiving NMEA sentences while **PC-to-Serial** is used for streaming RTCM Messages to the Reach Module.
3. Utilize `str2str` and `nmea_tcp_driver` (Only after [nmea_tcp_driver](https://github.com/CearLab/nmea_tcp_driver) is rewritten for ROS2 support 💀) Currently started on a [emlid_reach_ros2](https://github.com/digitalhabitat/emlid_reach_ros2) but I'm not sure how much work is required.
## Questions

### Q1. How do you find the NTRIP Mount point for Automatic Cells or Single Sites?

1. The service provider may have a number of resources such as a table specifying the connection details or an interactive map of Sites a part of the CORs Network.
2. With a given **IP address** and **Port** you can use `str2str -in ntrip://<ip>:<port>` to return a **Source Table** with the 2nd data field specifying the mount point. [For more info see](https://software.rtcm-ntrip.org/wiki/STR)
3. There are also several tools that enable you browse the available mount points on such as http://monitor.use-snip.com/  or [srctblbrows.exe](https://www.rtklib.com/prog/manual_2.4.2.pdf#page=85)

## Nomenclature

#todo


Source Table: Represents contents list of provided data by NTRIP servers

1. **RTK (Real-Time Kinematic):** A technique used to improve the precision of GNSS data.
    
2. **GNSS (Global Navigation Satellite System):** A generic term used for satellite navigation systems including GPS, GLONASS, Galileo, and BeiDou.
    
3. **PPP (Precise Point Positioning):**
    
4. **Base Station:** A stationary GNSS receiver used as a reference point for RTK corrections.
    
5. **Rover Station:** A mobile GNSS receiver that receives corrections from a base station.

6. **NMEA message/string**: #todo
    
6. **NTRIP (Networked Transport of RTCM via Internet Protocol):** A communication protocol to streaming RTCM correction data over the internet.
    
7. **RTCM (Radio Technical Commission for Maritime Services):**  An international standards body that defines standards such as, RTCM SC-104, which specifies a set of binary messages (aka RTCM messages) containing GNSS correction data.
    
8. **Observation Data:** Raw GNSS measurements collected by a receiver, including pseudoranges and carrier phase information.
    
9. **Solution:** The final output of the positioning process, providing accurate coordinates for a specific location.
    
10. **Float Solution:** A position solution with a lower level of accuracy, often used in standard GPS positioning.
    
11. **Fix Solution:** A high-precision position solution achieved through RTK techniques, providing centimeter-level accuracy.
    
12. **DGNSS (Differential GNSS):** A technique that improves GNSS accuracy by using correction data from a reference station.
    
13. **Cycle Slip:** 
    
14. **ION (Institute of Navigation):** A professional organization that focuses on the science and art of navigation.
    
15. **Tropospheric Delay:** The slowing of GNSS signals as they pass through the Earth's atmosphere, affecting accuracy.
    
16. **Receiver Firmware:** . Embedded software of GNSS receievers.
    
18. **RINEX (Receiver Independent Exchange Format):** A standard format for exchanging GNSS data between different software.
    
19. **Solution Status:** Information indicating the quality and reliability of the position solution, such as 'FIXED' or 'FLOAT.'
    
20. **Ambiguity Resolution:** The process of determining the integer values in carrier phase measurements to improve positioning accuracy in RTK.