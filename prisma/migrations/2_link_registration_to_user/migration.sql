-- AlterTable: link QuestRegistration to User (optional)
ALTER TABLE "QuestRegistration" ADD COLUMN "userId" TEXT;

-- CreateIndex
CREATE INDEX "QuestRegistration_userId_idx" ON "QuestRegistration"("userId");

-- AddForeignKey
ALTER TABLE "QuestRegistration" ADD CONSTRAINT "QuestRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
