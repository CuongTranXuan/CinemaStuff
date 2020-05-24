
export const viewDetailMixin = {
  methods: {
    viewDetailInfo(id, type) {
      try {
        this.$store.dispatch('getItem', { id, type });
        this.$router.push({path: `/movies/${id}`});
        // this.$emit('open-modal')
      } catch (e) {
        this.error = e;
      }
    }
  }
};
