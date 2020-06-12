import { API } from '@/services/api';


export default {

  getItemInfo(id){
    const url = `/films/${id}`
    return API.get(url)
  },
  getTop() {
    const url = `/films`
    return API.get(url);
  },
  getMoviesUpcoming(){
    const url = `/films`
    return API.get(url);
  },
  startPlay(id){
    const url = `/statistic/play/${id}`
    return API.get(url)
  },
  endPlay(id) {
    const url = `/statistic/end/${id}`
    return API.get(url)
  }
};
