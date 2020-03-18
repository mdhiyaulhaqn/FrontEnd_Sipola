<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Quotation</strong></h3>
      <card>
        <button id ="add_quotation_button" class="btn btn-primary">
          Add Quotation
          <span class="ti-plus"></span>
        </button>
        <!-- <div slot="raw-content" class="table-responsive"> -->
          <!-- <b-table :items="table1.data">
            <template slot="noQuotation" slot-scope="data">
              {{ data.item.noQuotation }}
            </template>
          </b-table> -->
          <template>
            <mdb-datatable
              :data="data"
              striped
              responsive
            />
            
          </template>
        <!-- </div> -->
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import { mdbDatatable } from 'mdbvue';
import axios from 'axios';

// const tableColumns = ["No", "Quotation No", "Company Name", "Total Works", "Total Price", "Date", "Action"];
const tableColumns = [
            {
              label: 'No',
              field: 'no',
              sort: 'asc'
            },
            {
              label: 'Quotation No',
              field: 'quotation no',
              sort: 'asc'
            },
            {
              label: 'Company Name',
              field: 'company name',
              sort: 'asc'
            },
            {
              label: 'Total Works',
              field: 'total works',
              sort: 'asc'
            },
            {
              label: 'Total Price',
              field: 'total price',
              sort: 'asc'
            },
            {
              label: 'Date',
              field: 'date',
              sort: 'asc'
            },
            {
              label: 'Action',
              field: 'action',
              sort: 'asc'
            },
          ];

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
  name: 'DatatablePage',
  components: {
    PaperTable,
    mdbDatatable
  },
  // data() {
  //   return {
  //     quotations :[],
  //     table1: {
  //       title: "Quotation List",
  //       subTitle: "",
  //       columns: [...tableColumns],
  //       data: [...tableData]
  //     },
  //   };
  // },
  data() {
    return {
      data: {
        title: "Quotation List",
        subTitle: "",
        columns: [...tableColumns],
        rows: [...tableData]
      }
    }
  },
   computed: {
      items() {
          return this.quotations
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
  border-color: transparent;
  font-size: 10px;
  width: 136px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
    text-align: center;
    color: black;
    margin: 5px 0 24px 0;
}
</style>
