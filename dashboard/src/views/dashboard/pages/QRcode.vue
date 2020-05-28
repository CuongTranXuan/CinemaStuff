<template>
    <v-content>
        <v-card raised>
            <v-card-title>Scan this QR code with Google Authenticator app</v-card-title>
            <v-alert :color="color" :value="alert" :type="type">
                {{ authMessage }}
            </v-alert>
            <br>
            <qrcode-vue v-if="qrCode !== null" :value="this.qrCode" size="200" level="M"></qrcode-vue>
            <br>
            <v-card-actions>
                <v-spacer/>
                <v-row>
                    <v-col>
                     Enter the code
                    </v-col>
                    <v-col>
                        <v-text-field v-model="code" outlined dense label="Code"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn class="mr-0" color="green" @click="Validate()" dark>
                                Login
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-content>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
    name: "QRcode",
    components: {
        QrcodeVue
    },
    data() {
        return {
            authMessage: '',
            qrCode: null,
            code: '',
            color: '',
            alert: false,
            type: 'info'
        }
    },
    methods: {
        ShowError(message) {
            this.alert = true
            this.authMessage=message
            this.color='red'
            this.type='error'
        },
        ShowSuccess(message)
        {
            this.alert = true
            this.authMessage=message
            this.color='green'
            this.type='success'
        },
        Validate(){
            alert("we good")
        }
    }
}
</script>