import { Account, Container } from "../tenable";
import { createAccountContainerRelationships } from "./AccountContainerRelationshipConverter";

test("convert account container relationship", () => {
  const account: Account = {
    id: "TestId",
    name: "TestName",
  };
  const containers: Container[] = [
    {
      number_of_vulnerabilities: "0",
      name: "jupiter-integration-tenable-app",
      size: "2420",
      digest:
        "sha256:c42a932fda50763cb2a0169dd853f071a37629cfa4a477b81b4ee87c2b0bb3dc",
      repo_name: "jupiter-integration-tenable-app",
      score: "0.0",
      id: "6549098203417933758",
      status: "ready",
      created_at: "2019-04-17T10:26:58.509Z",
      repo_id: "907096124672081622",
      platform: "Docker",
      updated_at: "2019-04-17T23:31:28.996Z",
    },
    {
      number_of_vulnerabilities: "0",
      name: "test-bad-image",
      size: "1098",
      digest:
        "sha256:9126cc039f3b5c7362041b9e9cb50ce8ecc803ce2ef6ab3fc0014760eea8d5ec",
      repo_name: "bad-images",
      score: "0.0",
      id: "4885572231367640552",
      status: "ready",
      created_at: "2019-04-18T11:56:48.576Z",
      repo_id: "7591180804793815946",
      platform: "Docker",
      updated_at: "2019-04-18T23:35:42.765Z",
    },
  ];

  const relationships = createAccountContainerRelationships(
    account,
    containers,
  );

  expect(relationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "tenable_account_TestId",
      _key: "tenable_account_TestId_has_tenable_container_6549098203417933758",
      _toEntityKey: "tenable_container_6549098203417933758",
      _type: "tenable_account_has_tenable_container",
    },
    {
      _class: "HAS",
      _fromEntityKey: "tenable_account_TestId",
      _key: "tenable_account_TestId_has_tenable_container_4885572231367640552",
      _toEntityKey: "tenable_container_4885572231367640552",
      _type: "tenable_account_has_tenable_container",
    },
  ]);
});
