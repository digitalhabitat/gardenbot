
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