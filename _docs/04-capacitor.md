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
npm install @capacitor-mlkit/barcode-scanning

## Open IDEs

ionic cap open ios
ionic cap open android
