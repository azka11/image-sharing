-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Photos" (
    "photo_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "photo_title" TEXT NOT NULL,
    "photo_img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photos_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "like_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "photo_id" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "photo_id" INTEGER NOT NULL,
    "comment_text" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_user_id_photo_id_key" ON "Likes"("user_id", "photo_id");

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photos"("photo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photos"("photo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
