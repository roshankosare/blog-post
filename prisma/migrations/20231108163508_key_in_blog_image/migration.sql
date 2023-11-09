/*
  Warnings:

  - Made the column `avatar` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BlogImages" ADD COLUMN     "key" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "avatar" SET NOT NULL;
