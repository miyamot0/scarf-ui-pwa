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
      <div className="flex flex-col">
        <h4 className="pb-4">Video Overview of SCARF-UI</h4>

        <div className="flex flex-row justify-center">
          <YouTube videoId="TmfcrQSykFo" opts={opts} onReady={this._onReady} />
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _onReady(event: any) {
    event.target.pauseVideo();
  }
}
