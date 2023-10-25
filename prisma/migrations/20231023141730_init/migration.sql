-- CreateTable
CREATE TABLE "BlogImages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "BlogImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogImages" ADD CONSTRAINT "BlogImages_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
