<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <base-material-card
      color="success"
      class="px-5 py-3"
    >
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Film List
        </div>

        <div class="subtitle-1 font-weight-light">
          don't know what to write here
        </div>
      </template>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="id"
          single-select
          :loading="isLoading"
          loading-text="Loading... Please wait"
          no-data-text="No data to display"
          @click:row="rowClick"
        />
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  import AppServices from '@/services/AppServices.js'
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        isLoading: true,
        selectedId: -1,
        headers: [
          {
            sortable: true,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Title',
            value: 'title',
          },
          {
            sortable: false,
            text: 'Language',
            value: 'original_language',
          },
          {
            sortable: false,
            text: 'Original Title',
            value: 'original_title',
          },
          {
            sortable: false,
            text: 'Video Link',
            value: 'video_link',
          },
          {
            sortable: false,
            text: 'Overview',
            value: 'overview',
            width: '100%',
          },
        ],
        items: [],
      }
    },
    created () {
      var that = this
      AppServices.getFilmList().then((filmList) => {
        that.$data.items = filmList.data
        that.$data.isLoading = false
      })
    },
    methods: {
      rowClick: function (item, row) {
        row.select(true)
        this.selectedId = item.id
        this.$store.commit('SET_FILM_INFO', item)
        this.$router.push(`/film/${this.selectedId}`)
      },
    },
  }
</script>
<style scoped>
  /deep/ tr.v-data-table__selected {
    background: #82f58e !important;
  }
</style>
