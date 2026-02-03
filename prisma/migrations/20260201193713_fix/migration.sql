/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Route` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_vehicleId_fkey";

-- DropIndex
DROP INDEX "Route_vehicleId_key";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "vehicleId";
