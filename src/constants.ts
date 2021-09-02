import {
  RelationshipClass,
  RelationshipDirection,
} from '@jupiterone/integration-sdk-core';

export const StepIds = {
  ACCOUNT: 'step-account',
  ASSETS: 'step-assets',
  VULNERABILITIES: 'step-vulnerabilities',
  VULNERABILITY_CVE_RELATIONSHIPS: 'build-vuln-cve-relationships',
  ASSET_VULNERABILITY_RELATIONSHIPS: 'build-asset-vuln-relationships',
  USERS: 'step-users',
  CONTAINERS: 'step-containers',
  CONTAINER_REPORTS: 'step-container-reports',
};

export const Entities = {
  ACCOUNT: {
    resourceName: 'Account',
    _class: 'Account',
    _type: 'tenable_account',
  },
  ASSET: {
    resourceName: 'Asset',
    _class: 'Record',
    _type: 'tenable_asset',
  },
  CONTAINER: {
    resourceName: 'Container',
    _class: 'Image',
    _type: 'tenable_container',
  },
  // TODO does the report entity simply include container details, can we really get rid of this entity?
  CONTAINER_REPORT: {
    resourceName: 'Container Report',
    _class: 'Assessment',
    _type: 'tenable_container_report',
  },
  CONTAINER_FINDING: {
    resourceName: 'Container Finding',
    _class: 'Finding',
    _type: 'tenable_container_finding',
  },
  CONTAINER_MALWARE: {
    resourceName: 'Container Malware',
    _class: 'Finding',
    _type: 'tenable_container_malware',
  },
  CONTAINER_UNWANTED_PROGRAM: {
    resourceName: 'Container Unwanted Program',
    _class: 'Finding',
    _type: 'tenable_container_unwanted_program',
  },
  VULNERABILITY: {
    resourceName: 'Vulnerability',
    _class: 'Finding',
    _type: 'tenable_vulnerability_finding',
  },
  USER: {
    resourceName: 'User',
    _class: 'User',
    _type: 'tenable_user',
  },
};

export const Relationships = {
  ACCOUNT_HAS_USER: {
    _type: 'tenable_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_ASSET: {
    _type: 'tenable_account_has_asset',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSET._type,
  },
  ACCOUNT_HAS_CONTAINER: {
    _type: 'tenable_account_has_container',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CONTAINER._type,
  },
  CONTAINER_HAS_REPORT: {
    _type: 'tenable_container_has_container_report',
    sourceType: Entities.CONTAINER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CONTAINER_REPORT._type,
  },
  REPORT_IDENTIFIED_FINDING: {
    _type: 'tenable_container_report_identified_finding',
    sourceType: Entities.CONTAINER_REPORT._type,
    _class: RelationshipClass.IDENTIFIED,
    targetType: Entities.CONTAINER_FINDING._type,
  },
  REPORT_IDENTIFIED_MALWARE: {
    _type: 'tenable_container_report_identified_malware',
    sourceType: Entities.CONTAINER_REPORT._type,
    _class: RelationshipClass.IDENTIFIED,
    targetType: Entities.CONTAINER_MALWARE._type,
  },
  REPORT_IDENTIFIED_UNWANTED_PROGRAM: {
    _type: 'tenable_container_report_identified_unwanted_program',
    sourceType: Entities.CONTAINER_REPORT._type,
    _class: RelationshipClass.IDENTIFIED,
    targetType: Entities.CONTAINER_UNWANTED_PROGRAM._type,
  },
  ASSET_HAS_VULN: {
    _type: 'tenable_asset_has_vulnerability_finding',
    sourceType: Entities.ASSET._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.VULNERABILITY._type,
  },
};

export const MappedRelationships = {
  ASSET_IS_HOST: {
    _type: 'tenable_asset_is_host',
    sourceType: Entities.ASSET._type,
    _class: RelationshipClass.IS,
    targetType: 'host',
    direction: RelationshipDirection.FORWARD,
  },
  HOST_HAS_VULN: {
    _type: 'host_has_tenable_vulnerability_finding',
    sourceType: Entities.VULNERABILITY._type,
    _class: RelationshipClass.HAS,
    targetType: 'host',
    direction: RelationshipDirection.REVERSE,
  },
  VULNERABILITY_IS_CVE: {
    _type: 'tenable_vulnerability_finding_is_cve',
    sourceType: Entities.VULNERABILITY._type,
    _class: RelationshipClass.IS,
    targetType: 'cve',
    direction: RelationshipDirection.FORWARD,
  },
};
