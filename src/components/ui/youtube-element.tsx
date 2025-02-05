import React from 'react';
import YouTube from 'react-youtube';

type Props = {
  callback?: (cb: boolean) => void;
};

export class YouTubeElement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    if (this.props.callback) this.props.callback(true);

    return (
      <div className="flex flex-col w-full items-center justify-center">
        <h2 className="p-0 m-0 pb-6">Video Overview of SCARF-UI</h2>
        <YouTube videoId="TmfcrQSykFo" opts={opts} onReady={this._onReady} />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _onReady(event: any) {
    event.target.pauseVideo();
  }
}
