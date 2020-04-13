<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Expense
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Expense</strong></h3>
      <card>
        <b-row>
          <router-link :to="{name: 'add-expense'}">
            <button id ="add_quotation_button" class="btn btn-primary">
              Add Expense
              <span class="ti-plus"></span>
            </button>
          </router-link>
          <b-col sm="5" lg="6" class="my-1">
              <b-form-group
                label="Filter"
                label-cols-sm="4"
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
                    placeholder="Type to Search"
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
            small
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
          >

            <template v-slot:cell(id)="row">
              {{items.indexOf(row.item) + 1}}
            </template>

            <template v-slot:cell(tanggal)="row">
              {{row.item.tanggal.split("T")[0].split("-").reverse().join('-') }}
            </template>

            <template v-slot:cell(action)="row">
              <router-link :to="{name: 'expense-detail', params: {id:row.item.id}}">
                <b-button id="view_button" class="btn btn-primary">
                  View
                </b-button>
              </router-link>
            </template>

          </b-table>

          <b-row>
            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="Per page"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
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
            <b-col sm="7" md="3" class="my-1">
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
      </card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      pengeluaranList: [],
      fields: [
        { key: 'id', label: 'No', sortable: false },
        { key: 'nama', label: 'Description', sortable: true, },
        { key: 'tanggal', label: 'Date', sortable: true, },
        { key: 'nominal', label: 'Nominal', sortable: true, },
        { key: 'action', label: 'Action', class: 'text-center'}
      ],
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
      this.totalRows = this.pengeluaranList.length
      return this.pengeluaranList;
    }
  },
  beforeMount(){
    this.getAllPengeluaran();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      console.log("Punten")
    },
    getAllPengeluaran: function(){
      axios.get('http://localhost:8080/api/pengeluaran/all')
      .then(response => this.pengeluaranList = response.data.result);
    },
  },
};


</script>
<style scoped>
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

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

#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  height: 36px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
</style>
