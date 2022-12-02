# USB GNSS RTK Receiver Setup

>[!Work in Progess]
> - Initial testing notes #WIP 
> - [rtkexplorer – Exploring low cost solutions for high precision GPS/GNSS](http://rtkexplorer.com/)
> - https://en.wikipedia.org/wiki/NMEA_0183
> - https://incors.in.gov/rtk.aspx
> - [open mower ntrip](https://wiki.openmower.de/index.php?title=System_Image#STR2STR_(optional,_recommended;_only_needed_if_you're_using_NTRIP,_so_probably_most_of_you))
> - https://ntrip-list.com/
> - http://reach.local
> - https://github.com/rtklibexplorer/RTKLIB
> - https://packages.ubuntu.com/search?keywords=rtklib

#todo Add diagram for a brief explanation of how this project is using rtklib CLI AP **str2str** to receive RTK correction via NTRIP from a Continuously Operating Reference Stations (CORS) network

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

2. In the terminal, enter the following.
```shell
sudo screen /dev/ttyACM0 9600
```
 or
```shell
sudo cutecom
```

3. You should be able to observe [NMEA strings](http://lefebure.com/articles/nmea-gga/) streamed to the terminal

```
nc 192.168.0.20:9002
```

```shell
socat - TCP4:192.168.0.20:9002
```

```
$ sudo ./str2str -in ntrip://username:password@hostname:port/mountpoint -out serial://ttyACM0:115200#52001 -b 1
```


## Access RTK correction service and RTK correction data

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
> ```
> # InCORS RTK correction service credentials https://incors.in.gov/
> # Save the environment variables to to .bashrc i.e `sudo vim ~/.bashrc`
> #########################################################
> # DO NOT PUBLISH, THIS CONTAINS USERNAMES and PASSWORDS #
> #########################################################
> export GB_NTRIP_HOSTNAME="..."
> # Automatic cells
> export GB_NTRIP_PORT_AUTO="9000"
> export GB_NTRIP_ENDPOINT_AUTO="RTCM3_MAX"
> # single site
> export GB_NTRIP_PORT_SINGLE="..."
> export GB_NTRIP_ENDPOINT_SINGLE="..."
> # secret
> export GB_NTRIP_USER="..."
> export GB_NTRIP_PASSWORD="..."
> ```

2. After saving edits, close the terminal
2. Open new terminal, Verify environment variables
```shell
echo -e '\n'\
'ntrip hostname:        ' $GB_NTRIP_HOSTNAME'\n'\
'ntrip port_auto:       ' $GB_NTRIP_PORT_AUTO'\n'\
'ntrip endpoint_auto:   ' $GB_NTRIP_ENDPOINT_AUTO'\n'\
'ntrip port_sigle:      ' $GB_NTRIP_PORT_SINGLE'\n'\
'ntrip endpoint_single: ' $GB_NTRIP_ENDPOINT_SINGLE'\n'\
'ntrip user:            ' $GB_NTRIP_USER'\n'\
'nitrip password:       ' $GB_NTRIP_PASSWORD
```

---

### RTKLIB

0. In the terminal install the rtklib
```
sudo apt install rtklib
```

1. Attempt to receive RTK corrections.

 - Single Site
```shell
sudo ./str2str -in ntrip://$GB_NTRIP_USER:$GB_NTRIP_PASSWORD@$GB_NTRIP_HOSTNAME:$GB_NTRIP_PORT_SINGLE/$GB_NTRIP_ENDPOINT_SINGLE#rtcm3
```

- Automatic Site
```shell
sudo ./str2str -in ntrip://$GB_NTRIP_USER:$GB_NTRIP_PASSWORD@$GB_NTRIP_HOSTNAME:$GB_NTRIP_PORT_AUTO/$GB_NTRIP_ENDPOINT_AUTO#rtcm3
```

## Configure RTK device correction input and position out methods

This project is using the [Emlid Reach RTK Module](https://docs.emlid.com/reach/reference/specifications/reach-module-specs/) and following [documentation](https://docs.emlid.com/reach/). The Emlid is configured with the following settings

```
[details="Simple system report"]
app version: 28.4-r0
enabled: true
mode: client
correction_input:
  base_corrections:
    io_type: serial
    settings:
      serial:
        baud_rate: 115200
        device: ttyGS0 (USB-to-PC)
        send_position_to_base: true
position_output:
  output1:
    io_type: serial
    nmea_settings:
      serial:
        gga:
          enabled: true
          update_rate: 1
        gsa:
          enabled: false
          update_rate: 1
        gst:
          enabled: false
          update_rate: 1
        gsv:
          enabled: false
          update_rate: 1
        main_talker_id: gn
        rmc:
          enabled: false
          update_rate: 1
        vtg:
          enabled: false
          update_rate: 1
        zda:
          enabled: false
          update_rate: 1
    settings:
      serial:
        baud_rate: 9600
        device: ttyGS0 (USB-to-PC)
        format: NMEA
positioning_settings:
  elevation_mask_angle: 15
  glonass_ar_mode: true
  gnss_settings:
    positioning_systems:
      beidou: false
      galileo: true
      glonass: true
      gps: true
      qzss: true
      sbas: true
    update_rate: 5
  gps_ar_mode: fix-and-hold
  max_horizontal_acceleration: 1
  max_vertical_acceleration: 1
  positioning_mode: kinematic
  snr_mask: 35
[/details]
```

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

2. #todo
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

4. #todo
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

5. #todo
```shell
sudo udevadm control --reload && sudo udevadm trigger
```

Re-plug in USB GNSS receiver and verify [NMEA strings](http://lefebure.com/articles/nmea-gga/) streamed to the terminal

```shell
sudo screen /dev/emlid_rtk
```

6.  Run the str2str rtklib CLI application

- To receive **Single site** corrections via NTRIP and relay to USB GNSS receiver via serial
```shell
sudo ./str2str -in ntrip://$GB_NTRIP_USER:$GB_NTRIP_PASSWORD@$GB_NTRIP_HOSTNAME:$GB_NTRIP_PORT_SINGLE/$GB_NTRIP_ENDPOINT_SINGLE#rtcm3 -out serial://emlid_rtk:115200#52001 -b 1
```

- Alt. to Receive **Automatic cell** corrections via NTRIP and relay to USB GNSS receiver via serial
```shell
sudo ./str2str -in ntrip://$GB_NTRIP_USER:$GB_NTRIP_PASSWORD@$GB_NTRIP_HOSTNAME:$GB_NTRIP_PORT_AUTO/$GB_NTRIP_ENDPOINT_AUTO#rtcm3 -out serial://ttyACM0:115200#52001 -b 1
```

7. Listen
```shell
nc localhost 52001
```
