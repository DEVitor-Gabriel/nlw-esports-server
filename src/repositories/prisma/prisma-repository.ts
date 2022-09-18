import { prisma } from "../../prisma"
import { AdCreateData, Repository } from "../repositoy";



export class PrismaRepository implements Repository {
    async readAllGames() {
        const games = await prisma.game.findMany({
            include: {
                _count: {
                    select: {
                        ads: true,
                    }
                }
            }
        });
        return games;
    }

    async readAdsByGame(gameId: string) {
        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: {
                gameId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return ads
    }

    async readDiscordByAd(adId: string) {
        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true,
            },
            where: {
                id: adId,
            }
        });

        return ad.discord;
    }

    async createAd(data: AdCreateData) {
        const ad = await prisma.ad.create({
            data
        })

        return ad;
    }
}