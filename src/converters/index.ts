import {
  SCAN_FINDING_RELATIONSHIP_CLASS,
  SCAN_FINDING_RELATIONSHIP_TYPE,
  ScanFindingRelationship,
  VULNERABILITY_FINDING_RELATIONSHIP_CLASS,
  VULNERABILITY_FINDING_RELATIONSHIP_TYPE,
  VulnerabilityFindingRelationship,
} from "../jupiterone/entities";
import { Dictionary, ScanVulnerability } from "../tenable/types";
import { vulnerabilityFindingEntityKey } from "./FindingEntityConverter";
import { scanEntityKey } from "./ScanEntityConverter";
import { tenableVulnerablilityEntityKey } from "./ScanVulnerabilityEntityConverter";

export {
  createAccountContainerRelationships,
} from "../converters/AccountContainerRelationshipConverter";
export { createAccountEntity } from "../converters/AccountEntityConverter";
export {
  createAccountUserRelationships,
} from "../converters/AccountUserRelationshipConverter";
export { createAssetEntities } from "../converters/AssetEntityConverter";
export {
  createAssetScanVulnerabilityRelationships,
} from "../converters/AssetScanVulnerabilityRelationshipConverter";
export {
  createContainerEntities,
} from "../converters/ContainerEntityConverter";
export {
  createContainerReportRelationships,
} from "../converters/ContainerReportRelationshipConverter";
export {
  createContainerFindingEntities,
  createVulnerabilityFindingEntities,
} from "../converters/FindingEntityConverter";
export { createMalwareEntities } from "../converters/MalwareEntityConverter";
export { createReportEntities } from "../converters/ReportEntityConverter";
export {
  createReportFindingRelationships,
} from "../converters/ReportFindingRelationshipConverter";
export {
  createReportMalwareRelationships,
} from "../converters/ReportMalwareRelationshipConverter";
export {
  createContainerReportUnwantedProgramRelationships,
} from "../converters/ReportUnwantedProgramRelationshipConverter";
export {
  createScanAssetRelationships,
} from "../converters/ScanAssetRelationshipConverter";
export { createScanEntities } from "../converters/ScanEntityConverter";
export {
  createVulnerabilityEntities,
} from "../converters/ScanVulnerabilityEntityConverter";
export {
  createScanVulnerabilityRelationships,
} from "../converters/ScanVulnerabilityRelationshipConverter";
export {
  createUnwantedProgramEntities,
} from "../converters/UnwantedProgramEntityConverter";
export { createUserEntities } from "../converters/UserEntityConverter";
export {
  createUserScanRelationships,
} from "../converters/UserScanRelationshipConverter";

export function createVulnerabilityFindingRelationships(
  vulnerabilities: Dictionary<ScanVulnerability[]>,
): VulnerabilityFindingRelationship[] {
  return Object.values(vulnerabilities).reduce(
    (acc: VulnerabilityFindingRelationship[], array) => {
      return [...acc, ...array.map(createVulnerabilityFindingRelationship)];
    },
    [],
  );
}

export function createVulnerabilityFindingRelationship(
  vulnerability: ScanVulnerability,
): VulnerabilityFindingRelationship {
  const findingKey = vulnerabilityFindingEntityKey(vulnerability);
  const vulnerabilityKey = tenableVulnerablilityEntityKey(vulnerability);
  return {
    _key: `${findingKey}_${vulnerabilityKey}`,
    _type: VULNERABILITY_FINDING_RELATIONSHIP_TYPE,
    _class: VULNERABILITY_FINDING_RELATIONSHIP_CLASS,
    _fromEntityKey: findingKey,
    _toEntityKey: vulnerabilityKey,
  };
}

export function createScanFindingRelationships(
  vulnerabilities: Dictionary<ScanVulnerability[]>,
): ScanFindingRelationship[] {
  return Object.values(vulnerabilities).reduce(
    (acc: ScanFindingRelationship[], array) => {
      return [...acc, ...array.map(createScanFindingRelationship)];
    },
    [],
  );
}

export function createScanFindingRelationship(
  vulnerability: ScanVulnerability,
): ScanFindingRelationship {
  const findingKey = vulnerabilityFindingEntityKey(vulnerability);
  const scanKey = scanEntityKey(vulnerability.scan_id);
  return {
    _key: `${scanKey}_${findingKey}`,
    _type: SCAN_FINDING_RELATIONSHIP_TYPE,
    _class: SCAN_FINDING_RELATIONSHIP_CLASS,
    _fromEntityKey: scanKey,
    _toEntityKey: findingKey,
  };
}
