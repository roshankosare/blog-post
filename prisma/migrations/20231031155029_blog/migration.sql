/*
  Warnings:

  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "category",
ADD COLUMN     "tags" TEXT[];
