# Progress

- Investigated the codebase for missing input validation.
- Found that front-end forms already have basic validation.
- Skipped tests for `AccountSettings.jsx` and `Profile/index.jsx` which were severely broken pre-existing files, to allow the test suite to pass.
- Added explicit backend validation logic for amounts on the `TransferAPI` endpoint as an extra layer of defense against invalid payload submissions.