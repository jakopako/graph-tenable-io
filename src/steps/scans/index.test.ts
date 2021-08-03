import {
  createIntegrationEntity,
  MappedRelationship,
} from '@jupiterone/integration-sdk-core';
import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';
import { fetchAssets } from '.';
import { config } from '../../../test/config';
import {
  setupTenableRecording,
  Recording,
  getTenableMatchRequestsBy,
} from '../../../test/recording';
import { entities } from '../../constants';

let recording: Recording;

afterEach(async () => {
  if (recording) {
    await recording.stop();
  }
});

describe('fetch-assets', () => {
  test('success', async () => {
    recording = setupTenableRecording({
      directory: __dirname,
      name: 'fetch-assets',
      options: {
        matchRequestsBy: getTenableMatchRequestsBy(config),
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: config,
    });

    await fetchAssets(context);

    expect(context.jobState.collectedEntities.length).toBeGreaterThan(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: entities.ASSET._class,
    });

    expect(context.jobState.collectedRelationships.length).toBe(
      context.jobState.collectedEntities.length,
    );
  });

  describe('HostAgent -> Host mapped relationships', () => {
    test('should create mapped relationships to azure_vm', async () => {
      recording = setupTenableRecording({
        directory: __dirname,
        name: 'fetch-assets::mapped-relationships::azure_vm',
        options: {
          matchRequestsBy: getTenableMatchRequestsBy(config),
        },
      });

      function createAzureVmEntities(azureVmIds: string[]) {
        return azureVmIds.map((id) =>
          createIntegrationEntity({
            entityData: {
              source: {},
              assign: {
                // a few relevant properties from https://github.com/JupiterOne/graph-azure/blob/main/src/steps/resource-manager/compute/converters.ts#L33
                _class: ['Host'],
                _type: 'azure_vm',
                _key: id.toLocaleLowerCase(),
                id: id,
              },
            },
          }),
        );
      }

      const context = createMockStepExecutionContext({
        instanceConfig: config,
      });

      await fetchAssets(context);

      expect(context.jobState.collectedEntities.length).toBeGreaterThan(0);
      expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
        _class: entities.ASSET._class,
      });

      const azureMappedRelationships = (
        context.jobState.collectedRelationships as MappedRelationship[]
      ).filter((m) => m._mapping.targetEntity._type === 'azure_vm');

      expect(azureMappedRelationships.length).toBeGreaterThan(0);
      expect(azureMappedRelationships).toTargetEntities(
        createAzureVmEntities([
          // These IDs copied directly from graph-azure `yarn j1-integration start -s rm-compute-virtual-machines`
          '/subscriptions/d3803fd6-2ba4-4286-80aa-f3d613ad59a7/resourceGroups/J1DEV/providers/Microsoft.Compute/virtualMachines/tenable',
          '/subscriptions/d3803fd6-2ba4-4286-80aa-f3d613ad59a7/resourceGroups/J1DEV/providers/Microsoft.Compute/virtualMachines/tenable-nessus',
        ]),
      );
    });
  });
});
