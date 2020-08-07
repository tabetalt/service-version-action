import * as core from '@actions/core';
import { UpdateVersion } from './updateVersion';

// Inputs
const args = {
  service: core.getInput('service', { required: true }),
  servicesFilePath: core.getInput('new_version', { required: true }),
  newVersion: core.getInput('services_path') as string | './services.json',
};

new UpdateVersion(args).updateAndSave();
