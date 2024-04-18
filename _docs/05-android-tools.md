# Android Tools

https://stackoverflow.com/questions/2604727/how-can-i-connect-to-android-with-adb-over-tcp
https://developer.android.com/tools/adb#wireless

## adb


```
adb tcpip 5555
adb connect 192.168.0.101:5555

funcadb disconnect 192.168.0.101:5555

adb shell ip -f inet addr show wlan0
```

Tell adb daemon to listen over USB:
```
adb usb
```


# Reference

https://stackoverflow.com/questions/73737019/problem-with-android-wireless-debugging-unexpected-error-during-wi-fi-pairing