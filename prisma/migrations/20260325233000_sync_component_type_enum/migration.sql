/*
  Warnings:

  - The values [CPU,GPU,RAM,Storage,Motherboard,PowerSupply,Case,Cooler] on the enum `ComponentType` will be removed.
    If these variants are still used in the database, this migration maps them to the new lowercase values first.
*/

BEGIN;

CREATE TYPE "ComponentType_new" AS ENUM (
  'cpu',
  'gpu',
  'ram',
  'ssd',
  'motherboard',
  'psu',
  'case',
  'cooler'
);

ALTER TABLE "Component"
ALTER COLUMN "type" TYPE "ComponentType_new"
USING (
  CASE "type"::text
    WHEN 'CPU' THEN 'cpu'
    WHEN 'GPU' THEN 'gpu'
    WHEN 'RAM' THEN 'ram'
    WHEN 'Storage' THEN 'ssd'
    WHEN 'Motherboard' THEN 'motherboard'
    WHEN 'PowerSupply' THEN 'psu'
    WHEN 'Case' THEN 'case'
    WHEN 'Cooler' THEN 'cooler'
  END
)::"ComponentType_new";

ALTER TYPE "ComponentType" RENAME TO "ComponentType_old";
ALTER TYPE "ComponentType_new" RENAME TO "ComponentType";
DROP TYPE "ComponentType_old";

COMMIT;
