const Module = require("../../src/util/Module");

const { createReadStream } = require('fs');
const { demuxProbe, joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');

// this is super basic and will need to be recoded at some point

async function probeAndCreateResource(readableStream) {
    const { stream, type } = await demuxProbe(readableStream);
    return createAudioResource(stream, { inputType: type });
}

module.exports = class extends Module {
    constructor(Client, folderDir) {
        super(Client, folderDir);

        this.name = "music";
        this.enabled = false;

        this._retrieveActions();

        this.setData("guild", null);
    }

    start(channel, url) {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        this.setData("guild", channel.guild.id);

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });

        this.setData("resource", createAudioResource(url, {
            metadata: {
                title: 'A good song!',
            },
            inlineVolume: true
        }));

        this.getData("resource").volume.setVolume(0.5);

        player.play(this.getData("resource"));

        connection.subscribe(player);
    }

    volume(volume) {
        this.getData("resource").volume.setVolume(volume);
    }
}
