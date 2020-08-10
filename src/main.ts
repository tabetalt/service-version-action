import * as core from '@actions/core';
import { UpdateVersion } from './updateVersion';

// Inputs
const args = {
  service: core.getInput('service', { required: true }),
  servicesFilePath: core.getInput('services_path') || './services.json',
  newVersion: core.getInput('new_version', { required: true }),
};

new UpdateVersion(args).updateAndSave();
