# gardenbot


![[main_capture-removebg.png]]


## Introduction

There are two goals to this garden-bot project. Goal #1 is to develop and document my experience in building a semi-autonomous navigating four-wheeled robot. Robotics has a wide range of disciplines and risk involved. If this project is delayed or abandoned for any reason, I want to produce at least a documented learning experience. Goal #2 is the garden-bot should have the ability to self-navigate via GPS way points. Essentially you click on a point on a Google Maps like Interface and the robot should navigated itself to that location while avoiding obstacles.

## Goal #1

Building a robot is hard. Building a robot alone is ludicrous. This is because a robots are inherently complex. The most important task that ensures a robotic endeavor such as this one is successful is to manage that complexity. Since I'm practically building a robot from scratch, there is an unexpected amount of designing and fabrication involved that I can safely say I was not prepared for. When it came to mechanical design and development I learned quickly that pen and paper and ad-hoc solutions was not going to be enough. Overwhelmed with the growing awareness of complexity I reached for a knowledge base solution like this. Obsidian.md will be the foundation for managing most of the technical information and knowledge that require high visibility and access.

## Goal #2

Building a robot that can navigation semi-autonomously via GPS way points is my white whale. It's a pretty simple if not modest goal. This problem is mostly solved in the Agricultural Industry but I really would like to discover the first principles in practice. This goal is mostly about understanding the existing open-source software well enough to piece them together to solve a problem. Robot Operating System provides that software framework and community that makes this task realistic considering all the challenges that lay ahead.

## Current Status

- Basic Keyboard teleportation via ssh over WiFi
	1. Start docker [bot_ros2_workspace](https://github.com/digitalhabitat/bot_ros2_workspace)
	2. Open terminal run `ros2 launch ./launch/teleop-test.xml`
	3. Open a second terminal run `ros2 run ros2 run teleop_twist_keyboard teleop_twist_keyboard`
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

- Hardware
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
- Documentation
	- [ ] Utilize [obsidian-html](https://github.com/obsidian-html/obsidian-html) 
	- [ ] Parts List #WIP 
	- [ ] Wire Diagram #WIP 
	- [ ] Steering System #todo
	- [ ] 3D Models and Dimensions #WIP
- Software
	- [ ] CI/CD workflow #WIP
	- [ ] GPS ROS node
	- [ ] IMU ROS node
	- [ ] Blink(1) integration
	- [ ] Localization package
	- [ ] Way point piloting package


##  Content

>[!Work in progress]
> Various pages are still in development.

[[computer-system]] #todo
- [[computer-nano|nano]]
- [[computer-rpi|rpi4]]
[[drive-system]]
- [[drive-motor]] `MY1016`
- [[drive-motor-encoder-assembly]] `AMT103-V`
- [[drive-motor-controller]] `roboclaw 2x30A`
[[steering-system]] #todo
[[power-system]]
[[wire-system]]
[[localization-system]] #todo

---

## Similar Projects

https://github.com/ClemensElflein/OpenMower