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
        disabled: false, // disable text field, prevent editor from edit other info than upload video + sub
        filmData: {
        },
      }
    },
    created () {
      this.$data.filmData = this.$store.getters.filmInfo
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
    },
  }
</script>
