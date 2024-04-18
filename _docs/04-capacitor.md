# Add Scanner

## Install

npm i @capacitor/core
npm i -D @capacitor/cli

## Upgrading Capacitor

npm i -D @capacitor/cli@latest
npx cap migrate

## Add runtimes

npm i @capacitor/android @capacitor/ios

npx cap add android
npx cap add ios

## Building

ionic build
ionic cap copy
ionic cap sync

## Add plugins

npm install @capacitor/camera @capacitor/preferences @capacitor/filesystem
npm install @ionic/storage-angular
npm install @capacitor-mlkit/barcode-scanning

## Ionic Elements for Progressive Web Apps (PWAs)

npm install @ionic/pwa-elements

```ts ; Add to src/main.ts
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);
```

## Open IDEs

ionic cap open ios
ionic cap open android


## Configuring Android

https://capacitorjs.com/docs/config

https://capacitorjs.com/docs/android/configuration


## Reference

https://stackoverflow.com/questions/3920595/app-installations-overwriting-each-other
