import express from 'express'
import { PrismaRepository } from './repositories/prisma/prisma-repository';
import { AdCreateData } from './repositories/repositoy';
import { ProcessCreateAdByGameId } from './use-cases/process-create-ad-by-game-id';
import { ProcessGetAdsByGameId } from './use-cases/process-get-ads-by-game-id';
import { ProcessGetAllGames } from './use-cases/process-get-all-games';
import { ProcessGetDiscordByAdId } from './use-cases/process-get-discord-by-ad-id';

export const routes = express.Router()

routes.get('/games', async (request, response) => {

  const repository = new PrismaRepository()

  const useCase = new ProcessGetAllGames(
    repository
  )

  const output = await useCase.execute()

  return response.json(output);
});

routes.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const repository = new PrismaRepository()

  const useCase = new ProcessCreateAdByGameId(
    repository
  )

  const input: AdCreateData = {
    gameId: gameId,
    name: body.name,
    yearsPlaying: body.yearsPlaying,
    discord: body.discord,
    weekDays: body.weekDays,
    hourStart: body.hourStart,
    hourEnd: body.hourEnd,
    useVoiceChannel: body.useVoiceChannel,
  }
  const output = await useCase.execute(
    input
  )

  return response.status(201).json(output);
});

routes.get('/games/:id/ads', async (request, response) => {
  const gameId: any = request.params.id;

  const repository = new PrismaRepository()

  const useCase = new ProcessGetAdsByGameId(
    repository
  )

  const output = await useCase.execute(gameId)

  return response.json(output);
});

routes.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const repository = new PrismaRepository()

  const useCase = new ProcessGetDiscordByAdId(
    repository
  )

  const output = await useCase.execute(adId)

  return response.json(output);
});