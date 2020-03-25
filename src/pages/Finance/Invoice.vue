<template>
    <div class="row">
        <div class="col-12">
            <h3 class="judul">
                <strong>Invoice</strong>
            </h3>
            <card>
                <button id="add_invoice_bttn" class="btn btn-primary">
                    Add Invoice
                    <span class="ti-plus"></span>
                </button>
                <template>
                    <mdb-datatable
                        :data="data"
                        striped
                        responsive
                    />
                </template>
            </card>
        </div>
    </div>
</template>

<script>
import { PaperTable } from "@/components";
import { mdbDatatable } from "mdbvue";
import axios from "axios";

const tableColumns = [
    {
        label: 'No',
        field: 'no',
        sort: 'asc'
    },
    {
        label: 'Invoice No',
        field: 'invoice no',
        sort: 'asc'
    },
    {
        label: 'Purchase Order No',
        field: 'purchase order no',
        sort: 'asc'
    },
    {
        label: 'Company Name',
        field: 'company name',
        sort: 'asc'
    },
    {
        label: 'Date',
        field: 'date',
        sort: 'asc',
    },
    {
        label: 'Total Price',
        field: 'total price',
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
        'invoice no': "012/XI/2019",
        'purchase order no': "PO22-UNI100819001",
        'company name': "PT Unilever",
        'date': "Nov 26, 2019",
        'total price': '19.800.000',
        'action': 'view',
    },
    {
        no: 2,
        'invoice no': "011/X/2019",
        'purchase order no': "PO88-AUG030002019",
        'company name': "PT. INDOGEOTECH ",
        'date': 'Oct 11, 2019',
        'total price': '111.200.000',
        'action': 'view',
    },
    {
        no: 3,
        'invoice no': "010/III/2019",
        'purchase order no': "PO01-JAN011900001",
        'company name': "PT. Telkom Indonesia ",
        'date': "Mar 30, 2019",
        'total price': "87.700.000",
        'action': 'view',
    },
    {
        no: 4,
        'invoice no': "09/III/2019",
        'purchase order no': "PO02-AD0450104198",
        'company name': "PT PLN",
        'date': "Mar 4, 2019",
        'total price': "24.800.000",
        'action': 'view',
    },
];

//if get data from backend
export default {
    name: 'DatatablePage',
    components: {
        PaperTable,
        mdbDatatable
    },

    data() {
        return {
            invoices: [],
            data: {
                title: "Invoice List",
                subTitle: "",
                columns: [...tableColumns],
                rows: [...tableData]
            }
        };
    },

    beforeMount(){
        this.getAllInvoice();
    },

    methods: {
        getAllInvoice: function(){
            axios.get('http://localhost:8080/api/quotation/all')
            .then(result => this.invoices = result.data)
            .catch(err => this.invoices = err.data.result);
        },

        // to clear the search keywords
        clear(){
            this.keyword = '';
        },
    }
};
</script>

<style>
#add_invoice_bttn{
    background-color: #109cf1;
    color: white;
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