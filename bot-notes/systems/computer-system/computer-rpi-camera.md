---
aliases: [ rpi-camera, OV5647]
---
# Raspberry Pi 4 Camera

Module: V1 camera (OV5647)
Software Stack: libcamera ()

- 15-pin MIPI Camera Serial Interface (CSI) connector
- https://www.amazon.com/gp/product/B07RWCGX5K
- https://www.raspberrypi.com/documentation/accessories/camera.html

[Gstream Tools](https://gstreamer.freedesktop.org/documentation/tutorials/basic/gstreamer-tools.html?gi-language=c)

[Using Gstreamer](https://www.raspberrypi.com/documentation/accessories/camera.html#using-gstreamer)

[test streams](https://github.com/matthew1000/gstreamer-cheat-sheet/blob/master/test_streams.md)

[gstreamer pipeline examples](https://gist.github.com/hum4n0id/cda96fb07a34300cdb2c0e314c14df0a)

## Installing GStreamer

1. Open a terminal on the rpi4 and run the following command

```sh
sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer-plugins-bad1.0-dev gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio
```

---

## Send a test video with h264 rtp stream

```shell
gst-launch-1.0 -v videotestsrc ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! rtph264pay ! udpsink port=5000 host=192.168.1.24
```

## Receive h264 rtp stream

```shell
gst-launch-1.0 -v udpsrc port=5000 ! "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtph264depay ! h264parse ! decodebin ! videoconvert ! autovideosink sync=false
```

```shell
gst-launch-1.0 -v videotestsrc ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! rtph264pay ! udpsink port=5000 host=192.168.1.24
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

## libcamerasrc gstreamer plugin
Using  libcamerasrc gstreamer element (without libcamera-vid)

Test Video Steam

```shell
gst-launch-1.0 videotestsrc ! v4l2h264enc ! 'video/x-h264,level=(string)3' ! fakesink
```

libcamerasrc Stream on Raspberry Pi

```shell
gst-launch-1.0 -vvvv libcamerasrc ! video/x-raw,width=1280,height=720,format=NV12,colorimetry=bt601,framerate=30/1,interlace-mode=progressive ! v4l2h264enc extra-controls="controls,repeat_sequence_header=1" ! 'video/x-h264,level=(string)4' ! h264parse ! rtph264pay ! udpsink host=192.168.1.24 port=5000
```

Client Machine (192.168.1.24)

```shell
gst-launch-1.0 udpsrc address=192.168.1.24 port=5000 caps=application/x-rtp ! rtph264depay ! h264parse ! avdec_h264 ! autovideosink
```

## Other experiments

https://developer.ridgerun.com/wiki/index.php/Introduction_to_network_streaming_using_GStreamer

stream test video from gstreamer to VLC
```shell
gst-launch-1.0 -v videotestsrc ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! h264parse ! mpegtsmux ! rtpmp2tpay  ! udpsink port=5000 host=192.168.0.51
```
stream rpi camera from gstream to vlc (high latency)
```shell
gst-launch-1.0 -vvvv libcamerasrc ! queue ! video/x-raw,width=1280,height=720,format=NV12,colorimetry=bt601,framerate=30/1,interlace-mode=progressive ! v4l2h264enc extra-controls="controls,repeat_sequence_header=1" ! 'video/x-h264,level=(string)4' ! h264parse ! mpegtsmux ! rtpmp2tpay ! udpsink host=192.168.0.51 port=5000

```

```shell
vlc rtp://@:port
```