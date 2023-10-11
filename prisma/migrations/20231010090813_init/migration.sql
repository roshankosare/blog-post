/*
  Warnings:

  - You are about to drop the column `bannerImg` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "bannerImg",
ADD COLUMN     "coverImage" TEXT;
