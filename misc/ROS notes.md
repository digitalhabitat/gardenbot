
- How to remove a ros2 package
	```shell
	sudo apt remove ros-distro_name-pakage_name && sudo apt autoremove
	```
- How to add a git submodule to `workspace/src` directory
	```bash 
	cd /workspace/src
	git clone /url/to/repo/with/submodules
	git submodule init
	git submodule update
	```
- [git one image](https://raw.githubusercontent.com/JannikArndt/git-in-one-image/master/git-in-one-image.svg)
- https://design.ros2.org/articles/ros_command_line_arguments.html
- Local Network speed testing (https://en.wikipedia.org/wiki/Iperf)



```
# Event handler to shut down the launch system if the check_serial_device returns -1

# or start auto_cell_str2str if check_serial_device returns 1

cond_auto_cell_str2str = RegisterEventHandler(

OnProcessExit(

target_action=check_serial_device,

on_exit=lambda event, context: [LogInfo(msg="event.returncode == -1 ")] if event.returncode != 0

else [

TimerAction(

period=3.0, # 3 second delay

actions=[

LogInfo(msg="Starting auto_cell_str2str...")

#auto_cell_str2str

]

)

]

)

)
```