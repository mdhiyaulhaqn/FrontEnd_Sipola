<template>
    <div class="row">
        <div class="col-12">
            <card>
                <b-row>
                    <router-link :to="{name: 'sales-order-for-invoice'}">
                    <button id="invoice_bttn" class="btn btn-primary">
                     Add Invoice
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

                        <template v-slot:cell(id) = "row">
                            {{items.indexOf(row.item) + 1}}
                        </template>

                        <template v-slot:cell(date)="row">
                            {{row.item.dateInvoice.split("T")[0].split("-").reverse().join('-') }}
                        </template>

                        <!-- <template v:slot:cell(total_price)="row">
                            {{}}
                        </template> -->

                        <template v-slot:cell(Action)="row">
                            <router-link :to="{name: 'detail-invoice', params: {id:row.item.id}}">
                                <b-button id="invoice_bttn">
                                    View
                                </b-button>
                            </router-link>
                        </template>
                    </b-table>

                    <b-pagination class="pagination"
                        v-model="akuntable.currentPage"
                        :total-rows="invoices.length"
                        :per-page="akuntable.perPage"
                        aria-controls="myTable"/>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Datatable from "v-data-table";

// get data from backend
export default {
    data(){
        return{
            akuntable : {
                currentPage: 1,
                perPage: 5,
                sortDesc: false,
            },
            
            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'noInvoice', label: 'No Invoice', sortable: true},
                {key: 'noPurchaseOrder', label: 'No Purchase Order', sortable: true},
                {key: 'company.nama', label: 'Company Name', sortable: true},
                {key: 'dateInvoice', label: 'Date', sortable: true},
                // 'totalPrice'
                'Action'
            ],

            invoices: [],
            keyword: '',
        }
    },

    computed: {
        items(){
            return this.invoices;
        },
    },

    beforeMount(){
        this.getAllInvoice();
    },

    methods: {
        getAllInvoice: function(){
            axios.get('http://localhost:8080/api/invoice/all')
            .then(result => this.invoices = result.data.result)
            .catch(err => this.invoices = err.data.result);

            console.log(this.items.getAllInvoice);
        },

        // to clear the search keywords
        clear(){
            this.keyword = '';
        },
    }
};
</script>

<style>
#invoice_bttn{
    background-color: #109cf1;
    color: white;
    border-color: transparent;
    font-size: 10px;
    margin-bottom: 4px;
    margin-left: 20px;
    box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
    text-align: center;
    color: black;
    margin: 5px 0 24px 0;
}
.pagination{
    margin-left: 20px;
}
</style>