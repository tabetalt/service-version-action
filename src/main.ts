import * as core from '@actions/core';
import { UpdateVersion } from './updateVersion';

// Inputs
const args = {
  service: core.getInput('service', { required: true }),
  servicesFilePath: core.getInput('services_path', { required: true }),
  newVersion: core.getInput('new_version') as string | './services.json',
};

new UpdateVersion(args).updateAndSave();
