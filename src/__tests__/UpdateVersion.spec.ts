import { UpdateVersion } from '../updateVersion';

jest.mock('fs');

const fs = require('fs');

describe('UpdateVersion', () => {
  const updateVersion = new UpdateVersion({
    service: 'tenant',
    servicesFilePath: './example-services.json',
    newVersion: '1.0.0',
  });

  it('should construct', () => {
    expect(updateVersion).toBeInstanceOf(UpdateVersion);
  });

  it('should parse services file', () => {
    const readFile = jest.spyOn(fs, 'readFileSync');
    const f = updateVersion.parseFile();
    expect(f[0].name).toBe('tenant');
    expect(f[0].type).toBe('grpc');
    expect(f[0].version).toBe('latest');
    expect(readFile).toHaveBeenCalled();
  });

  it('should set version', () => {
    const f = updateVersion.parseFile();
    const s = updateVersion.updateVersion(f);
    expect(s[0].version).toBe('1.0.0');
  });

  it('should save the new services file', () => {
    const writeFile = jest.spyOn(fs, 'writeFileSync');
    updateVersion.updateAndSave();
    expect(writeFile).toHaveBeenCalled();
  });
});
