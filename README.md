This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# Getting Started
## Configuring Android Emulator
* Open Android Studio and go to the **Settings -> Languages & Framework -> Android SDK -> SDK Platform [tab]**.
* Expand **Android 13.0 ("Tiramisu")** and select the following items
  * Android SDK Platform 33
  * Intel x86 Atom_64 System Image
  * Google APIs Intel x86 Atom System Image
* Check **Show package details**, go to the **SDK Tools** tab and expand **Android SDK Build-Tools** and make sure **33.0.0** is selected.
* Finally, click **Apply** to download and install the **Android SDK** and related build tools.
* Copy the **Android SDK Location** and set it to the environment variable with the name `ANDROID_HOME`. You will find the exact location in the same settings.

## Installing react-native-cli
* Uninstall the existing pacakge `npm uninstall -g react-native-cli @react-native-community/cli`.
* Install `react-native-cli` package using `npm install -g @react-native-community/cli` or `npm install -g react-native-cli`

## Running App on Android Emulator
* `npx react-native start` to start **Metro Development Server**.
* Type `i` to run on iOS, `a` to run on Android, `d` to open *Dev Menu* and `r` to reload app. 
