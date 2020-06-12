import Vue from 'vue';
import Vuex from 'vuex';
import AppServices from '@/services/AppServices';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    itemInfo: {}
  },
  plugins: [createPersistedState()],
  getters: {
  },

  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      state.baseUrl = baseUrl;
    },
    RESET_ITEM: state => {
      Vue.set(state, 'itemInfo', {});
    },
    LOAD_ITEM: (state, { type, info }) => {
      const itemInfo = {
        type: 'movie',
        title: type == 'movie' ? info.title : info.name,
        year: type == 'movie' ? info.release_date : info.first_air_date,
        overview: info.overview,
        adult: info.adult,
        poster_link: info.poster_link,
        trailer_link: info.trailer_link,
        vote_average: info.vote_average,
        video_link: info.video_link,
        id: info.id
      };
      Vue.set(state, 'itemInfo', itemInfo);
    }
  },

  actions: {
    getItem: async ({ commit }, { id, type }) => {
      commit('RESET_ITEM');
      const [response] = await Promise.all([
        AppServices.getItemInfo(id),
        // AppServices.getCast(id, type)
      ]);

      commit('LOAD_ITEM', {
        type,
        info: response.data,
        // cast: responseCast.data.cast
      });
    }
  }
});
