<template>
 <div class="player">
    <h1>{{ itemInfo.title }}</h1>
    <video-player ref="videoPlayer"
                  class="vjs-custom-skin vjs-quality-selector"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @ready="onPlayerReady($event)">
    </video-player>
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
import { mapState } from 'vuex';
export default {
  name: 'Player',
  components: {
    VideoPlayer
  },
   data () {
    return {
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
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    },
    ...mapState(['type', 'itemInfo']),
  },
  methods: {
    onPlayerPlay () {
      //console.log('player play!', player)
    },
    onPlayerReady () {
      //console.log('player ready!', player)
      this.player.play()
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