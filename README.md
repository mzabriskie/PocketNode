# PocketNode

Lightweight Node REPL for iOS and Android

![Screenshot](https://cloud.githubusercontent.com/assets/199035/10439739/49d80e60-70f9-11e5-94b1-16e06eeb3a8f.png)

## Developing

```bash
$ git clone git@github.com:mzabriskie/PocketNode.git
$ cd PocketNode
$ npm install
```

__To run the iOS app:__

- Open `ios/PocketNode.xcodeproj` in Xcode and hit ⌘-R to run.
- Open `index.ios.js` in your text editor and make some changes.
- Hit ⌘-R in the iOS simulator to reload the app.
- In Xcode go to Report navigator > PocketNode > Debug to see output from `console.log`.

__To run the Android app:__

- `$ android avd` then select the `reactnative` device.
- `$ react-native run-android`
- Open `index.android.js` in your text editor, and make some changes.
- Hit F2 in the Android simulator to reload the app.
- Run `adb logcat *:S ReactNative:V ReactNativeJS:V` to see output from `console.log`.

If you haven't setup Android development yet, see the [setup guide](https://facebook.github.io/react-native/docs/android-setup.html#content).

__Troubleshooting:__

- For iOS make sure you are running Xcode 6.3 or newer.
- If you get `"Cannot read property 'root' of null"` update watchman:
```bash
$ brew update
$ brew upgrade watchman
```
