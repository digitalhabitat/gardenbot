non-subscription configs to fix `apt update` errors

1. Comment out line in `/etc/apt/sources.list.d/pve-enterprise.list`
	1. `deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise`
2. Add line in `/etc/apt/sources.list:
	1. `deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription`
3. Edit line in `/etc/apt/sources.list.d/ceph.list`
		1. `deb http://download.proxmox.com/debian/ceph-reef bookworm no-subscription`

