<template>
    <div class="row">
      <div class="col-12">
        <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Quotation
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Quotation</strong></h3>
        <card>
          <b-container fluid>
            <!-- User Interface controls -->
            <b-row align-h="between" style="margin-top: 12px;">
              <b-col md="2">
                <router-link :to="{name: 'add-quotation'}">
                  <b-button id ="add_quotation_button" class="btn btn-primary" style="margin-left: 0;">
                    <b-row align-h="center">
                        <p style="font-size: 12px">
                          Add Quotation
                        </p>
                        <div style="margin-left: 10px; margin-top: -4px">
                          <img src="@/assets/img/add-circle-icon.png" alt="" width="25px">
                        </div>
                    </b-row>
                  </b-button>
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
                      placeholder="No Quotation, Company, Date"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>

            </b-row>

            <!-- Main table element -->
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
              sort-icon-right
              :sticky-header="true"
              >
              <template v-slot:head(index)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(noQuotation)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(company.nama)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(service.length)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(total_harga_semua)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(date)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>
              <template v-slot:head(action)="data">
                <div class="text-nowrap" style="font-size: 13px;">{{ data.label }}</div>
              </template>

              <template v-slot:cell(index)="row">
                  {{row.index + 1}}
              </template>

              <template v-slot:cell(date)="row">
                  {{row.item.date | moment("ll") }}
              </template>

              <template v-slot:cell(action)="row">
                <router-link :to="{name: 'detail-quotation', params: {id:row.item.id}}">
                  <b-button id="view_button" class="btn btn-primary">
                    View
                  </b-button>
                </router-link>
              </template>

            </b-table>

            <b-row align-h="between">
              <b-col cols="4">
                <div v-if="perPage > quotations.length" class="my-2">
                  <b-card-sub-title>Showing {{ quotations.length }} of {{ quotations.length }}</b-card-sub-title>
                </div>
                <div v-else-if="currentPage != 1" class="my-2">
                  <b-card-sub-title>Showing {{ quotations.length % perPage }} of {{ quotations.length }}</b-card-sub-title>
                </div>
                <div v-else class="my-2">
                  <b-card-sub-title>Showing {{ perPage }} of {{ quotations.length }}</b-card-sub-title>
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
                    ></b-form-select>
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
import axios from 'axios';

export default {

  data() {
    return {
        fields: [
          {key: 'index', label: 'No'},
          {key: 'noQuotation', label: 'No Quotation', sortable: true},
          {key: 'company.nama', label: 'Company Name', sortable:true},
          {key: 'service.length', label: 'Total Works', sortable:true},
          {key: 'total_harga_semua', label: 'Total Price (IDR)', sortable:true},
          {key: 'date', label: 'Date', sortable:true},
          {key: 'action', label: 'Action'}
        ],
        quotations :[],
        quotations_total_price : [],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 25, 50, 100],
        sortBy: 'id',
        sortDesc: true,
        sortDirection: 'desc',
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
      this.totalRows = this.quotations.length;
      return this.quotations;
    }
  },

  beforeMount(){
      this.getAllQuotation();
  },

  methods:{
      getAllQuotation: function(){
          axios.get('http://localhost:8080/api/quotation/all')
          .then(result => {this.quotations = result.data.result, this.getPriceData()});
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },

      getPriceData(){

          for(let i = 0 ; i < this.quotations.length ; i++){
            var total_harga_semua = 0;
            for (let j = 0; j < this.quotations[i].service.length ; j++) {
                this.quotations[i].service[j].total_harga = this.quotations[i].service[j].harga * this.quotations[i].service[j].quantity;
                total_harga_semua +=  this.quotations[i].service[j].total_harga;
            }
            this.quotations[i].total_harga_semua = 'Rp ' + total_harga_semua.toLocaleString('de-DE') + ',00';
          }
      },
    }
};
</script>
<style scoped>
.table{
  font-size: 12px;
}
#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  line-height: 8px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
#add_quotation_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 150px;
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
#breadcrumb{
    font-size: 12px;
    /* text-decoration: underline; */
    margin: -35px 0 -5px -15px;
    color: #FF3E1D;
    background: none;
}

</style>
