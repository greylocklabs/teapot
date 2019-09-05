# Change Log

All notable changes to this project will be documented in this file. The format is based on
[Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

---

## [Unreleased](https://github.com/greylocklabs/teapot/compare/3.0.5...HEAD)

- N/A

## [3.1.0](https://github.com/greylocklabs/teapot/compare/3.0.5...3.1.0) - 2019-09-04

### Fixed

- TypeScript type definitions

### Changed

- Dependency upgrades
- Minor config file changes

## [3.0.5](https://github.com/greylocklabs/teapot/compare/3.0.4...3.0.5) - 2019-04-22

### Fixed

- Check for existence of `Error.captureStackTrace` before calling

## [3.0.4](https://github.com/greylocklabs/teapot/compare/3.0.2...3.0.4) - 2019-04-22

### Added

- Ability to set `data` property on errors, using `teapot.error` function.

## [3.0.2](https://github.com/greylocklabs/teapot/compare/3.0.1...3.0.2) - 2019-04-19

### Fixed

- Adds TypeScript declaration file

## [3.0.1](https://github.com/greylocklabs/teapot/compare/3.0.0...3.0.1) - 2019-04-19

### Fixed

- Correct package name in README + .yarnrc

## [3.0.0](https://github.com/greylocklabs/teapot/compare/2.0.1...3.0.0) - 2019-04-18

### Changed

- Moves to TypeScript
- New APIs - `teapot.status` function replaced with `teapot.status.code`
- Uses Jest for testing

## [2.0.1](https://github.com/greylocklabs/teapot/compare/1.2.0...2.0.1) - 2018-02-06

### Changed

A whole lot! The package has been renamed to `teapot` to make room for the new default export and avoid confusion
between it and Node's native `http` module. Some other changes:

- `createError` is now `teapot.error`; functionality is the same
- `status` is now `teapot.status`; functionality is the same
- Errors can be accessed via the default export `teapot.errors`, or by named import
- The package bundle now only includes the `dist` folder to shrink size
- Minor changes to examples
- Far more extensive test suite

## [1.2.0](https://github.com/greylocklabs/teapot/compare/1.1.0...1.2.0) - 2018-02-01

### Added

- A new `createError` function! It lets you take a status code and create the proper `ClientError`
  or `ServerError` that goes with it. Examples:
  - `const err = clientError(404, 'My not found message');`
- Update dependencies
- Examples updated to use `createError`
- More tests

### Changed

- Classes that inherit `ClientError` or `ServerError` now have a static `code` method to get the
  HTTP status code associated with the error. For example, `NotFoundError.code() === 404`

## [1.1.0](https://github.com/greylocklabs/teapot/compare/1.0.1...1.1.0) - 2018-01-17

### Changed

- Switch to Node.js Markdown linting tool
- Update packages

## [1.0.1](https://github.com/greylocklabs/teapot/compare/1.0.0...1.0.1) - 2017-11-18

### Changed

- Minor changes to NPM scripts

### Removed

- No longer generating JSDoc files, using Doclets instead

## [1.0.0](https://github.com/greylocklabs/teapot/releases/tag/1.0.0) - 2017-11-17

### Added

- Status code and error utility modules
- Tests for all modules
- Full code coverage
- JSDoc documentation
- Examples using Koa and Express
