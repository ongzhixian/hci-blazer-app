# Page vs Component

## tldr;

Basically, the idea is that:
1.  Use page        to represent a screen.
2.  Use component   to represent a portion of UI on screen

## Remarks

Ionic can generate features among which page and components looks similar:

ionic generate page pages/login
ionic generate component components/login

Components would create 4 files:

login.component.html
login.component.spec.ts

Page would create 6 files:

login-routing.module.ts     (equivalent: No equivalent for component
login.module.ts             (equivalent: No equivalent for component

login.page.html             (equivalent: DIFFERENT!
login.page.scss             (equivalent: login.component.scss
login.page.spec.ts          (equivalent: DIFFERENT!
login.page.ts               (equivalent: login.component.ts
