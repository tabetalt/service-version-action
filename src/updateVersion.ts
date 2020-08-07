import * as fs from 'fs';

export interface ServiceUpdateVersionArgs {
  service: string;
  servicesFilePath: string;
  newVersion: string;
}

export interface ServiceConfig {
  type: string;
  name: string;
  roles: string[];
  version: string;
}

export class UpdateVersion {
  readonly service: string;
  readonly servicesFilePath: string;
  readonly newVersion: string;

  constructor(args: ServiceUpdateVersionArgs) {
    this.service = args.service;
    this.servicesFilePath = args.servicesFilePath;
    this.newVersion = args.newVersion;
  }

  updateAndSave() {
    const services = this.parseFile();
    this.save(this.updateVersion(services));
  }

  updateVersion(services: ServiceConfig[]): ServiceConfig[] {
    return services.map((service) => {
      if (service.name == this.service) {
        return {
          ...service,
          version: this.newVersion,
        };
      } else return service;
    });
  }

  save(services: ServiceConfig[]) {
    return fs.writeFileSync(this.servicesFilePath, JSON.stringify(services));
  }

  parseFile() {
    return JSON.parse(fs.readFileSync(this.servicesFilePath, 'utf-8')) as ServiceConfig[];
  }
}
