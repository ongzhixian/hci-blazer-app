# Ionic CLI

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