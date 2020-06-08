<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          User
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>User</strong></h3>
      <card>
        <b-container fluid>
          <b-row align-h="between" style="margin-top: 12px;">
            <b-col md="2">
              <router-link :to="{name: 'user-add'}">
                <b-button id ="add_user_button" class="btn btn-primary">
                  <b-row align-h="center">
                    <p style="font-size: 12px">
                      Add User
                    </p>
                    <div style="margin-left: 10px; margin-top: -4px">
                      <img src="@/assets/img/add-circle-icon.png" alt="" width="25px">
                    </div>
                  </b-row>
                </b-button>
              </router-link>
            </b-col>
            <b-col md="10" class="my-1">
              <b-form-group
                label-cols-sm="8"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="User ... "
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

          </b-row>

          <b-table
            show-empty
            :small="true"
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            :borderless="true"
            sort-icon-right
            :sticky-header="true"
            >
            <template v-slot:head(index)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(username)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(role)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(name)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(noHP)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(email)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(edit)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>
            <template v-slot:head(delete)="data">
              <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
            </template>

            <template v-if="currentPage === 1" v-slot:cell(index)="row">
              {{ row.index + 1 }}
            </template>

            <template v-else v-slot:cell(index)="row">
              {{ row.index + 1 + (perPage * (currentPage - 1)) }}
            </template>

            <template v-slot:cell(role)="row">
              <div v-for="(role,index) in row.item.roles" :key="index">
                <span v-if="role != 'ROLE_USER'">{{generateRole(role)}}</span>
              </div>
            </template>

            <template v-slot:cell(edit)="row">
              <router-link :to="{name: 'user-update', params: {username:row.item.username}}">
                <b-button id="view_button" class="btn btn-primary">
                  Edit
                </b-button>
              </router-link>
            </template>

            <template v-slot:cell(delete)="row">
              <button v-b-modal.modal-delete id ="delete_button" class="btn btn-danger" @click="selectUser(row.item)">
                  Delete
              </button>
            </template>
          </b-table>
          <b-row align-h="between">
            <b-col cols="4">
              <div v-if="perPage > users.length" class="my-2">
                <b-card-sub-title>Showing {{ users.length }} of {{ users.length }}</b-card-sub-title>
              </div>
              <div v-else-if="currentPage != 1 && currentPage === Math.ceil(users.length/perPage)" class="my-2">
                <b-card-sub-title>Showing {{ users.length % perPage }} of {{ users.length }}</b-card-sub-title>
              </div>
              <div v-else class="my-2">
                <b-card-sub-title>Showing {{ perPage }} of {{ users.length }}</b-card-sub-title>
              </div>
            </b-col>
            <b-col cols="8">
              <div>
                <b-form-group
                  label="Rows per page:"
                  label-cols="8"
                  label-cols-sm="8"
                  label-cols-md="8"
                  label-cols-xl="10"
                  label-cols-lg="8"
                  label-align="right"
                  label-align-md="right"
                  label-align-sm="right"
                  label-align-lg="right"
                  label-align-xl="right"
                  label-size="sm"
                  label-for="perPageSelect"
                  class="mb-0"
                >
                  <b-form-select
                    v-model="perPage"
                    id="perPageSelect"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div style="margin: 10px 0 0 0;">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="center"
                  size="md"
                  class="my-1"
                  style="margin-left: 0;"
                ></b-pagination>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </card>
    </div>
    <b-modal id="modal-delete" ref="modal-delete" hide-footer centered>
        <template v-slot:modal-title>
            <div class="container">
                <h5 id="modal-title-delete-confirm">Delete User?</h5>
            </div>
        </template>
        <template v-slot:default>
          <div class = "container">
              <div class = "info">
              <b-row>
                  <b-col cols="2" class="modal-icon">
                      <img src="@/assets/img/delete-confirm-icon.png" alt="" width="60px">
                  </b-col>
                  <b-col cols="10">
                      <p id="modal-message">User {{selectedUser.name}} will be deleted.</p>
                  </b-col>
              </b-row>
              </div>
              <b-row>
                  <b-col class="button-confirm-group">
                        <b-button @click="deleteUser()" id ="confirm_delete_button" variant="outline-danger">
                          Yes, delete it
                      </b-button>
                      <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                          Cancel
                      </b-button>
                  </b-col>
              </b-row>
          </div>
      </template>
    </b-modal>

    <b-modal
            id="modal-success"
            ref="modal-success"
            hide-footer
            centered
            v-model="successModal"
            @ok="reload()"
            >
            <template v-slot:modal-title>
                <div class="container">
                <h5 id="modal-title-success">Success!</h5>
                </div>
            </template>
            <template v-slot:default>
                <div class="container">
                <b-row>
                    <b-col class="modal-icon col-2">
                    <img src="@/assets/img/success-icon.png" alt="" width="50px">
                    </b-col>
                    <b-col class="col-10">
                    <p id="modal-message">User {{selectedUser.name}} was successfully deleted.</p>
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-detail-group">
                    <b-button @click="reload()" id="ok-button">
                        OK
                    </b-button>
                </b-row>
            </template>
            <!-- <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                <b-button @click="ok()" id="ok-button" variant="outline-primary">
                    OK
                </b-button>
                </b-col>
            </template> -->
        </b-modal>
  </div>
