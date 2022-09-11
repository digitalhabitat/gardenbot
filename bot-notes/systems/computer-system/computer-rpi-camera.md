---
aliases: [ rpi-cameara]
---
# Raspberry Pi Camera

Module: V1 camera (OV5647)

- 15-pin MIPI Camera Serial Interface (CSI) connector
- https://www.amazon.com/gp/product/B07RWCGX5K
- https://www.raspberrypi.com/documentation/accessories/camera.html

[Gstream Tools](https://gstreamer.freedesktop.org/documentation/tutorials/basic/gstreamer-tools.html?gi-language=c)

[Using Gstreamer](https://www.raspberrypi.com/documentation/accessories/camera.html#using-gstreamer)

[gstreamer pipeline examples](https://gist.github.com/hum4n0id/cda96fb07a34300cdb2c0e314c14df0a)

---

Send a test video with h264 rtp stream
- Run this on rpi (host is client ip address)
```
gst-launch-1.0 -v videotestsrc ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! rtph264pay ! udpsink port=5000 host=192.168.1.24
```

Receive h264 rtp stream
- Run this on client machine 
```
gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! decodebin ! videoconvert ! autovideosink sync=false
```

---

Raspberry Pi - Server Machine
```shell
libcamera-vid -t 0 -n --inline -o - | gst-launch-1.0 fdsrc fd=0 ! h264parse ! rtph264pay ! udpsink host=192.168.1.24 port=5000
```

Client Machine (192.168.1.24)
```shell
gst-launch-1.0 udpsrc address=192.168.1.24 port=5000 caps=application/x-rtp ! rtph264depay ! h264parse ! avdec_h264 ! autovideosink
```

Using  libcamerasrc gstreamer element (without libcamera-vid) (not working rip yet)
[source](https://github.com/raspberrypi/linux/issues/3974#issuecomment-791422239)
```shell
gst-launch-1.0 videotestsrc ! v4l2h264enc ! 'video/x-h264,level=(string)3' ! fakesink
```

```shell
gst-launch-1.0 libcamerasrc ! capsfilter caps=video/x-raw,width=1280,height=720,format=NV12 ! v4l2convert ! v4l2h264enc extra-controls="controls,repeat_sequence_header=1" ! h264parse ! rtph264pay ! udpsink host=localhost port=5000
```

```
```