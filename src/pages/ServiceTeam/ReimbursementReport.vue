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
                  <div style="margin-left: 10px; margin-top: -3px">
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
                    placeholder="Project Name, Date"
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
                
                <template v-slot:cell(no)="row">
                   {{items.indexOf(row.item) + 1}}
                </template>

                <template v-slot:cell(createdAt)="row">
                    {{row.item.createdAt | moment("ll") }}
                </template>

                <template v-slot:cell(totalReimburse)="row">
                    {{row.item.totalReimburse | currency}}
                </template>
                
                <template v-slot:cell(statusReimburse)="row">
                    <b-badge  v-if="row.item.statusReimburse === 1" pill variant="info" size=sm id ="status_reimbursement">
                      On Progress
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 2" pill variant="warning" size=sm id ="status_reimbursement">
                      Sent
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
                  <router-link :to="{name: 'detail-reimbursement', params: {id:row.item.id}}">
                    <b-button id="view_button" class="btn btn-primary">
                      View
                    </b-button>
                  </router-link>
                </template>

            </b-table>

            <b-row align-h="end">
            <b-col md="3" class="my-1">
              <b-form-group
                label="Rows per page:"
                label-cols-sm="7"
                label-align-sm="right"
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
            </b-col>
            <b-col md="3" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
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
      reimbursement : [],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      fields: [
          {key: 'No', label: 'No', sortable: true},
          {key: 'projectName', label: 'Description', sortable: true},
          {key: 'totalReimburse', label: 'Total (IDR)', sortable:true},
          {key: 'createdAt', label: 'Date', sortable:true},
          {key: 'statusReimburse', label: 'Status', sortable:true},
          {key: 'action', label: 'Action'},
      ],
      
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
      onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      },

      getAllReimbursement: function(){
          axios.get('http://localhost:8080/api/reimbursement/all')
          .then(result => this.reimbursement = result.data.result);
      },
  }
};
</script>
<style>

.pagination{
  margin-left:20px;
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
</style>
