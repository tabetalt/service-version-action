# Update Service Version Github Action

When changes are done to Tabetalt services, they're packaged using Docker
and uploaded to Google Cloud Registry. After which the version is set in
our infrastructure repositories.

This utility helps update the version by updating `ServiceConfig` in
infrastructure repositories. `ServiceConfig` is a very simple JSON-based
configuration format named `services.json` at the root of our
infrastructure repositories. We store information about the service type,
name of the service, what roles the Google service account needs and version.

This script simply lookup the service and updates the version, used together
with `action/checkout` and `git push` and [repository_dispatch][]

## Usage

### Example Workflow file

An example workflow:

```yaml
on:
  repository_dispatch:
    types: [update_version]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: tabetalt/service-version-action
      with:
        service: ${{ github.event.client_payload.service }}
        new_version: ${{ github.event.client_payload.service }}
    - name: Commit files
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git commit -m "chore: Update service version" -a
    - name: Push changes
      uses: ad-m/github-push-action@master
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

| name | value | default | description |
| ---- | ----- | ------- | ----------- |
| service | string | | Service name to update |
| new_version | string | | Version to set |
| services_path | boolean | `./services.json` | Location of the services file. |

### Example services file

```json
[
  {
    "type": "grpc",
    "name": "tenant",
    "roles": [
      "roles/firebase.developAdmin"
    ],
    "version": "1.2.33"
  }
]
```

[repository_dispatch]: https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event