# Adding wireless printer with Ubuntu

1. Get IP address of Wireless Brother Printer.
	1. You can find this with the Brother App or Network scanner app, router app.
	2. `nmap -p 9100,631,515,443 192.168.0.0/24`
```
Nmap scan report for 192.168.0.12
Host is up (0.031s latency).

PORT     STATE  SERVICE
443/tcp  closed https
515/tcp  open   printer
631/tcp  open   ipp
9100/tcp open   jetdirect
```
2. Open "Settings"->"Printers"
3. Select "Additional Printer Settings..."
4. Select "Add"
5. Select "Network Printer"->"Find Network Printer"
6. Enter the IP address from step 1
7. Select "Forward" with pre-filled fields
8. Confirm additional names and identities
9. To make sure this is a long term solution. Go to your router settings to use Reserved IP (static local IP) with your printer so DHCP doesn't change its IP address.