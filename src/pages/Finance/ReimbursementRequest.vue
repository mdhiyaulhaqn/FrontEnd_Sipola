<template>
    <div class="row">
      <div class="col-12">
        <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Reimbursement Request
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Reimbursement Request</strong></h3>
        <card>
          <b-container fluid>
          <!-- User Interface controls -->
          <b-row align-h="between" style="margin-top: 12px;">
            <b-col md="12" class="my-1">
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
                    placeholder="Project, Requester, Date"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

          </b-row>

          <!-- Main table element -->
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

            <template v-slot:head(no)="data">
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

            <template v-slot:cell(index)="row">
                {{ row.index + 1}}
            </template>

            <template v-slot:cell(createdAt)="row">
                {{row.item.createdAt| moment("ll") }}
            </template>

             <template v-slot:cell(totalReimburse)="row">
                    {{row.item.totalReimburse | currency}}
                </template>

            <template v-slot:cell(statusReimburse)="row">
                    <b-badge  v-if="row.item.statusReimburse === 2" pill variant="info" size=sm id ="status_reimbursement">
                      Not reviewed
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 3" pill variant="success" size=sm id ="status_reimbursement">
                      Accepted
                    </b-badge>
                    <b-badge v-if="row.item.statusReimburse === 4" size=sm id ="status_reimbursement" style="background-color:#F89133; color:black">
                      On Revision</b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 5" pill variant="danger" size=sm id ="status_reimbursement">
                      Rejected
                    </b-badge>
            </template>

            <template v-slot:cell(action)="row">
              <router-link :to="{name: 'detail-request', params: {id:row.item.id}}">
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
              <div v-else-if="currentPage != 1" class="my-2">
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
import DataTable from 'v-data-table'

export default {

  data() {
    return {
        fields: [
          {key: 'index', label: 'No'},
          {key: 'projectName', label: 'Project Description', sortable: true},
          {key: 'totalReimburse', label: 'Total (IDR)', sortable:true},
          {key: 'createdBy', label: 'Created By', sortable:true},
          {key: 'statusReimburse', label: 'Status', sortable:true},
          {key: 'action', label: 'Action', sortable:true},
        ],
        reimbursement :[],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 25, 50, 100],
        sortBy: 'id',
        sortDesc: true,
        sortDirection: 'desc',
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
      this.totalRows = this.reimbursement.length;
      return this.reimbursement;
    }
  },

  beforeMount(){
      this.getAllReimbursement();
  },

  methods:{
        getAllReimbursement: function(){
            axios.get('http://localhost:8080/api/reimbursement/all/request')
            .then(result => this.reimbursement = result.data.result);
        },

        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
      
    }
};
</script>
<style>
.table{
  font-size: 12px;
}
#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  line-height: 10px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
    text-align: center;
    color: black;
    margin: 5px 0 24px 0;
}
.pagination{
  margin-left:20px;
}
#breadcrumb{
    font-size: 12px;
    /* text-decoration: underline; */
    margin: -35px 0 -5px -15px;
    color: #FF3E1D;
    background: none;
}

</style>
