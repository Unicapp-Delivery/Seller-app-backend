/*
  Warnings:

  - You are about to drop the column `name` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subDomain]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instagramHandle]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bussinessName` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subDomain` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "bussinessName" TEXT NOT NULL,
ADD COLUMN     "instagramHandle" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "subDomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_phoneNumber_key" ON "Seller"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_subDomain_key" ON "Seller"("subDomain");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_instagramHandle_key" ON "Seller"("instagramHandle");
