import { Repository } from "../repositories/repositoy";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";

export class ProcessGetAdsByGameId {
    constructor(
        private repository: Repository,
    ) { }

    async execute(gameId: string) {
        const ads = await this.repository.readAdsByGame(gameId);
        // return ads;
        return (ads.map((ad: any) => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd),
            }
        }));

    }
}