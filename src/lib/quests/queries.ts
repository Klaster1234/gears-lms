import { prisma } from '@/lib/prisma';
import type { PlaceCategory, Prisma } from '@prisma/client';

export type Place = Awaited<ReturnType<typeof getActivePlaces>>[number];
export type QuestSummary = Awaited<ReturnType<typeof getPublishedQuests>>[number];
export type QuestDetail = Awaited<ReturnType<typeof getQuestBySlug>>;

export async function getActivePlaces(filter?: {
  categories?: PlaceCategory[];
  city?: string;
}) {
  const where: Prisma.QuestPlaceWhereInput = { isActive: true };
  if (filter?.categories && filter.categories.length > 0) {
    where.category = { in: filter.categories };
  }
  if (filter?.city) {
    where.city = filter.city;
  }
  return prisma.questPlace.findMany({
    where,
    orderBy: [{ city: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      slug: true,
      name: true,
      nameEn: true,
      nameSk: true,
      category: true,
      tags: true,
      street: true,
      houseNumber: true,
      postalCode: true,
      city: true,
      lat: true,
      lng: true,
      descriptionPl: true,
      descriptionEn: true,
      descriptionSk: true,
      website: true,
      facebook: true,
      instagram: true,
      phone: true,
      email: true,
      hours: true,
      wheelchairAccessible: true,
      photoUrls: true,
    },
  });
}

export async function getPlaceBySlug(slug: string) {
  return prisma.questPlace.findUnique({ where: { slug, isActive: true } as Prisma.QuestPlaceWhereUniqueInput & { isActive?: boolean } });
}

export async function getPublishedQuests(opts?: { upcomingOnly?: boolean }) {
  const where: Prisma.QuestWhereInput = { isPublished: true };
  if (opts?.upcomingOnly) {
    where.scheduledAt = { gte: new Date() };
  }
  return prisma.quest.findMany({
    where,
    orderBy: [{ scheduledAt: 'asc' }, { createdAt: 'desc' }],
    include: {
      meetingPoint: {
        select: { id: true, name: true, city: true, lat: true, lng: true },
      },
      _count: {
        select: {
          registrations: {
            where: { status: { notIn: ['CANCELLED', 'NO_SHOW'] } },
          },
        },
      },
    },
  });
}

export async function getQuestBySlug(slug: string) {
  return prisma.quest.findUnique({
    where: { slug },
    include: {
      meetingPoint: true,
      stops: {
        orderBy: { position: 'asc' },
        include: { place: true },
      },
      _count: {
        select: {
          registrations: {
            where: { status: { notIn: ['CANCELLED', 'NO_SHOW'] } },
          },
        },
      },
    },
  });
}

export async function countActiveRegistrations(questId: string): Promise<number> {
  return prisma.questRegistration.count({
    where: {
      questId,
      status: { notIn: ['CANCELLED', 'NO_SHOW'] },
    },
  });
}
