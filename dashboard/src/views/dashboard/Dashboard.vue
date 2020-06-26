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
          :data="viewsCounting.data"
          :options="viewsCounting.options"
          :responsive-options="viewsCounting.responsiveOptions"
          :key="viewsCounting.data"
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
    name: 'Dashboard',

    data () {
      return {
        isLoading: true,
        selectedId: -1,
        // search:'',
        viewsCounting: {
          data: {
            labels: [],
            series: [],
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
      // this.setupSource()
      AppServices.getFilmList().then(filmList => {
        this.$data.items = filmList
        this.$data.isLoading = false
      })
    },
    mounted () {
      const source = new EventSource('http://125.212.203.148/api/statistic/init')
      let rawData = {}
      source.onopen = function (event) {
        // window.console.log(event)
      }
      source.onmessage = function (event) {
        // window.console.log(event)
        rawData = JSON.parse(event.data)
        // extract data from raw
        window.console.log(rawData)
        this.$data.viewsCounting.data.labels = Object.keys(rawData)
        this.$data.viewsCounting.data.series = Object.values(rawData)
        window.console.log(this.$data.viewsCounting.data)
      }
      source.onerror = function (event) {
        window.console.log(event)
        source.close()
      }
    },
    methods: {
      // setupSource () {
      //   const es = new EventSource('http://125.212.138.107/api/statistic/init')
      //   let rawData = []
      //   es.onmessage = (event) => {
      //     rawData = JSON.parse(event.data)
      //     // extract data from raw
      //     window.console.log(event.data)
      //     this.$data.viewsCounting.data.labels = Object.keys(rawData)
      //     this.$data.viewsCounting.data.series = Object.values(rawData)
      //     window.console.log(this.$data.viewsCounting.data)
      //   }
      //   es.onerror = (event) => {
      //     // if (event.readyState === EventSource.CLOSED) {
      //     //   window.console.log('Event closed')
      //     // }
      //     window.console.log(event)
      //     es.close()
      //   }
      // },
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
