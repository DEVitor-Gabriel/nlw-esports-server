import { Repository } from "../repositories/repositoy";

export class ProcessGetAllGames {
    constructor(
        private repository: Repository,
    ) { }

    async execute() {
        const games = await this.repository.readAllGames();
        return games;

    }
}