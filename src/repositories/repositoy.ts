export interface AdCreateData {
    gameId : string,
    name: string,
    yearsPlaying: number,
    discord: string,
    weekDays: any,
    hourStart: number,
    hourEnd: number,
    useVoiceChannel: boolean,
}

export interface Repository {
    readAllGames: () => any;
    readAdsByGame: (gameId: string) => any;
    readDiscordByAd: (adId: string) => any;
    createAd: (data: AdCreateData) => any;
}