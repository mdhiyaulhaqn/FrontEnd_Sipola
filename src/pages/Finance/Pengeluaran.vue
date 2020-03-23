<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Expense</strong></h3>
      <card>
        <router-link to="expense-add">
          <button id ="add_quotation_button" class="btn btn-primary">
            Add Expense
            <span class="ti-plus"></span>
          </button>
        </router-link>
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

// Untuk Static Data
// const tableColumns = [
//             {
//               label: 'No',
//               field: 'no',
//               sort: 'asc'
//             },
//             {
//               label: 'Description',
//               field: 'nama',
//               sort: 'asc'
//             },
//             {
//               label: 'Date',
//               field: 'tanggal',
//               sort: 'asc'
//             },
//             {
//               label: 'Nominal',
//               field: 'nominal',
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
//     'nama': "QS 14/12/094",
//     'tanggal': "PT PLN Indonesia",
//     'nominal' : '2',
//   },
//   {
//      no: 2,
//     'nama': "QS 14/12/094",
//     'tanggal': "PT PLN Indonesia",
//     'nominal' : '2',
//   },
//   {
//      no: 3,
//     'nama': "QS 14/12/094",
//     'tanggal': "PT PLN Indonesia",
//     'nominal' : '2',
//   },
// ];

export default {
  name: 'DatatablePage',
  components: {
    PaperTable,
    mdbDatatable
  },
    data() {
    return {
      columns: [],
      rows: []
    }
  },
  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    },
  },
  methods: {
    filterData(dataArr, keys) {
      let data = dataArr.map(entry => {
        let filteredEntry = {};
        keys.forEach(key => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    }
  },
  mounted(){
      console.log("Mounted");
    fetch('http://localhost:8080/api/pengeluaran/all')
      .then(res => res.json())
      .then(json => {
        let keys = ["id", "nama", "tanggal", "nominal", "Action"];
        let entries = this.filterData(json, keys);
        //columns
        this.columns = keys.map(key => {
          return {
            label: key,
            field: key,
            sort: 'asc'
          };
        });
        //rows
        entries.map(entry => this.rows.push(entry));
      })
      .catch(err => console.log(err));
  },

  addPengeluaran(){
    router.push("/expense-detail")
  }

//   data() {
//     return {
//       pengeluaranList :[],
//       table1: {
//         title: "Pengeluaran List",
//         subTitle: "",
//         columns: [...tableColumns],
//         data: [...pengeluaranList]
//       },
//     };
//   },
//   data() {
//     return {
//       data: {
//         title: "Expense List",
//         subTitle: "",
//         columns: [...tableColumns],
//         rows: [...tableData]
//       }
//     }
//   },
//   beforeMount(){
//       this.getAllPengeluaran();
//   },
//   methods:{
//       getAllPengeluaran: function(){
//           axios.get('http://localhost:8080/api/pengeluaran')
//           .then(result => this.pengeluaranList = result.data)
//           .then(console.log(res))
//           .catch(err => this.pengeluaranList = err.data.result);
//       },
//       clear(){
//           this.keyword = '';
//       },
//   }
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
