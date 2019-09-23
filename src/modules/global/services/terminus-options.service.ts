import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  MongooseHealthIndicator
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

import envConfig from '../../../config/env.config';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dnsHealthIndicator: DNSHealthIndicator,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const pingHealthEndpoint: TerminusEndpoint = {
      url: '/health/ping',
      healthIndicators: [
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-jenkins', 
          'https://www.waniangt.com:9000/login', 
          { timeout: 5000 }
        ),
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-gitlab', 
          'https://www.waniangt.com:9001', 
          { timeout: 5000 }
        ),

        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-rd-customer', 
          'https://www.waniangt.com:8000', 
          { timeout: 5000 }
        ),
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-rd-customer-test', 
          'https://www.waniangt.com:8999', 
          { timeout: 5000 }
        ),
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-rd-manager', 
          'https://www.waniangt.com:8080', 
          { timeout: 5000 }
        ),
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-rd-manager-test', 
          'https://www.waniangt.com:8998', 
          { timeout: 5000 }
        ),

        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-fe-manager', 
          'https://www.waniangt.com:3000', 
          { timeout: 5000 }
        ),
        () => this.dnsHealthIndicator.pingCheck(
          'waniangtuan-fe-manager-test', 
          'https://www.waniangt.com:3999', 
          { timeout: 5000 }
        )
      ]
    };

    const dbHealthEndpoint: TerminusEndpoint = {
      url: '/health/db',
      healthIndicators: [
        () => this.mongooseHealthIndicator.pingCheck(`mongodb://${envConfig.mongodb.info.username}:${envConfig.mongodb.info.password}@${envConfig.mongodb.info.uri}/${envConfig.mongodb.info.database}`)
      ]
    };

    return {
      endpoints: [ pingHealthEndpoint, dbHealthEndpoint ]
    };
  }
}