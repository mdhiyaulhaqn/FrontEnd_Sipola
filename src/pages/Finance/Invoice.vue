<template>
    <div class="row">
        <div class="col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item active>
                    Invoice List
                </b-breadcrumb-item>
            </b-breadcrumb>

            <div class="judul">
                <strong>Invoice List</strong>
            </div>

            <card>
                <b-container fluid>
                    <b-row align-h="between" style="margin-top: 12px;">
                        <b-col md="2">
                            <router-link :to="{name: 'sales-order-for-invoice'}">
                                <button id="invoice_bttn" class="btn btn-primary">
                                    <b-row align-h="center">
                                        <p style="font-size: 12px"> Add Invoice </p>
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
                            sort-icon-left
                            :sticky-header="true"
                        >

                            <template v-slot:cell(id) = "row">
                                {{items.indexOf(row.item) + 1}}
                            </template>

                            <template v-slot:cell(dateInvoice)="row">
                                {{row.item.dateInvoice.split("T")[0].split("-").reverse().join('-') }}
                            </template>

                            <template v-slot:cell(dueDatePayment)="row">
                                {{row.item.dueDatePayment.split("T")[0].split("-").reverse().join('-') }}
                            </template>

                            <!-- <template v:slot:cell(total_price)="row">
                                {{}}
                            </template> -->

                            <template v-slot:cell(Action)="row">
                                <router-link :to="{name: 'detail-invoice', params: {id:row.item.id}}">
                                    <b-button id="view_bttn">
                                        View
                                    </b-button>
                                </router-link>
                            </template>
                        </b-table>

                        <div class="row">
                            <div v-if="perPage > invoices.length"
                                class="col-md-7 col-sm-7 col-xs-7 col-12 d-block d-xs-block d-sm-block my-2">
                                <b-card-sub-title>Showing {{ invoices.length }} of {{ invoices.length }}</b-card-sub-title>
                            </div>
                            <div v-else-if="currentPage != 1"
                            class="col-md-7 col-sm-7 col-xs-7 col-6 d-block d-xs-block d-sm-block my-2">
                                <b-card-sub-title>Showing {{ invoices.length % perPage }} of {{ invoices.length }}</b-card-sub-title>
                            </div>
                            <div v-else
                            class="col-md-7 col-sm-7 col-xs-7 col-12 d-block d-xs-block d-sm-block my-2">
                                <b-card-sub-title>Showing {{ perPage }} of {{ invoices.length }}</b-card-sub-title>
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3 col-6 d-block d-xs-block d-sm-block">
                                <b-form-group
                                    label="Rows per page:"
                                    label-cols="12"
                                    label-cols-sm="8"
                                    label-cols-md="8"
                                    label-cols-xl="8"
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
                            <div class="col-md-2 col-sm-2 col-xs-2 col-12 d-block d-xs-block d-sm-block">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="fill"
                                    size="sm"
                                    class="my-0"
                                ></b-pagination>
                            </div>
                        </div>
                    </div>
                </b-container>
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
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filerOn: [],

            fields: [
                {key: 'id', label: 'Id', sortable: true},
                {key: 'noInvoice', label: 'No Invoice', sortable: true},
                {key: 'salesOrder.poNumber', label: 'No Purchase Order', sortable: true},
                {key: 'salesOrder.company.nama', label: 'Company Name', sortable: true},
                {key: 'dateInvoice', label: 'Invoice Date', sortable: true},
                {key: 'dueDatePayment', label: 'Due Date', sortable: true},
                'Action'
            ],

            invoices: [],
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
        items(){
            this.totalRows = this.invoices.length;
            return this.invoices;
        },
    },

    beforeMount(){
        this.getAllInvoice();
    },

    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

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
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 136px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
#view_bttn{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  line-height: 10px;
  width: 80px;
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