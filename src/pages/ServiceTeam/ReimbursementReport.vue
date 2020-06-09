<template>
    <div class="row">
      <div class="col-12">
        <template>
          <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item active>
              Reimbursement Report
            </b-breadcrumb-item>
          </b-breadcrumb>
        </template>
        <h3 class="judul"><strong>Reimbursement Report</strong></h3>
        <card>

          <b-container fluid>
          <!-- User Interface controls -->
          <b-row align-h="between" style="margin-top: 12px;">
            <b-col md="2">
              <router-link :to="{name: 'add-reimbursement'}">
                <b-button id ="add_reimbursement_button" class="btn btn-primary">
                  <b-row align-h="center">
                  <p style="font-size: 12px">
                    Add Reimbursement Report
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
                    placeholder="Project Name, Total"
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
                <template v-slot:head(projectName)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(totalReimburse)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(createdAt)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(statusReimburse)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>
                <template v-slot:head(action)="data">
                  <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                </template>

                <template v-if="currentPage === 1" v-slot:cell(index)="row">
                  {{ row.index + 1 }}
                </template>

                <template v-else v-slot:cell(index)="row">
                  {{ row.index + 1 + (perPage * (currentPage - 1)) }}
                </template>

                <template v-slot:cell(createdAt)="row">
                    {{row.item.createdAt.slice(0, 19) | moment('ll') }}
                </template>

                <template v-slot:cell(totalReimburse)="row">
                    {{row.item.totalReimburse | currency}}
                </template>

                <template v-slot:cell(statusReimburse)="row">
                    <b-badge  v-if="row.item.statusReimburse === 1" pill variant="info" size=md id ="status_reimbursement">
                      On Progress <i class="fas fa-spinner"></i>
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 2" pill variant="warning" size=md id ="status_reimbursement">
                      Sent <i class="fas fa-paper-plane"></i>
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 3" pill variant="success" size=md id ="status_reimbursement">
                      Accepted <i class="fas fa-check"></i>
                    </b-badge>
                    <b-badge v-if="row.item.statusReimburse === 4" size=md id ="status_reimbursement" style="background-color:#F89133; color:black">
                      On Revision <i class="fas fa-wrench"></i>
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 5" pill variant="danger" size=md id ="status_reimbursement">
                      Rejected <i class="fas fa-times"></i>
                    </b-badge>
                </template>

                <template v-slot:cell(action)="row">
                  <router-link :to="{name: 'detail-reimbursement', params: {id:row.item.id}}">
                    <b-button id="view_button" class="btn btn-primary">
                      View
                    </b-button>
                  </router-link>
                </template>

            </b-table>

            <b-row align-h="between">
            <b-col cols="4">
              <div v-if="perPage > reimbursement.length" class="my-2">
                <b-card-sub-title>Showing {{ reimbursement.length }} of {{ reimbursement.length }}</b-card-sub-title>
              </div>
              <div v-else-if="currentPage != 1 && currentPage === Math.ceil(reimbursement.length/perPage)" class="my-2">
                <b-card-sub-title>Showing {{ reimbursement.length % perPage }} of {{ reimbursement.length }}</b-card-sub-title>
              </div>
              <div v-else class="my-2">
                <b-card-sub-title>Showing {{ perPage }} of {{ reimbursement.length }}</b-card-sub-title>
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


  </div>
</template>
<script>
import axios from 'axios';
import DataTable from 'v-data-table';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      reimbursement : [],
      unfilteredReimbursement: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: 'id',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      filterOn: [],
      fields: [
          {key: 'index', label: 'No'},
          {key: 'projectName', label: 'Description', sortable: true},
          {key: 'totalReimburse', label: 'Total (IDR)', sortable:true},
          {key: 'createdAt', label: 'Date Created', sortable:true},
          {key: 'statusReimburse', label: 'Status', sortable:true},
          {key: 'action', label: 'Action'},
      ],
      url_local: "http://localhost:8080/api/reimbursement/",
      url_deploy: "https://sipola-sixab.herokuapp.com/api/reimbursement/",
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
        this.totalRows = this.reimbursement.length;
        return this.reimbursement;
      }
  },

  beforeMount(){
      this.getAllReimbursement();
      this.filterUser();
  },
  methods:{
      onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      },

      getAllReimbursement: function(){
          axios.get(this.url_deploy + 'all', { headers: authHeader() })
          .then(result => {this.unfilteredReimbursement = result.data.result, this.filterUser()});

      },
      currentUser() {
          return this.$store.state.auth.user;
      },

      filterUser() {
        for (let i = 0; i < this.unfilteredReimbursement.length; i++){
          if (this.unfilteredReimbursement[i].createdBy == this.currentUser().name) {
            this.reimbursement.push(this.unfilteredReimbursement[i])
          }
        }
      },
  }
};
</script>
<style scoped>

.pagination{
  margin-left:20px;
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

#add_reimbursement_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  width: 220px;
  height: 36px;
  margin-bottom: 4px;
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
</style>
