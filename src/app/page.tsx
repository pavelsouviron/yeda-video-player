import YedaVideoPlayer from '@/app/components/video-player/YedaVideoPlayer';
import {VideoPlaylistProps} from '@/app/types/player-types';
import TestPlaylist from '@/app/test/test-input.json';

export default function Home() {
  const playlist: VideoPlaylistProps = TestPlaylist;
  return <YedaVideoPlayer {...playlist}></YedaVideoPlayer>;
}
