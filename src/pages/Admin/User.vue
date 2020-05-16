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
          <b-row align-h="between">
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
                    placeholder="user ... "
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
            sort-icon-left
            :sticky-header="true"
            >

            <template v-slot:cell(id)="row">
              {{items.indexOf(row.item) + 1}}
            </template>

            <template v-slot:cell(role)="row">
              <div v-for="(role,index) in row.item.roles" :key="index">
                <span id="role" v-if="role != 'ROLE_USER'">{{generateRole(role)}}</span>
              </div>
            </template>

            <template v-slot:cell(date)="row">
              {{ row.item.date | moment("ll") }}
            </template>

            <template v-slot:cell(action)="row">
              <router-link :to="{name: 'detail-daily-activity-report', params: {id:row.item.id}}">
                <b-button id="view_button" class="btn btn-primary">
                  View
                </b-button>
              </router-link>
            </template>
          </b-table>
          <b-row align-h="between">
            <b-col cols="4">
              <div v-if="perPage > users.length" class="my-2">
                <b-card-sub-title>Showing {{ users.length }} of {{ users.length }}</b-card-sub-title>
              </div>
              <div v-else-if="currentPage != 1" class="my-2">
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
      </card>
    </div>
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
        { key: 'id', label: 'No', sortable: false, },
        { key: 'username', label: 'Username', sortable: true, },
        { key: 'role', label: 'Role', sortable: true, },
        { key: 'name', label: 'Nama', sortable: true, },
        { key: 'noHP', label: 'No HP', sortable: true, },
        { key: 'email', label: 'Email', sortable: true, },
        { key: 'update', label: 'Update', },
        { key: 'delete', label: 'Delete', }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
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
      axios.get('http://localhost:8080/api/user/all', { headers: authHeader() })
      .then(response => this.users = response.data.result);
    },
    generateRole(role){
      console.log("ROLES HEHE : " +  role.name);
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
    }
  }
}
</script>
<style scoped>
#add_user_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 136px;
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
  margin: 5px 0 24px 0;
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
#role{
  font-size: 12px;
}
</style>
