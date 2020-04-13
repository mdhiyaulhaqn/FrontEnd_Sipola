<template>
    <div class="row">
      <div class="col-12">
        <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Quotation
        </b-breadcrumb-item>
      </b-breadcrumb>
        <card>
          <b-row>
           <router-link :to="{name: 'add-quotation'}">
            <button id ="add_quotation_button" class="btn btn-primary">
              Add Quotation
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

                <template v-slot:cell(id)="row">
                   {{items.indexOf(row.item) + 1}}
                </template>

                <template v-slot:cell(date)="row">
                    {{row.item.date.split("T")[0].split("-").reverse().join('-') }}
                </template>
<!--
                 <template v-slot:cell(total_price) = "row">
                    {{row.item.service[1].harga}}
                </template> -->

                <template v-slot:cell(Lihat)="row">
                    <router-link :to="{name: 'detail-quotation', params: {id:row.item.id}}">
                        <b-button id ="add_quotation_button">
                          view
                        </b-button>
                    </router-link>
                </template>
            </b-table>

            <b-pagination class="pagination"
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
import axios from 'axios';
import DataTable from 'v-data-table'

// const tableColumns = ["No", "Quotation No", "Company Name", "Total Works", "Total Price", "Date", "Action"];
// const tableColumns = [
//             {
//               label: 'No',
//               field: 'no',
//               sort: 'asc'
//             },
//             {
//               label: 'Quotation No',
//               field: 'quotation no',
//               sort: 'asc'
//             },
//             {
//               label: 'Company Name',
//               field: 'company name',
//               sort: 'asc'
//             },
//             {
//               label: 'Total Works',
//               field: 'total works',
//               sort: 'asc'
//             },
//             {
//               label: 'Total Price',
//               field: 'total price',
//               sort: 'asc'
//             },
//             {
//               label: 'Date',
//               field: 'date',
//               sort: 'asc'
//             },
//             {
//               label: 'Action',
//               field: 'action',
//               sort: 'asc'
//             },
//           ];

// const tableData = [
//   {
//     no: 1,
//     'quotation no': "QS 14/12/094",
//     'company name': "PT PLN Indonesia",
//     'total works' : '2',
//     'total price' : '40000000',
//     'date' : '24 Februari 2020',
//     'action' : 'view',
//   },
//   {
//      no: 2,
//     'quotation no': "QS 18/39/217",
//     'company name': "PT Boveri Indonesia",
//     'total works' : '3',
//     'total price' : '30000000',
//     'date' : '30 Agustus 2020',
//     'action' : 'view',
//   },
//   {
//      no: 3,
//     'quotation no': "QS 39/19/772",
//     'company name': "PT SixAB Tehnik Industri",
//     'total works' : '7',
//     'total price' : '28000000',
//     'date' : '10 Februari 2020',
//     'action' : 'view',
//   },
//   {
//      no: 4,
//     'quotation no': "QS 34/14/094",
//     'company name': "PT Sejahtera Makmur",
//     'total works' : '4',
//     'total price' : '90000000',
//     'date' : '24 Maret 2020',
//     'action' : 'view',
//   },
//   {
//      no: 5,
//     'quotation no': "QS 14/32/004",
//     'company name': "PT PLN Indonesia",
//     'total works' : '5',
//     'total price' : '13200000',
//     'date' : '15 Desember 2020',
//     'action' : 'view',
//   }
// ];

export default {
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
      akuntable : {
          currentPage : 1,
          perPage : 5,
          sortDesc : false,
      },

      fields: [
          {key: 'id', label: 'Id', sortable: true},
          {key: 'noQuotation', label: 'No Quotation', sortable: true},
          {key: 'company.nama', label: 'Company Nama', sortable:true},
          {key: 'service.length', label: 'Total Works', sortable:true},
          // 'total_price',
          {key: 'date', label: 'Date', sortable:true},
          'Lihat'
      ],
      quotations :[],
      quotations_total_price : [],
      keyword :'',
      // table1: {
      //   title: "Quotation List",
      //   subTitle: "",
      //   columns: [...tableColumns],
      //   rows: [...tableData]
      // }
    }
  },
   computed: {
      items() {
          return this.quotations;
      },
  },

  beforeMount(){
      this.getAllQuotation();
  },

  methods:{
      getAllQuotation: function(){
          axios.get('http://localhost:8080/api/quotation/all')
          .then(result => this.quotations = result.data.result);
          console.log(this.quotations);
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
