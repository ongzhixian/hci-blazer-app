# Android Tools

https://stackoverflow.com/questions/2604727/how-can-i-connect-to-android-with-adb-over-tcp
https://developer.android.com/tools/adb#wireless

## adb


```
adb tcpip 5555                    # Select port 5555 as the port that devices will connect to on your PC
adb connect 192.168.0.101:5555    # Connect to device; IP address and port from device's wireless debugging page on Android 
adb connect 192.168.79.5:39313

funcadb disconnect 192.168.0.101:5555

adb shell ip -f inet addr show wlan0
```

Tell adb daemon to listen over USB:
```
adb usb
```


## logcat filter

adb -s 192.168.79.14:44077 logcat Capacitor/Console:I *:S

adb logcat

adb -s 192.168.79.14:44077 logcat Capacitor/Console:I *:S

`<TAG(eg. Capacitor/Console)>:<Priority-letter>`
Priority letter could be:
V: Verbose (lowest priority)
D: Debug
I: Info
W: Warning
E: Error
F: Fatal
S: Silent (highest priority, where nothing is ever printed)

`*:S` means silent all other message types... otherwise logcat is too noisy

This does not work :-(
adb -d logcat com.readyperfectly.hciblazer:I *:S

Use this!
adb -d logcat Capacitor/Console:I *:S

# Reference

https://stackoverflow.com/questions/73737019/problem-with-android-wireless-debugging-unexpected-error-during-wi-fi-pairing
