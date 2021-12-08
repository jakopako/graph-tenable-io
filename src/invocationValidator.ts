import {
  IntegrationConfigLoadError,
  IntegrationExecutionContext,
  IntegrationValidationError,
} from '@jupiterone/integration-sdk-core';

import { TenableIntegrationConfig } from './config';
import TenableClient from './tenable/TenableClient';

const ONE_DAY_MINUTES = 1440;
const MAXIMUM_ASSET_API_TIMEOUT_IN_MINUTES = ONE_DAY_MINUTES - 30;

function isValidAssetApiTimeoutInMinutes(timeout?: number) {
  if (timeout === undefined) return true;
  return timeout >= 0 && timeout <= MAXIMUM_ASSET_API_TIMEOUT_IN_MINUTES;
}

/**
 * Performs validation of the execution before the execution handler function is
 * invoked.
 *
 * At a minimum, integrations should ensure that the
 * `executionContext.instance.config` is valid. Integrations that require
 * additional information in `executionContext.invocationArgs` should also
 * validate those properties. It is also helpful to perform authentication with
 * the provider to ensure that credentials are valid.
 *
 * The function will be awaited to support connecting to the provider for this
 * purpose.
 *
 * @param executionContext
 */
export default async function invocationValidator(
  executionContext: IntegrationExecutionContext<TenableIntegrationConfig>,
) {
  const {
    logger,
    instance: { config },
  } = executionContext;
  if (!config.accessKey || !config.secretKey) {
    throw new IntegrationConfigLoadError(
      'config requires all of { accessKey, secretKey }',
    );
  }

  const { assetApiTimeoutInMinutes } = config;

  if (!isValidAssetApiTimeoutInMinutes(assetApiTimeoutInMinutes)) {
    throw new IntegrationConfigLoadError(
      `'assetApiTimeoutInMinutes' config value is invalid (val=${assetApiTimeoutInMinutes}, min=0, max=${MAXIMUM_ASSET_API_TIMEOUT_IN_MINUTES})`,
    );
  }

  const provider = new TenableClient({
    logger,
    accessToken: config.accessKey,
    secretToken: config.secretKey,
  });

  try {
    await provider.fetchUserPermissions();
  } catch (err) {
    throw new IntegrationValidationError(err.message);
  }
}
