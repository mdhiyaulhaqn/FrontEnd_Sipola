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
          <b-row>
           <router-link :to="{name: 'add-reimbursement'}">
            <button id ="add_reimbursement_button" class="btn btn-primary">
              Add Reimbursement Report
              <span class="ti-plus"></span>
            </button>
          </router-link>
          </b-row>
                 
          <div slot="raw-content" class="table-responsive">     
            <b-table 
                responsive
                :items="items"
                :fields="fields"
                :per-page="akuntable.perPage" 
                :current-page="akuntable.currentPage"
                :sort-by.sync="akuntable.sortBy"
                :sort-desc.sync="akuntable.sortDesc">
                
                <template v-slot:cell(no)="row">
                   {{items.indexOf(row.item) + 1}}
                </template>

                <template v-slot:cell(createdAt)="row">
                    {{row.item.createdAt.split("T")[0].split("-").reverse().join('-') }}
                </template>
                
                <template v-slot:cell(statusReimburse)="row">
                    <b-badge  v-if="row.item.statusReimburse === 'On Progress'" pill variant="warning" size=sm id ="status_reimbursement">
                      {{row.item.statusReimburse}}
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 'Rejected'" pill variant="danger" size=sm id ="status_reimbursement">
                      {{row.item.statusReimburse}}
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 'Accepted'" pill variant="success" size=sm id ="status_reimbursement">
                      {{row.item.statusReimburse}}
                    </b-badge>
                    <b-badge  v-if="row.item.statusReimburse === 'Sent'" pill variant="info" size=sm id ="status_reimbursement">
                      {{row.item.statusReimburse}}
                    </b-badge>
                </template>

                <!-- <template v-slot:cell(statusReimburse)="row" v-if="statusReimburse === 'On Progress'">
                    <badge pill variant="warning" size=sm id ="status_reimbursement">
                      {{row.item.statusReimburse}}
                    </badge>
                </template> -->

                <template v-slot:cell(Action)="row">
                    <router-link :to="{name: 'detail-reimbursement', params: {id:row.item.id}}">
                        <b-button id ="add_reimbursement_button">
                          view
                        </b-button>
                    </router-link>
                </template>
            </b-table>

            <b-pagination class="pagination"
              v-model="akuntable.currentPage"
              :total-rows="reimbursement.length"
              :per-page="akuntable.perPage"
              aria-controls="myTable"/>
          </div>
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
      akuntable : { 
          currentPage : 1,
          perPage : 5,
          sortDesc : false,
      },
      
      fields: [
          {key: 'No', label: 'No', sortable: true},
          {key: 'projectName', label: 'Description', sortable: true},
          {key: 'totalReimburse', label: 'Total', sortable:true},
          {key: 'createdAt', label: 'Date', sortable:true},
          {key: 'statusReimburse', label: 'Status', sortable:true},
          'Action'
      ],
      
      keyword :'',
    }
  },
   computed: {
      items() {
          return this.reimbursement;
      },
  },

  beforeMount(){
      this.getAllReimbursement();
      this.test();
  },
  methods:{
      getAllReimbursement: function(){
          axios.get('http://localhost:8080/api/reimbursement/all')
          .then(result => this.reimbursement = result.data.result);
          console.log('masuk')
          console.log(reimbursement)
          console.log(statusReimburse)
      },
      clear(){
          this.keyword = '';
      },
  }
};
</script>
<style>
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

#add_reimbursement_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  margin-bottom: 4px;
  margin-left:20px;
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
