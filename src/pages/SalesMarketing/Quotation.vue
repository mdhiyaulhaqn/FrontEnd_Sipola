<template>
    <div class="row">
      <div class="col-12">
        <card>
          <button id ="add_quotation_button" class="btn btn-primary">
            Add Quotation
            <span class="ti-plus"></span>
          </button>
          <div slot="raw-content" class="table-responsive">
            <b-table 
                :items="quotations"
                :fields="fields"
                :per-page="akuntable.perPage" 
                :current-page="akuntable.currentPage"
                :sort-by.sync="akuntable.sortBy"
                :sort-desc.sync="akuntable.sortDesc"
                :keyword="keyword">

                <template slot="id" slot-scope="data">
                    {{ data.item.id}}
                </template>

                <template slot="noQuotation" slot-scope="data">
                    {{ data.item.noQuotation }}
                </template>

                <template slot="createdAt" slot-scope="data">
                    {{ data.item.createdAt}}
                </template>
                
                <template slot="createdBy" slot-scope="data">
                    {{ data.item.createdBy}}
                </template>

                <template slot="view" slot-scope="data">
                    <router-link :to="{ name: 'detail-quotation', params: {id:data.item.id}}">
                        <b-button>
                          view
                        </b-button>
                    </router-link>
                </template>
            </b-table>

            <b-pagination
              v-model="akuntable.currentPage"
              :total-rows="quotations.length"
              :per-page="akuntable.perPage"
              aria-controls="myTable"/>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import { PaperTable } from "@/components";
import axios from 'axios';

const tableColumns = ["No", "Quotation No", "Company Name", "Total Works", "Total Price", "Date", "Action"];
const tableData = [
  {
    no: 1,
    'quotation no': "QS 14/12/094",
    'company name': "PT PLN Indonesia",
    'total works' : '2',
    'total price' : '40000000',
    'date' : '24 Februari 2020',
    'action' : 'view',
  },
  {
     no: 2,
    'quotation no': "QS 18/39/217",
    'company name': "PT Boveri Indonesia",
    'total works' : '3',
    'total price' : '30000000',
    'date' : '30 Agustus 2020',
    'action' : 'view',
  },
  {
     no: 3,
    'quotation no': "QS 39/19/772",
    'company name': "PT SixAB Tehnik Industri",
    'total works' : '7',
    'total price' : '28000000',
    'date' : '10 Februari 2020',
    'action' : 'view',
  },
  {
     no: 4,
    'quotation no': "QS 34/14/094",
    'company name': "PT Sejahtera Makmur",
    'total works' : '4',
    'total price' : '90000000',
    'date' : '24 Maret 2020',
    'action' : 'view',
  },
  {
     no: 5,
    'quotation no': "QS 14/32/004",
    'company name': "PT PLN Indonesia",
    'total works' : '5',
    'total price' : '13200000',
    'date' : '15 Desember 2020',
    'action' : 'view',
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      akuntable : {
          currentPage : 1,
          perPage : 5,
          sortDesc : false,
          sortBy : "id",
      },
      fields: [
          {key: 'id', label: 'Id', sortable: true},
          {key: 'noQuotation', label: 'No Quotation', sortable:true},
          {key: 'createdBy', label: 'Created By', sortable:true},
          {key: 'createdAt', label: 'Created At', sortable:true},
          {key: 'view'},
      ],
      quotations :[],
      keyword :'',
      table1: {
        title: "Quotation List",
        subTitle: "",
        columns: [...tableColumns],
        data: [...tableData]
      },
    };
  },
   computed: {
      items() {
          return this.invoices
      },
  },

  beforeMount(){
      this.getAllQuotation();
  },
  methods:{
      getAllQuotation: function(){
          axios.get('http://localhost:8080/api/quotation/all')
          .then(result => this.quotations = result.data)
          .then(console.log(res))
          .catch(err => this.quotations = err.data.result);
      },
      clear(){
          this.keyword = '';
      },
  }
};
</script>
<style>
#add_quotation_button{
  background-color: #109CF1;
  color:white;
  border-color: white;
}
</style>
