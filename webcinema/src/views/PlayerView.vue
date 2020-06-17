<template>
  <div class="film">
    <div class="film_content">
      <div class="item_content clearfix">
        <template v-if="showItemInfo">
          <aside class="poster">
            <figure>
              <img :src="urlImg" />
            </figure>
            <ScoreIndicator
              :score="itemInfo.vote_average"
              size="82"
              stroke-width="5"
              stroke-color="#ff6633"
            />
            <i>Vote Average</i>
          </aside>
          <h1>{{ itemInfo.title }}</h1>

          <p>
            <span v-if="!readMore">{{ this.overviewShort}}</span>
            <span v-if="readMore">{{itemInfo.overview}}</span>
            <span v-if="!readMore">...</span>
            <a class="more" @click="activeReadMore">{{buttonText}}</a>
          </p>

          <h2 class="label">
            <font-awesome-icon :icon="icon" size="1x" class="icon" />
            &nbsp;
            {{ dateLabel }}
          </h2>
          <p>{{ this.date }}</p>
          <button class="button" @click="switchPlayer" title="play">Play</button> &nbsp;
          <button class="button button2" @click="openTrailer" title="play">Trailer</button> &nbsp;
          <div v-if="togglePlay" id="doggo">
            <video-player
              ref="videoPlayer"
              class="vjs-custom-skin vjs-quality-selector"
              :options="playerOptions"
              @play="onPlayerPlay($event)"
              @ready="onPlayerReady($event)"
              @pause="onPlayerEnded($event)"
              @ended="onPlayerEnded($event)"
              @statechanged="playerStateChanged($event)"
            ></video-player>
          </div>
        </template>
        <template v-else>Loading ...</template>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreIndicator from "@/components/ScoreIndicator";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { mapState, mapGetters } from "vuex";
import dayjs from "dayjs";

export default {
  name: "PlayerView",
  components: {
    ScoreIndicator,
    VideoPlayer
  },
  data() {
    return {
      readMore: false,
      buttonText: "Read More",
      togglePlay: false,
      playerOptions: {
        autoplay: false,
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true
        }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapState(["type", "itemInfo"]),
    ...mapGetters(["imgPath"]),
    showItemInfo() {
      return !Object.keys(this.itemInfo).length ? false : true;
    },
    overviewShort() {
      let str = this.itemInfo.overview;
      str = str.substring(0, 250);
      return str;
    },
    urlImg() {
      return this.itemInfo.poster_link != null
        ? `${this.itemInfo.poster_link}`
        : require("@/assets/images/poster-not-available.png");
    },
    date() {
      return this.itemInfo.year
        ? dayjs(this.itemInfo.year).format("MMM D, YYYY")
        : "";
    },
    dateLabel() {
      return this.itemInfo.type == "movie" ? "Release date" : "First air date";
    },
    icon() {
      return this.itemInfo.type == "movie" ? "film" : "tv";
    },
    trailer() {
      return this.itemInfo.trailer_link;
    }
  },
  methods: {
    switchPlayer: function() {
      // let id = this.$route.params.id
      // this.$router.push({path: `/movies/${id}/play`})
      if (!this.$data.togglePlay) {
        this.$data.togglePlay = true;
      }
      // this.player.load()
      // this.player.play();
    },
    openTrailer: function() {
      let trailer = this.trailer;
      window.open(trailer, "_blank");
    },
    activeReadMore: function() {
      this.$data.readMore = !this.$data.readMore;
      this.$data.buttonText =
        this.$data.readMore === true ? "Less" : "Read More";
    },
    onPlayerPlay() {
      window.console.log("start play!");
      // AppServices.startPlay(this.itemInfo.id)
    },
    onPlayerReady() {
      window.console.log("player ready!");
      //Only when ready does "player" object exist
      var elmnt = document.getElementById("doggo");
      elmnt.scrollIntoView();
      const video = {
        withCredentials: false,
        type: "application/x-mpegurl",
        src: this.itemInfo.video_link
      };
      this.player.src(video);
      this.player.play();
    },
    onPlayerEnded() {
      window.console.log("player ended!");
      // AppServices.endPlay(this.itemInfo.id)
    },
    //listen state event
    playerStateChanged(playerCurrentState) {
      this.$data.playerState = playerCurrentState;
      window.console.log("player current update state", this.$data.playerState);
    },
    playVideo: function(source) {
      const video = {
        withCredentials: false,
        type: "application/x-mpegurl",
        src: source
      };
      //this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video);
      // this.player.load()
      this.player.play();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#doggo {
  height: 800px;
  float: center;
  padding-top: 20vh;
}
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
figure {
  margin: 0 0 1em;
}
img {
  width: 50%;
  height: auto;
}
h1 {
  margin-top: 0;
  font-size: 2em;
  color: $color-primary;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
li {
  display: inline;
  padding: 4px;
  margin-right: 5px;

  background-color: $color-tags;
  color: $color-text-secondary;
  font-size: 0.9em;
}
p {
  margin: 0;
  line-height: 1.4;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.button2 {
  background-color: #f44336;
} /* Red */
a {
  display: inline-block;
  color: $color-text-secondary;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px dotted $color-text-secondary;

  &:hover {
    color: $color-primary;
  }
}
.item_content {
  padding: 2em;
}
.poster {
  display: block;
  margin-bottom: 2em;
  text-align: center;
}
.info {
  display: block;
}
.label {
  margin: 2em 0 0.2em;
  font-family: $font-secondary, sans-serif;
  color: $color-secondary;
  font-size: 1em;
  text-transform: uppercase;
}
.web a {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@include sm {
  .poster {
    float: left;
    margin: 0;
    width: 33%;
    text-align: center;
  }
  .info {
    display: block;
    padding-left: 2em;
    margin-left: 33%;
  }
  .control {
    display: block;
    padding-left: 2em;
    margin-left: 33%;
  }
}
</style>