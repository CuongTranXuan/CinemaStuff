<template>
  <v-container
    id="new-film"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Create film informations"
      class="px-5 py-3"
    >
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.id"
                label="ID"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.vote_average"
                label="Vote Average"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.release_date"
                label="Release Date"
                :disabled="disabled"
              />
            </v-col>
            <v-col>
              <v-checkbox
                v-model="filmData.adult"
                label="Adult"
                :disabled="disabled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.title"
                label="Title"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.original_title"
                label="Original title"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.original_language"
                label="Language"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.video_link"
                label="Video Link"
                :disabled="disabled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="filmData.poster_link"
                label="Poster Link"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="filmData.trailer_link"
                label="Trailer Link"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="filmData.overview"
                label="Overview"
                :disabled="disabled"
              />
            </v-col>
            <v-row>
              <v-col cols="3">
                <v-file-input
                  label="Add .mkv file"
                  accept=".mkv"
                  filled
                  show-size
                  dense
                  prepend-icon="mdi-movie-open"
                  v-model="video"
                />
                <v-btn
                  color="info"
                  class="mr-0"
                  @click="uploadVideo"
                >
                  Upload
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-file-input
                  label="Add .vtt file"
                  accept=".vtt"
                  filled
                  show-size
                  dense
                  prepend-icon="mdi-subtitles"
                  :disabled="uploadSubDisabled"
                  v-model="sub"
                />
                <v-btn
                  color="info"
                  class="mr-0"
                  @click="uploadSubtitle"
                  :disabled="uploadSubDisabled"
                >
                  Upload
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  color="info"
                  class="mr-0"
                  @click="performEncode"
                  :disabled="encodeDisabled"
                >
                  Encode film
                </v-btn>
              </v-col>
            </v-row>
            <v-col
              cols="12"
              class="text-right"
            >
              <v-btn
                color="info"
                class="mr-0"
                @click="handleSubmit"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </base-material-card>
  </v-container>
</template>
<script>
  import AppServices from '@/services/AppServices.js'
  export default {
    name: 'NewFilm',
    data () {
      return {
        disabled: false, // disable text field
        encodeDisabled: true, //only when uploaded video + sub then this button showed up
        uploadSubDisabled: true, // show up when video uploaded
        filmData: {
          id: null,
          adult: false,
          title: null,
          trailer_link: null,
          original_language: null,
          original_title: null,
          overview: null,
          poster_link: null,
          release_date: null,
          video_link: null,
          vote_average: null,
        },
        sub: null,
        video: null
      }
    },
    methods: {
      handleSubmit () {
        if (confirm('Do you want to save?')) {
          AppServices.createFilm(this.$data.filmData)
          this.$router.push({ path: '/dashboard' })
        }
      },
      uploadSubtitle () {
        var that = this
        const formData = new FormData()
        formData.append('sub', this.$data.sub)
        if (this.$data.sub === null) {
          alert('you must choose a file')
        } 
        else {
          AppServices.uploadSubtitle(formData).then(result => {
            alert(result.sub)
            that.$data.encodeDisabled = false
          })
        }
      },
      uploadVideo () {
        var that = this
        const formData = new FormData()
        formData.append('video', this.$data.video)
        if (this.$data.video === null) { 
          alert('you must choose a file') 
        } 
        else {
          AppServices.uploadVideo(formData).then(result => {
            alert(result.video)
            that.$data.filmData.video_link = `http://125.212.138.107/hls/master_${result.filename}.m3u8`
            that.$data.uploadSubDisabled = false
          })
        }
      },
      performEncode(){
        alert('yay')
      }
    },
  }
</script>
