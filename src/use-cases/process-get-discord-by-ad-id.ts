import { Repository } from "../repositories/repositoy";

export class ProcessGetDiscordByAdId {
    constructor(
        private repository: Repository,
    ) { }

    async execute(adId: string) {
        const discord = await this.repository.readDiscordByAd(adId);
        // return ads;
        return {
            discord
        }

    }
}