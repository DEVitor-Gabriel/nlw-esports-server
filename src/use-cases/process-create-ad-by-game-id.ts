import { AdCreateData, Repository } from "../repositories/repositoy";
import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";

export class ProcessCreateAdByGameId {
    constructor(
        private repository: Repository,
    ) { }

    async execute(input: AdCreateData) {
        const data : AdCreateData = {
            gameId: input.gameId,
            name: input.name,
            yearsPlaying: input.yearsPlaying,
            discord: input.discord,
            weekDays: input.weekDays.join(','),
            hourStart: convertHourStringToMinutes(input.hourStart.toString()),
            hourEnd: convertHourStringToMinutes(input.hourEnd.toString()),
            useVoiceChannel: input.useVoiceChannel,
        }
        const ad = await this.repository.createAd(data);
        return ad;

    }
}