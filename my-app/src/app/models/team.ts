export class Team {
    _id!: string;
    name!: string;
    scrum_master!: string;
}

export class Teams {
    teams: Team[] = [];
}