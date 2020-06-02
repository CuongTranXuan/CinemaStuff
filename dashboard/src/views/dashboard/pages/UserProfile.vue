<template>
  <v-container
    id="user"
    fluid
    tag="section"
  >
    <base-material-card
      color="success"
      class="px-5 py-3"
    >
      <template v-slot:heading>
        <v-row>
          <div class="display-2 font-weight-light">
            Admin/Editor List
          </div>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            @click="openNew"
          >
            Add
          </v-btn>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table
          :key="reRender"
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
    <v-dialog
      v-model="modalToggle"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-if="!newUser"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="selectedItem.id"
                  label="User ID"
                  required
                  disabled
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="selectedItem.username"
                  label="Username"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-if="!newUser"
                  v-model="selectedItem.password"
                  label="Hashed Password"
                />
                <v-text-field
                  v-else
                  v-model="selectedItem.password"
                  type="password"
                  label="Password"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="selectedItem.role"
                  :items="['admin','editor']"
                  label="Role"
                />
              </v-col>
              <v-col
                v-if="!newUser"
                cols="6"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="selectedItem.createdDate"
                  label="Created Date"
                  required
                  disabled
                />
              </v-col>
              <v-col
                v-if="!newUser"
                cols="12"
              >
                <v-text-field
                  v-model="selectedItem.secret"
                  label="OTP Secret"
                  disabled
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="!newUser">
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="modalToggle = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handleDelete"
          >
            Delete
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handleUpdate"
          >
            Save
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="modalToggle = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handleCreate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import AuthServices from '@/services/AuthServices.js'
  export default {
    data () {
      return {
        modalToggle: false,
        isLoading: true,
        reRender: 0,
        selectedItem: {},
        newUser: false,
        headers: [
          {
            sortable: true,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Username',
            value: 'username',
          },
          {
            sortable: true,
            text: 'Hashed Password',
            value: 'password',
          },
          {
            sortable: false,
            text: 'Role',
            value: 'role',
          },
          {
            sortable: false,
            text: 'OTP secret',
            value: 'secret',
          },
          {
            sortable: false,
            text: 'Created Date',
            value: 'createdDate',
          },
        ],
        items: [],
      }
    },
    created () {
      AuthServices.getAll(this.$store.state.user.id).then(userList => {
        this.$data.items = userList
        this.$data.isLoading = false
      })
    },
    methods: {
      rowClick: function (item, row) {
        row.select(true)
        this.newUser = false
        this.selectedItem = item
        this.modalToggle = true
      },
      handleDelete () {
        if (confirm('are you sure to remove this user?')) {
          AuthServices._delete(this.selectedItem.id).then(res => {
            alert(res.data.message)
            this.modalToggle = false
            AuthServices.getAll(this.$store.state.user.id).then(userList => {
              this.$data.items = userList
              this.$data.isLoading = false
              this.reRender += 1
            })
          })
        }
      },
      handleUpdate () {
        if (confirm('Are you sure to save to database?')) {
          AuthServices._update(this.selectedItem.id, this.selectedItem).then(res => {
            alert(res.data.message)
            this.modalToggle = false
            AuthServices.getAll(this.$store.state.user.id).then(userList => {
              this.$data.items = userList
              this.$data.isLoading = false
              this.reRender += 1
            })
          })
        }
      },
      openNew () {
        this.modalToggle = true
        this.newUser = true
        this.selectedItem = {}
      },
      handleCreate () {
        if (confirm('Are you sure to create user?')) {
          AuthServices.create(this.selectedItem).then(res => {
            alert(res.data.message)
            this.modalToggle = false
            AuthServices.getAll(this.$store.state.user.id).then(userList => {
              this.$data.items = userList
              this.$data.isLoading = false
              this.reRender += 1
            })
          })
        }
      },
    },
  }
</script>
