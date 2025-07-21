-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog_Table" (
    "post_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "post_title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Blog_Table_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_userName_key" ON "user_table"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_emailAddress_key" ON "user_table"("emailAddress");

-- AddForeignKey
ALTER TABLE "Blog_Table" ADD CONSTRAINT "Blog_Table_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
