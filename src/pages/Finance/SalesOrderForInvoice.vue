<template>
    <div class="row">
      <div class="col-12">
        <b-breadcrumb id="breadcrumb">
          <b-breadcrumb-item :to="{name: 'invoice'}">
            Invoice List
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            Sales Order List
          </b-breadcrumb-item>
        </b-breadcrumb>
        <card>
          <b-row>
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

                <template v-slot:cell(Action)="row">
                    <router-link :to="{name: 'detail-sales-order-for-invoice', params: {id:row.item.id}}">
                        <b-button id ="add_quotation_button">
                          view
                        </b-button>
                    </router-link>
                </template>
            </b-table>

            <b-pagination class="pagination"
              v-model="akuntable.currentPage"
              :total-rows="sales_orders.length"
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
      akuntable : { 
          currentPage : 1,
          perPage : 5,
          sortDesc : false,
      },
      
      fields: [
          {key: 'id', label: 'Id', sortable: true},
          {key: 'noSalesOrder', label: 'Sales Order No', sortable: true},
          {key: 'poNumber', label: 'Purchase Order No', sortable: true},
          {key: 'company.nama', label: 'Company Nama', sortable:true},
          {key: 'date', label: 'Date', sortable:true},
          'Action'
      ],
      sales_orders :[],
      keyword :'',
    }
  },
   computed: {
      items() {
          return this.sales_orders;
      },
  },


  beforeMount(){
      this.getAllSalesOrder();
      this.test();
  },
  methods:{
      getAllSalesOrder: function(){
          axios.get('http://localhost:8080/api/sales-order/all')
          .then(result => this.sales_orders = result.data.result);
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
