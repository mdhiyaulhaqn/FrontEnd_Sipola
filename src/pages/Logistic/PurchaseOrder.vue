<template>
    <div class="row">
        <div class="col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item active>
                    Purchase Order List
                </b-breadcrumb-item>
            </b-breadcrumb>

            <div class="judul">
                <strong>Purchase Order List</strong>
            </div>

            <card>
                <b-container fluid>
                    <b-row align-h="between" style="margin-top: 12px">
                        <b-col md="2">
                            <router-link :to="{name: 'purchase-order-add'}">
                                <button id="purchaseorder_bttn" class="btn btn-primary">
                                    <b-row align-h="center">
                                        <p style="font-size: 12px"> Add Purchase Order </p>
                                        <div style="margin-left: 10px; margin-top: -3px">
                                            <img src="@/assets/img/add-circle-icon.png" alt="" width="25px">
                                        </div>
                                    </b-row>
                                </button>
                            </router-link>
                        </b-col>
                        <b-col md="10">
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

                    <div slot="raw-content" class="table-responsive">
                        <b-table
                            responsive
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
                            sort-icon-left
                            :sticky-header="true"
                        >
                            <template v-slot:cell(id) = "row">
                                {{items.indexOf(row.item) + 1}}
                            </template>

                            <template v-slot:cell(datePurchaseOrder) = "row">
                                {{row.item.datePurchaseOrder.split("T")[0].split("-").reverse().join('-')}}
                            </template>

                            <template v-slot:cell(total_price) = "row">
                                {{row.item.purchasedItems[1].harga}}
                            </template>

                            <template v-slot:cell(Action) = "row">
                                <router-link :to="{name: 'detail-purchase-order', params: {id:row.item.id}}">
                                    <b-button id="purchaseorder_bttn">
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
                                    >
                                    </b-form-select>
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
import axios from "axios";
import Datatable from "v-data-table";

export default {
    data(){
        return{
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
                {key: 'id', label: 'Id', sortable: true},
                {key: 'noPurchaseOrder', label: 'Purchase Order No', sortable: true},
                {key: 'noProject', label: 'Project No', sortable: true},
                {key: 'company.nama', label: 'Company Name', sortable: true},
                {key: 'datePurchaseOrder', label: 'Date', sortable: true},
                {key: 'total_price', label: 'Total Price (IDR)', sortable: true, formatter: value => {
                    return value.toLocaleString('id-ID') + ",00"
                }},
                'View'
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
            .then(result => {this.purchaseOrders = result.data.result, this.getPriceData()});
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
    }
};
</script>

<style>
#purchaseorder_bttn{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 170px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 20px;
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
</style>