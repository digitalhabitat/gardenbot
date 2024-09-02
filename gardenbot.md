# gardenbot

> [!example]- obsidian.md notes
> https://github.com/digitalhabitat/gardenbot

> [!note]- [[Recently Edited]]

![[main_capture-removebg.png|400]]

## Introduction

The Gardenbot idea was imagined during my end of a group senior design project for the [2019 AgBot Challenge](https://github.com/digitalhabitat/agbot_0). I decided to begin the project because of my interest in robotics and systems engineering. 

There are two goals to the garden-bot project:

## Goal 1

Goal #1 is to document my experience in building a semi-autonomous navigating four-wheeled robot. Robotics has a wide range of disciplines and risks involved. If this project is ever delayed or abandoned, there will at least exist detailed documentation of the process—lessons and insights involved.

Robots are inherently complex, which makes building a robot especially challenging. In order for a robotic endeavor such as this to reach success, managing that complexity is crucial. Since I'm basically building a robot from scratch—for the first time ever on my own—I admittingly was not prepared for all the design and fabrication work involved. Acutely aware of the project’s growing complexity, I realized that pen-and-paper and ad-hoc solutions were inefficient in managing the mechanical design and development process.

So I reached for a personal knowledge base—this website—to help me document, organize, and share my research and findings. [Obsidian.md](https://en.wikipedia.org/wiki/Obsidian_(software)) will be the foundation for managing most of the technical information and knowledge that require high visibility and access.

## Goal 2

Goal #2 is to develop the garden-bot with the ability to self-navigate via GPS way points. The person navigating the garden-bot would be able to click a point on a Google Maps-like interface and the robot would navigate itself to that location while avoiding obstacles.

Building a robot that can navigate semi-autonomously via GPS way points is my white whale. It's a pretty simple, if not modest, goal. But ultimately has potential for productivity gains in the Agricultural Industry and the larger society. I would be proud in having made contributions in establishing the first principles in practice. 

Achieving this goal requires a deep understanding of existing open-source software and weaving that knowledge together to make the garden-bot work. [Robot Operating System](https://en.wikipedia.org/wiki/Robot_Operating_System) provides the software framework and community to make this task achievable—considering all challenges that lay ahead.

## Current Status

- Basic Keyboard teleportation via ssh over WiFi
	1. Start docker [bot_ros2_workspace](https://github.com/digitalhabitat/bot_ros2_workspace)
	2. Open terminal run `ros2 launch ./launch/teleop-test.xml`
	3. Open a second terminal run `ros2 run teleop_twist_keyboard teleop_twist_keyboard`
	4. See [[drive-roboclaw-setup]] additional info

<iframe width="560" height="315" src="https://www.youtube.com/embed/C3Nxp40HBfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Demonstration Road Map

- [x] Keyboard Teleoperation
- [ ] Bluetooth Controller Teleoperation
- [ ] Remote Teleoperation
- [ ] Realtime Camera Streaming
- [ ] Localization
- [ ] Mapping/Obstacle Detection
- [ ] Navigation

## Milestones

### Hardware

- [x] Primary Electronics 
- [x] Differential Steering
- [x] Ackermann Steering
- [ ] Computer Enclosure
- [ ] Charging Relay
- [ ] SugarPi 3 Plus
- [ ] GPS mount
- [ ] IMU mount
- [ ] Computer mount
- [ ] Camera mount
- [ ] 2D LIDAR
- [ ] Vehicle Enclosure

### Documentation

- [ ] Utilize [obsidian-html](https://github.comobsidian-html/obsidian-html) 
- [ ] Parts List #WIP 
- [ ] Wire Diagram #WIP 
- [ ] Steering System #todo
- [ ] 3D Models and Dimensions #WIP

### Software

- [ ] CI/CD workflow #WIP
- [ ] GPS ROS node
- [ ] IMU ROS node
- [ ] Blink(1) integration
- [ ] Localization package
- [ ] Way point piloting package

##  Content

>[!attention] Various pages are still in development.

[[computer-system]] #todo
- [[computer-nano|nano]]
- [[computer-rpi|rpi4]]

[[drive-system]]
- [[drive-motor]] `MY1016`
- [[drive-motor-encoder-assembly]] `AMT103-V`
- [[drive-motor-controller]] `roboclaw 2x30A`

[[steering-system]] #WIP 


- [[steering-motor-controller]]
[[power-system]]

[[wire-system]]	

[[localization-system]] #todo

[[docs]]

---

## Similar Projects

https://github.com/ClemensElflein/OpenMower