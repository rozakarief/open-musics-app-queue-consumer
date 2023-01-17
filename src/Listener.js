/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const infoPlaylist = await this._playlistsService.getPlaylistInfo(
        playlistId
      );
      const songsList = await this._playlistsService.getSongsInPlaylist(playlistId);

      const playlistEx = {
        playlist: {
          id: infoPlaylist.playlist_id,
          name: infoPlaylist.name,
          songs: songsList,
        },
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistEx)
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
