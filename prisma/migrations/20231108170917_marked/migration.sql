/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `BlogImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlogImages_key_key" ON "BlogImages"("key");
