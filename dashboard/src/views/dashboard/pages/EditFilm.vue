<template>
  <v-container
    id="new-film"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-text"
      title="Edit film informations"
      class="px-5 py-3"
    >
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.id"
                label="ID"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.vote_average"
                label="Vote Average"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="filmData.release_date"
                label="Release Date"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col>
              <v-checkbox
                v-model="filmData.adult"
                label="Adult"
                :disabled="editorDisabled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.title"
                label="Title"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.original_title"
                label="Original title"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.original_language"
                label="Language"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filmData.video_link"
                label="Video Link"
                :disabled="editorDisabled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="filmData.poster_link"
                label="Poster Link"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="filmData.trailer_link"
                label="Trailer Link"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="filmData.overview"
                label="Overview"
                :disabled="editorDisabled"
              />
            </v-col>
            <v-row>
              <v-col cols="3">
                <v-file-input
                  v-model="video"
                  label="Add .mkv file"
                  accept=".mkv"
                  filled
                  show-size
                  dense
                  prepend-icon="mdi-movie-open"
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
                  v-model="sub"
                  label="Add .vtt file"
                  accept=".vtt"
                  filled
                  show-size
                  dense
                  prepend-icon="mdi-subtitles"
                />
                <v-btn
                  color="info"
                  class="mr-0"
                  @click="uploadSubtitle"
                >
                  Upload
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  color="info"
                  class="mr-0"
                  :disabled="encodeDisabled"
                  @click="performEncode"
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
              <v-btn
                color="error"
                class="mr-0"
                :disabled="editorDisabled"
                @click="handleDelete"
              >
                Delete
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
    name: 'EditFilm',
    data () {
      return {
        editorDisabled: false, // disable text field, prevent editor from edit other info than upload video + sub
        encodeDisabled: false, // only when uploaded video + sub then this button showed up
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
        video: null,
      }
    },
    created () {
      this.$data.filmData = this.$store.getters.filmInfo
      if (this.$store.state.user.role === 'editor') this.$data.editorDisabled = true
    },
    methods: {
      handleSubmit () {
        if (confirm('Do you really want to save?')) {
          AppServices.updateFilm(this.$data.filmData)
          this.$router.push({ path: '/dashboard' })
        }
      },
      handleDelete () {
        if (confirm('Are you sure?')) {
          AppServices.removeFilm(this.$data.filmData._id)
          this.$router.push({ path: '/dashboard' })
        }
      },
      uploadSubtitle () {
        const formData = new FormData()
        formData.append('sub', this.$data.sub)
        if (this.$data.sub === null) {
          alert('you must choose a file')
        } else {
          AppServices.uploadSubtitle(formData).then(result => {
            alert(result.filename)
          })
        }
      },
      uploadVideo () {
        const formData = new FormData()
        formData.append('video', this.$data.video)
        if (this.$data.video === null) {
          alert('you must choose a file')
        } else {
          AppServices.uploadVideo(formData).then(result => {
            alert(result.filename)
            const filename = result.filename.replace(/\..+$/, '')// trim the extension away
            this.$data.filmData.video_link = `http://125.212.203.148/hls/master_${filename}.m3u8`
            this.$data.videoFile = result.filename
            this.$data.encodeDisabled = false
          })
        }
      },
      performEncode () {
        const data = {
          videoFile: this.$data.video.name,
          subFile: this.$data.sub.name,
          filmName: this.$data.filmData.id,
        }
        AppServices.encodeVideo(data).then(res => {
          alert(res)
        })
      },
    },
  }
</script>
