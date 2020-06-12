<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
  <v-row>
    <v-col
        cols="12"
    >
        <base-material-chart-card
          :data="dummy.data"
          :options="dummy.options"
          :responsive-options="dummy.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <h4 class="card-title font-weight-light mt-2 ml-2">
            Current watching
          </h4>
          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
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
            Control current list film
          </div>
          <!-- <v-spacer/>
          <v-text-field
            v-model="search"
            append-icon="mid-magnify"
            label="Search"
            single-line
            hide-details
          /> -->
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
    </v-col>
  </v-row>
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
        // search:'',
        dummy: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
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
            width: '20%',
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
      AppServices.getFilmList().then(filmList => {
        that.$data.items = filmList
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
