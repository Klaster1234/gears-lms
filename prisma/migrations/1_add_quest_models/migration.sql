-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM (
    'REPAIR',
    'SECOND_HAND',
    'VEGAN',
    'NO_PACKAGE',
    'ECO',
    'RECYCLING',
    'EDUCATION',
    'MOBILITY',
    'TOURISM',
    'GASTRONOMY'
);

-- CreateEnum
CREATE TYPE "TransportMode" AS ENUM ('WALKING', 'BIKE', 'PUBLIC', 'MIXED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "IndoorOutdoor" AS ENUM ('INDOOR', 'OUTDOOR', 'MIXED');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM (
    'PENDING',
    'WAITLIST',
    'CONFIRMED',
    'ATTENDED',
    'CANCELLED',
    'NO_SHOW'
);

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DUPLICATE');

-- CreateTable
CREATE TABLE "QuestPlace" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameEn" TEXT,
    "nameSk" TEXT,
    "category" "PlaceCategory" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "street" TEXT,
    "houseNumber" TEXT,
    "postalCode" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Gliwice',
    "countryCode" CHAR(2) NOT NULL DEFAULT 'PL',
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "descriptionPl" TEXT,
    "descriptionEn" TEXT,
    "descriptionSk" TEXT,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "hours" JSONB,
    "wheelchairAccessible" BOOLEAN,
    "accessibilityNotes" TEXT,
    "photoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sources" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "verifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titlePl" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleSk" TEXT,
    "descriptionPl" TEXT,
    "descriptionEn" TEXT,
    "descriptionSk" TEXT,
    "durationMinutes" INTEGER,
    "distanceKm" DOUBLE PRECISION,
    "transportMode" "TransportMode",
    "difficulty" "Difficulty",
    "maxParticipants" INTEGER NOT NULL DEFAULT 10,
    "greencompCompetence" TEXT,
    "themes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "seasonRecommended" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "indoorOutdoor" "IndoorOutdoor",
    "scheduledAt" TIMESTAMP(3),
    "meetingPointId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestStop" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "taskPl" TEXT,
    "taskEn" TEXT,
    "taskSk" TEXT,
    "estimatedMinutes" INTEGER,

    CONSTRAINT "QuestStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRegistration" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "ageRange" TEXT,
    "city" TEXT,
    "dietaryRequirements" TEXT,
    "accessibilityNeeds" TEXT,
    "hearAboutUs" TEXT,
    "consentDataProcessing" BOOLEAN NOT NULL DEFAULT false,
    "consentPhotos" BOOLEAN NOT NULL DEFAULT false,
    "consentNewsletter" BOOLEAN NOT NULL DEFAULT false,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceSuggestion" (
    "id" TEXT NOT NULL,
    "suggestedName" TEXT NOT NULL,
    "suggestedCategory" TEXT,
    "suggestedAddress" TEXT,
    "suggestedDescription" TEXT,
    "suggesterEmail" TEXT,
    "suggesterName" TEXT,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewerNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaceSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestPlace_slug_key" ON "QuestPlace"("slug");

-- CreateIndex
CREATE INDEX "QuestPlace_category_idx" ON "QuestPlace"("category");

-- CreateIndex
CREATE INDEX "QuestPlace_city_idx" ON "QuestPlace"("city");

-- CreateIndex
CREATE INDEX "QuestPlace_isActive_idx" ON "QuestPlace"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_slug_key" ON "Quest"("slug");

-- CreateIndex
CREATE INDEX "Quest_scheduledAt_idx" ON "Quest"("scheduledAt");

-- CreateIndex
CREATE INDEX "Quest_isPublished_idx" ON "Quest"("isPublished");

-- CreateIndex
CREATE INDEX "QuestStop_questId_idx" ON "QuestStop"("questId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestStop_questId_position_key" ON "QuestStop"("questId", "position");

-- CreateIndex
CREATE INDEX "QuestRegistration_questId_idx" ON "QuestRegistration"("questId");

-- CreateIndex
CREATE INDEX "QuestRegistration_email_idx" ON "QuestRegistration"("email");

-- CreateIndex
CREATE INDEX "QuestRegistration_status_idx" ON "QuestRegistration"("status");

-- CreateIndex
CREATE UNIQUE INDEX "QuestRegistration_questId_email_key" ON "QuestRegistration"("questId", "email");

-- CreateIndex
CREATE INDEX "PlaceSuggestion_status_idx" ON "PlaceSuggestion"("status");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_meetingPointId_fkey" FOREIGN KEY ("meetingPointId") REFERENCES "QuestPlace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStop" ADD CONSTRAINT "QuestStop_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStop" ADD CONSTRAINT "QuestStop_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "QuestPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRegistration" ADD CONSTRAINT "QuestRegistration_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
