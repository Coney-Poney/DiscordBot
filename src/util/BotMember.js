class BotMember {
    constructor(data, member, Client) {
        this.id = data.id;
        this.pronounOverrides = data.pronoun_overrides
        this.member = member;
        this.ongoingMute = data.ongoing_mute;
        this.spamTrips = data.spam_trips;
    }


}