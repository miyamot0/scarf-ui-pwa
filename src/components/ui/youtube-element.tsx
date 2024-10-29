import React from 'react';
import YouTube from 'react-youtube';

export class YouTubeElement extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <div className="flex flex-col w-full items-center justify-center">
        <YouTube videoId="TmfcrQSykFo" opts={opts} onReady={this._onReady} />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _onReady(event: any) {
    event.target.pauseVideo();
  }
}
