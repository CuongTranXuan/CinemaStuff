<template>
  <div>
    <h2 class="title">
      <font-awesome-icon 
        icon="film" 
        size="1x" />&nbsp;
      Top 10 rated Movies
    </h2>
    <ItemList :results="resultsMovie" type="movie" @item-clicked="viewDetailInfo" />
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue';
import AppServices from '@/services/AppServices';
import { viewDetailMixin } from '@/mixins/viewDetailMixin';

export default {
  name: 'TopsView',
  mixins: [viewDetailMixin],
  components: {
    ItemList
  },
  data() {
    return {
      numItems: 10,
      resultsMovie: [],
      loading: true
    };
  },
  created() {
    this.fetchTops();
  },
  methods: {
    async fetchTops() {
      try {
        const [responseMovie] = await Promise.all([
          AppServices.getTop()
        ]);
        // this.resultsMovie = responseMovie.data.results.slice(0, this.numItems);
        this.resultsMovie = responseMovie.data
        this.resultsMovie.type = "movie"
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>