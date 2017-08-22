# sky-feedback

Vue component for collecting feedback.

## Dependencies

- [Vue](https://vuejs.org/)
- [core-js/promise](https://github.com/zloirock/core-js#ecmascript-6-promise)
- [axios](https://github.com/mzabriskie/axios)
- [sky-reveal](https://github.com/skybrud/sky-reveal/)

## Usage

Set API endpoint in `sky-feedback.vue` to your desired endpoint.

API should be setup to receive [FormData](https://developer.mozilla.org/en/docs/Web/API/FormData).

Data sent by default:

- `name`
- `email`
- `comment`
- `type`

Data could easily be customized by adding to the `data` property of the Vue object in `sky-feedback.vue`.

### Credits

This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
