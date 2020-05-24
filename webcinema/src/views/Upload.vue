<template>
    <div class="file">
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <legend>Upload file</legend>
            <div class="form-group">
                <label for="">File</label>
                <input 
                    type="file"  
                    ref="file"
                    @change="onSelect" 
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="message">
                <h5>{{message}}</h5>
            </div>
        </form>
    </div>
</template>
<script>
import { API } from '@/services/api';
export default {
  name: 'Upload',
   data() {
    return {
      file:"",
      message:""
    }
  },
  methods: {
    onSelect(){
     // const allowedTypes = ["text/vtt"];
     // const file = this.$refs.file.files[0];
     // this.file = file;
     // if(!allowedTypes.includes(file.type)){
      //  this.message = "Filetype is wrong!!"
     // }
     return true;
    },
    async onSubmit(){
      const formData = new FormData();
      formData.append('file',this.file);
      try{
        const url = `/films/upload-sub`
        await API.post(url,formData)
        this.message = 'Uploaded!!'
      }
      catch(err){
        console.log(err);
        this.message = err.response.data.error
      }
    }
  }
}
</script>