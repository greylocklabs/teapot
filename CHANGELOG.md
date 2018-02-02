# Change Log

All notable changes to this project will be documented in this file. The format is based on
[Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

---

## [Unreleased](https://github.com/greylocklabs/http/compare/1.2.0...HEAD)

- N/A

## [1.2.0](https://github.com/greylocklabs/http/compare/1.1.0...1.2.0) - 2018-02-01

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

## [1.1.0](https://github.com/greylocklabs/http/compare/1.0.1...1.1.0) - 2018-01-17

### Changed

- Switch to Node.js Markdown linting tool
- Update packages

## [1.0.1](https://github.com/greylocklabs/http/compare/1.0.0...1.0.1) - 2017-11-18

### Changed

- Minor changes to NPM scripts

### Removed

- No longer generating JSDoc files, using Doclets instead

## [1.0.0](https://github.com/greylocklabs/http/releases/tag/1.0.0) - 2017-11-17

### Added

- Status code and error utility modules
- Tests for all modules
- Full code coverage
- JSDoc documentation
- Examples using Koa and Express
