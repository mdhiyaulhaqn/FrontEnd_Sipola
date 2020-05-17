<template>
    <div class="row">
        <div class="col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item active>
                    Purchase Order
                </b-breadcrumb-item>
            </b-breadcrumb>
            <h3 class="judul"><strong>Purchase Order</strong></h3>
            <card>
              <b-container fluid>
                <b-row align-h="between" style="margin-top: 12px;">
                    <b-col md="2">
                        <router-link :to="{name: 'purchase-order-add'}">
                            <button id="purchaseorder_bttn" class="btn btn-primary">
                                <b-row align-h="center">
                                    <p style="font-size: 12px">Add Purchase Order</p>
                                    <div style="margin-left: 10px; margin-top: -4px">
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
                                    placeholder="Search">
                                </b-form-input>
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
                    :per-page="perPage"
                    :current-page="currentPage"
                    :filter="filter"
                    :filter-included-fields="filterOn"
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
                    <template v-slot:head(noPurchaseOrder)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(noProject)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(company.nama)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(datePurchaseOrder)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(total_price)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(action)="data">
                      <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
                    </template>

                    <template v-slot:cell(index) = "row">
                        {{row.index + 1}}
                    </template>

                    <template v-slot:cell(datePurchaseOrder) = "row">
                        {{row.item.datePurchaseOrder | moment("ll") }}
                    </template>

                    <template v-slot:cell(total_price) = "row">
                        {{formatPrice(row.item.total_price)}}
                    </template>

                    <template v-slot:cell(action)="row">
                        <router-link :to="{name: 'detail-purchase-order', params: {id:row.item.id}}">
                            <b-button id="view_bttn" class="btn btn-primary">
                                View
                            </b-button>
                        </router-link>
                    </template>
                </b-table>

                <b-row align-h="between">
                    <b-col cols="4">
                        <div v-if="perPage > purchaseOrders.length" class="my-2">
                            <b-card-sub-title>Showing {{ purchaseOrders.length }} of {{ purchaseOrders.length }}</b-card-sub-title>
                        </div>
                        <div v-else-if="currentPage != 1" class="my-2">
                            <b-card-sub-title>Showing {{ purchaseOrders.length % perPage }} of {{ purchaseOrders.length }}</b-card-sub-title>
                        </div>
                        <div v-else class="my-2">
                            <b-card-sub-title>Showing {{ perPage }} of {{ purchaseOrders.length }}</b-card-sub-title>
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
                                >
                                </b-form-select>
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
import axios from "axios";

export default {
    data(){
        return{
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
                {key: 'index', label: 'No' },
                {key: 'noPurchaseOrder', label: 'Purchase Order No', sortable: true},
                {key: 'noProject', label: 'Project No', sortable: true},
                {key: 'company.nama', label: 'Company Name', sortable: true},
                {key: 'datePurchaseOrder', label: 'Date', sortable: true},
                {key: 'total_price', label: 'Total Price (IDR)', sortable: true},
                {key: 'action', label: 'Action'}
            ],

            purchaseOrders: [],
            purchaseOrders_total_price: [],
        }
    },

    computed: {
        sortOptions(){
            // Create an options list from our fields
             return this.fields
                 .filter(f => f.sortable)
                 .map(f => {
                    return { text: f.label, value: f.key }
                 })
        },
        items(){
            this.totalRows = this.purchaseOrders.length;
            return this.purchaseOrders;
        }
    },

    beforeMount(){
        this.getAllPurchaseOrder();
    },

    methods:{
        getAllPurchaseOrder: function(){
            axios.get('http://localhost:8080/api/purchase-order/all')
            .then(result => {this.purchaseOrders = result.data.result, this.getPriceData()})
            .catch(err => this.purchaseOrders = err.data.result);
        },

        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
        },

        getPriceData(){
            for(let i = 0; i < this.purchaseOrders.length; i++){
                var total_price = 0;
                for (let j = 0; j < this.purchaseOrders[i].purchasedItems.length; j++){
                    this.purchaseOrders[i].purchasedItems[j].total_per_item = this.purchaseOrders[i].purchasedItems[j].pricePerUnit * this.purchaseOrders[i].purchasedItems[j].quantity;
                    total_price += this.purchaseOrders[i].purchasedItems[j].total_per_item;
                }
                total_price += total_price * 0.1
                this.purchaseOrders[i].total_price = total_price;
            }
        },

        formatPrice(value) {
            if(value < 0){
                value *= -1
            }
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
};
</script>

<style scoped>
#view_bttn{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  line-height: 8px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
#purchaseorder_bttn{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 180px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
.pagination{
    margin-left: 20px;
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
