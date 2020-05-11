<template>
    <div class="row">
      <div class="col-12">
         <b-breadcrumb id="breadcrumb">
          <b-breadcrumb-item active>
            Delivery Order
          </b-breadcrumb-item>
        </b-breadcrumb>
        <card>
           <b-container fluid>
          <b-row align-h="between" style="margin-top: 12px;">
            <b-col md="2">
              <router-link :to="{name: 'add-delivery-order'}">
            <button id ="add_quotation_button" class="btn btn-primary">
              <b-row align-h="center">
                  <p style="font-size: 12px">
                    Add Delivery Order
                  </p>
                  <div style="margin-left: 10px; margin-top: -3px">
                    <img src="@/assets/img/add-circle-icon.png" alt="" width="25px">
                  </div>
              </b-row>
            </button>
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
                    placeholder="No Delivery Order, Company, Date"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

          </b-row>
                 
          <div slot="raw-content" class="table-responsive">     
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

                <template v-slot:cell(createdAt)="row">
                   {{row.item.createdAt.split("T")[0].split("-").join('-') | moment("ll") }}
                </template>

<!-- 
                 <template v-slot:cell(total_price) = "row">
                    {{row.item.service[1].harga}}
                </template> -->

                <template v-slot:cell(Action)="row">
                    <router-link :to="{name: 'detail-delivery-order', params: {id:row.item.id}}">
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

             
          </div>
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
          {key: 'id', label: 'Id', sortable: true},
          {key: 'noDeliveryOrder', label: 'Delivery Order No', sortable: true},
          {key: 'poNumber', label: 'Purchase Order No', sortable: true},
          {key: 'company.nama', label: 'Company Name', sortable:true},
          {key: 'totalOrder', label: 'Total Order', sortable:true},
          {key: 'createdAt', label: 'Created At', sortable:true},
         
          'Action'
      ],
      delivery_orders :[],

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
         this.totalRows = this.delivery_orders.length;
        return this.delivery_orders;
      },
  },

  beforeMount(){
      this.getAllDeliveryOrder();
  },
  methods:{
      getAllDeliveryOrder: function(){
          axios.get('http://localhost:8080/api/delivery-order/all')
          .then(result => {this.delivery_orders = result.data.result, this.getAllOrder()});
      },
      getAllOrder(){
          for(let i = 0; i < this.delivery_orders.length; i++){
              this.delivery_orders[i].totalOrder = this.delivery_orders[i].product.length;
          }
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
#add_quotation_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 160px;
  height: 36px;
  margin-bottom: 4px;
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
#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  line-height: 10px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
</style>
