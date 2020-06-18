<template>
 <div class="player">
    <h1>{{ itemInfo.title }}</h1>
    <video-player ref="videoPlayer"
                  class="vjs-custom-skin vjs-quality-selector"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @ready="onPlayerReady($event)"
                  @pause="onPlayerEnded($event)"
                  @ended="onPlayerEnded($event)"
                  @statechanged="playerStateChanged($event)">
    </video-player>
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
import AppServices from '@/services/AppServices.js'
import { mapState } from 'vuex';
export default {
  name: 'Player',
  components: {
    VideoPlayer
  },
   data () {
    return {
      playerState: null,
      playerOptions: {
        autoplay: false,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
      }
    }
  },
  created(){
    window.addEventListener('beforeunload',(event) => {
          // Cancel the event as stated by the standard.
        let state = this.playerState
        window.console.log(state)
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
      // if (state.playing === true) {
      //   AppServices.endPlay(this.itemInfo.id)
      // }
    })
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    },
    ...mapState(['type', 'itemInfo']),
  },
  methods: {
    onPlayerPlay () {
      window.console.log('start play!')
      AppServices.startPlay(this.itemInfo.id)
    },
    onPlayerReady () {
      window.console.log('player ready!')
      this.player.play()
    },
    onPlayerEnded () {
      window.console.log('player ended!')
      AppServices.endPlay(this.itemInfo.id)
    },
    //listen state event
    playerStateChanged(playerCurrentState) {
      this.$data.playerState = playerCurrentState
      window.console.log('player current update state', this.$data.playerState)
    },
    playVideo: function (source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      //this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      // this.player.load()
      this.player.play()
    }
  },
  mounted () {
    const src = this.itemInfo.video_link
    this.playVideo(src)
  }
}

</script>
<style>
    .player {
        position: absolute !important;
        width: 70%;
        height: 70%;
    }
    .vjs-custom-skin {
        height: 90% !important;
    }
    .vjs-custom-skin /deep/ .video-js {
        width: 100% !important;
        height: 90%;
    }
</style>