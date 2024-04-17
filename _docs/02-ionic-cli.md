# Ionic CLI

## Project setup

At C:\src\github.com\ongzhixian
run `ionic start`

npm install @capacitor/camera @capacitor/preferences @capacitor/filesystem
ionic serve --ssl --prod
ionic build
ionic cap add ios
ionic cap add android
ionic cap copy
ionic cap sync
ionic cap open android

## tldr;

ionic generate page pages/login
ionic generate service services/authentication

ionic generate guard guards/auth --implements CanLoad
ionic generate guard guards/intro --implements CanLoad
ionic generate guard guards/autoLogin --implements CanLoad
ionic generate interceptor interceptors/credentials

## 

ionic generate page pages/login

Automatically create framework features with Ionic Generate. 
This command uses the Angular CLI to generate features such as pages, components, directives, services, and more.

- For a full list of available types, use npx ng g --help
- For a list of options for a types, use npx ng g <type> --help


ionic generate page pages/login
ionic generate component components/login

```
PS C:\src\github.com\ongzhixian\hci-blazer-app> npx ng g --help
ng generate

Generates and/or modifies files based on a schematic.

Commands:
  ng g <schematic>              Run the provided schematic.                                                       [default]
  ng g app-shell                Generates an application shell for running a server-side version of an app.
  ng g application [name]       Generates a new basic application definition in the "projects" subfolder of the workspace. 
                                                                                                             [aliases: app]
  ng g class [name]             Creates a new, generic class definition in the given project.                 [aliases: cl]
  ng g component [name]         Create an Angular component.                                                   [aliases: c]
  ng g config [type]            Generates a configuration file in the given project.
  ng g directive [name]         Creates a new, generic directive definition in the given project.              [aliases: d]
  ng g enum [name]              Generates a new, generic enum definition in the given project.                 [aliases: e]
  ng g environments             Generates and configures environment files for a project.
  ng g guard [name]             Generates a new, generic route guard definition in the given project.          [aliases: g]
  ng g interceptor [name]       Creates a new, generic interceptor definition in the given project.
  ng g interface [name] [type]  Creates a new, generic interface definition in the given project.              [aliases: i]
  ng g library [name]           Creates a new, generic library project in the current workspace.             [aliases: lib]
  ng g module [name]            Creates a new, generic NgModule definition in the given project.               [aliases: m]
  ng g page [name]              Create an Ionic page.                                                         [aliases: pg]
  ng g pipe [name]              Creates a new, generic pipe definition in the given project.                   [aliases: p]
  ng g resolver [name]          Generates a new, generic resolver definition in the given project.             [aliases: r]
  ng g service [name]           Creates a new, generic service definition in the given project.                [aliases: s]
  ng g service-worker           Pass this schematic to the "run" command to create a service worker
  ng g web-worker [name]        Creates a new, generic web worker definition in the given project.
```


## Run

ionic serve

## Build (for deployment)

ionic build

Every time you perform a build (e.g. ionic build) that updates your web directory (default: www), you'll need to copy those changes into your native projects:


ionic cap copy

Note: After making updates to the native portion of the code (such as adding a new plugin), use the sync command:

ionic cap sync


## Generate service

ionic g service services/photo

## Support for mobile

ionic cap add ios
ionic cap add android


## Using older versions of Ionic 

npm info @ionic/cli

See `https://registry.npmjs.org/@ionic/cli/` (versions section in JSON) for list of available versions

To use older version of Ionic (latest is 7.2.0 on 2024-04-17), we need to:
1.  uninstall the default current version, 
2.  install the version that we want (6.20.9)

npm uninstall -g ionic
npm uninstall -g @ionic/cli
npm install -g @ionic/cli@6.20.9


For other stuff, just a sidenote:
npm install @ionic/angular@v6-lts
npm install @ionic/vue@v6-lts @ionic/vue-router@v6-lts

## References


