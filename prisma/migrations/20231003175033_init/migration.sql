/*
  Warnings:

  - You are about to drop the column `body` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `catagory` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `markdownHTML` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markdownString` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "body",
DROP COLUMN "catagory",
ADD COLUMN     "bannerImg" TEXT,
ADD COLUMN     "category" TEXT[],
ADD COLUMN     "markdownHTML" TEXT NOT NULL,
ADD COLUMN     "markdownString" TEXT NOT NULL;
