<template>
  <v-content>
    <v-card raised>
      <v-card-title>Scan this QR code with Google Authenticator app</v-card-title>
      <v-alert
        :color="color"
        :value="alert"
        :type="type"
      >
        {{ authMessage }}
      </v-alert>
      <br>
      <img :src="`${qrCode}`">
      <br>
      <v-card-actions>
        <v-spacer />
        <v-row>
          <v-col>
            Enter the code
          </v-col>
          <v-col>
            <v-text-field
              v-model="code"
              outlined
              dense
              label="Code"
            />
          </v-col>
          <v-col>
            <v-btn
              class="mr-0"
              color="green"
              dark
              @click="Validate()"
            >
              Authenticate
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-content>
</template>
<script>
  import AuthServices from '@/services/AuthServices.js'
  export default {
    name: 'QRcode',
    data () {
      return {
        authMessage: '',
        qrCode: '',
        code: '',
        color: '',
        alert: false,
        type: 'info',
      }
    },
    created: function () {
      if (this.$store.state.status.loggedIn === false) {
        this.$router.push('/login')
      } else {
        AuthServices.getQRcode(this.$store.state.user.username).then((response) => {
          this.$data.message = response.data.message
          if (this.$data.message) {
            this.$data.qrCode = response.data.qrcode
          }
        })
      }
    },
    methods: {
      ShowError (message) {
        this.alert = true
        this.authMessage = message
        this.color = 'red'
        this.type = 'error'
      },
      ShowSuccess (message) {
        this.alert = true
        this.authMessage = message
        this.color = 'green'
        this.type = 'success'
      },
      Validate () {
        alert('we good')
      },
    },
  }
</script>
