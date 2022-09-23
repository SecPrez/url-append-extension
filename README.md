# Microsoft Learn URL Appender Chrome extension

This is a Google Chrome extension that allows you to do a one-time configuration to save a desired tracking parameter you would like appended to Microsoft Learn URLs, then easily copy the URL for any Microsoft Learn page, with previous tracking parameters replaced with your desired one.

## Installation

This extension is not yet available in the Chrome extension store, so will have to be side-loaded in the meantime. [Here is a CNET article](https://www.cnet.com/tech/services-and-software/how-to-install-chrome-extensions-manually/) that explains how to.

## Project Flavors

There are three project folders in here, for the three major flavors of the project:
* **hardcoded-clean:** A working copy of the extension, using manifest v2, but the tracking URL is hardcoded in.
* **mvp-manifest-v2:** The project to get to an MVP solution, using manifest v2.
* **mvp-manifest-v3:** The project to get to an MVP solution, using manifest v3.

Google Chrome will no longer allow new extensions in the store that use manifest v2, so the idea is we have to get a working MVP version on either v2 or v3 - but if we get it on v2 - we'll then have to do a migration to v3 to get it in the Chrome store.

## Why not branches?

It's my repo, and this is how I've decided to operate. :)

In general, I will use branches - but for now this was the easiest solution for having branches AND easy access to different flavors of the project.
