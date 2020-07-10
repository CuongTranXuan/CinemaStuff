<template>
  <v-content>
    <div class="login-wrapper">
      <div class="login-left">
        <img
          height="80%"
          src="https://tapchicoin24h.com/wp-content/uploads/2019/06/meme-doge.jpg"
        >
      </div>
      <form
        class="login-right"
        @submit.prevent
      >
        <div class="h2">
          Login
        </div>
        <div class="form-group">
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Username"
          >
        </div>
        <div class="form-group">
          <input
            id="Password"
            v-model="password"
            type="password"
            placeholder="Password"
          >
        </div>
        <div>
          <v-btn
            color="primary"
            dark
            dense
            @click.stop="handleLogin"
            @keyup.enter="handleLogin"
          >
            login
          </v-btn>
        </div>
        <!--************************************************ Support OTP ******************************************** -->
        <v-dialog
          v-model="OTPcheck"
          width="50%"
        >
          <v-card v-if="OTPenabled">
            <v-card-title>
              <span class="headline">OTP code</span>
            </v-card-title>
            <v-container>
              <img :src="`${qrCode}`">
            </v-container>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="code"
                    label="OTP code"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="info darken-1"
                dense
                @click="resetQRcode"
              >
                Reset QR
              </v-btn>
              <v-btn
                color="green darken-1"
                dense
                @click="handleAuthenticate"
                @keyup.enter="handleAuthenticate"
              >
                Authenticate
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title>
              <span class="headline">Scan by Google Authenticate</span>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                <v-col>
                  <img :src="`${qrCode}`">
                </v-col>
              </v-row>
            </v-container>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="code"
                    label="OTP code"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green darken-1"
                dense
                @click="handleAuthenticate"
              >
                Authenticate
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </form>
    </div>
  </v-content>
</template>
<script>
  import AuthServices from '@/services/AuthServices.js'
  export default {
    name: 'LoginForm',
    data () {
      return {
        username: '',
        password: '', // not really need to encrypt it in client, but should send it via https
        code: '',
        OTPenabled: false, // scan QR or use code to login
        OTPcheck: false,
        qrCode: '',
      }
    },
    computed: {
      loggedIn () {
        return this.$store.state.status.loggedIn
      },
    },
    created () {
      if (this.loggedIn) {
        this.$router.push('/')
      }
    },
    beforeMount () {
      let init = 1000
      setTimeout(function () {
        document.querySelector('.login-wrapper').classList.toggle('open')
        init = 500
      }, init)
    },
    methods: {
      handleLogin () {
        const username = this.$data.username
        const password = this.$data.password
        this.$store.dispatch('login', { username, password })
          .then(() => {
            if (this.$store.state.user.requireQR === false) {
              this.$data.OTPenabled = true
              AuthServices.getQRcode(this.$store.state.user.id).then(res => {
                this.$data.qrCode = res.data
              })
            } else {
              AuthServices.createQRcode(this.$data.username).then((response) => {
                if (response.data.message) {
                  this.$data.qrCode = response.data.qrcode
                }
              })
            }
            this.$data.OTPcheck = true
          })
          .catch(err => {
            window.console.log(err)
            alert('login failed, check your username and password')
          })
      },
      handleAuthenticate () {
        AuthServices.verifyOTP(this.$data.username, this.$data.code).then(res => {
          if (res.data.authenticated) {
            this.$store.commit('authenticateSuccess')
            localStorage.setItem('authenticated', true)
            this.$router.push('/')
          } else {
            this.$store.commit('authenticateFailure')
            localStorage.setItem('authenticated', false)
            alert('Your OTP is not match')
          }
        })
      },
      resetQRcode () {
        if (confirm('Are you sure to reset QR code, which means every devices logged in will be logged out?')) {
          AuthServices.createQRcode(this.$data.username).then((response) => {
            if (response.data.message) {
              this.$data.qrCode = response.data.qrcode
            }
          })
        }
      },
      register () {
        alert('Coming soon ...')
      },
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#sandbox {
  font-family: "Lato", sans-serif;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row-reverse;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background: linear-gradient(243.87deg, #22bf64 30.6%, #371933 130.6%);
  overflow: hidden;
}
input {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  font-size: 16px;
  color: #000;
  border-radius: 0;
  border-bottom: 0;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #aaaaaa;
}
button,
input:focus {
  outline: 0;
}
::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.00933333em;
}
.form-group {
  position: relative;
  padding-top: 15px;
  margin-top: 10px;
}
.v-btn{
  margin: 10%;
  width: 150px;
}
.h1 {
  color: #fff;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2405em;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  text-align: center;
  cursor: pointer;
  position: absolute;
  transform: translateY(-10px);
}
.open .h1 {
  -webkit-transform: translateX(200px) translateZ(0) translateY(-10px);
  transform: translateX(200px) translateZ(0) translateY(-10px);
}
.h2 {
  color: #000;
  font-size: 20px;
  letter-spacing: -0.00933333em;
  font-weight: 600;
  padding-bottom: 15px;
}
.login-wrapper {
  width: 800px;
  height: 440px;
  background-color: #fff;
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  overflow: hidden;
}
.login-left img {
  display: block;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  object-position: left;
}
.open .login-left img {
  -webkit-transform: translateX(210px) translateZ(0);
  transform: translateX(210px) translateZ(0);
}
.open .login-left {
  -webkit-transform: translateX(-400px) translateZ(0);
  transform: translateX(-400px) translateZ(0);
}
.login-right {
  padding: 40px;
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  -webkit-transform: translateX(400px) translateZ(0);
  transform: translateX(400px) translateZ(0);
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
}
.open .login-right {
  -webkit-transform: translateX(0px) translateZ(0);
  transform: translateX(0px) translateZ(0);
}
.button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.btn {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  height: 40px;
  display: flex;
  padding: 0 35px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: -0.00933333em;
}
.btn-primary {
  color: #fff;
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
}
.btn-primary:hover,
.btn-primary:focus {
  color: #fff;
  background: linear
}
</style>
