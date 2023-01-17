/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistInfo(playlistId) {
    const query = {
      text: `select playlist_id, name from playlists where playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getSongsInPlaylist(playlistId) {
    const query = {
      text: `SELECT a.song_id AS id, a.title, a.performer
            FROM songs AS a
            LEFT JOIN playlist_songs AS b
            ON a.song_id = b.id_song
            WHERE b.id_playlist = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