</template>
<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      users: [],
      fields: [
        { key: 'index', label: 'No'},
        { key: 'username', label: 'Username', sortable: true, },
        { key: 'role', label: 'Role', sortable: true, },
        { key: 'name', label: 'Nama', sortable: true, },
        { key: 'noHP', label: 'No HP', sortable: true, },
        { key: 'email', label: 'Email', sortable: true, },
        { key: 'edit', label: 'Edit', },
        { key: 'delete', label: 'Delete', }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: 'id',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      filterOn: [],
      selectedUser: null,
      successModal: false,
      url_local: 'http://localhost:8080/api/user/',
      url_deploy: 'https://sipola-sixab.herokuapp.com/api/user/'
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    items() {
      this.totalRows = this.users.length;
      return this.users;
    }
  },
  beforeMount() {
    this.getAllUser();
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getAllUser: function(){
      axios.get(this.url_deploy + 'all', { headers: authHeader() })
      .then(response => this.users = response.data.result);
    },
    generateRole(role){
      if(role.name == "ROLE_ADMIN"){
        return "Admin";
      } else if(role.name == "ROLE_DIREKTUR_UTAMA"){
        return "Direktur Utama";
      } else if (role.name == "ROLE_PROJECT_MANAGER"){
        return "Project Manager";
      } else if (role.name == "ROLE_SALES_MARKETING"){
        return "Sales Marketing";
      } else if (role.name == "ROLE_FINANCE"){
        return "Finance";
      } else if (role.name == "ROLE_SERVICE_TEAM"){
        return "Service Team";
      } else if (role.name == "ROLE_LOGISTIK"){
        return "Logistik";
      } else if (role.name == "ROLE_SUPERVISOR"){
        return "Supervisor";
      }
    },
    selectUser(item){
      this.selectedUser = item;
      console.log("SELECTED : " + this.selectedUser.name);
    },
    hideModal(){
        this.$refs['modal-delete'].hide();
    },
    showMessage(status){
        if(status == 200){
            this.successModal = true;
        }
        else{
            this.failedModal = true;
        }
    },
    deleteUser(){
        axios.delete(this.url_deploy + this.selectedUser.username + '/delete', { headers: authHeader() })
        .then(res => {
            this.showMessage(res.data.status)
            console.log(res.data.status)
            this.hideModal()
        });
    },
    reload(){
        window.location.reload()
    },
  }
}
</script>
<style scoped>
#add_user_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 125px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  line-height: 8px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.table{
  font-size: 12px;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

#delete_button{
  background-color: #FF3E1D;
  color:white;
  border-color: transparent;
  font-size: 12px;
  line-height: 8px;
  width: 80px;
  box-shadow: 0px 0px 1px #FF3E1D;
}

.button-confirm-group{
    text-align: right;
    margin-top: 50px;
}

#confirm_delete_button{
  font-size: 12px;
  width: 110px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}

#cancel_delete_button{
  font-size: 12px;
  background-color: #ff3e1d;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}
.button-detail-group{
    float:right;
    margin-top: 50px;
    margin-right: 10px;
}

#modal-title-delete-confirm{
  color: #FF3E1D;
  font-weight: 1000;
  margin-bottom: -4px;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}
#modal-message{
  font-size: 16px;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
}
</style>
