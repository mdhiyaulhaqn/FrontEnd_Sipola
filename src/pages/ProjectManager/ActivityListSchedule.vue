<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item active>
          Activity List Schedule
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Activity List Schedule</strong></h3>
      <card>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row align-h="between" style="margin-top: 12px;">
            <b-col md="2">
              <router-link :to="{name: 'add-activity-list-schedule'}">
                <b-button id ="add_activity_button" class="btn btn-primary">
                Add Activity
                <span class="ti-plus"></span>
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
                    placeholder="Replacement"
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
            sort-icon-left
            :sticky-header="true"
            >

            <template v-slot:cell(id)="row">
              {{items.indexOf(row.item) + 1}}
            </template>

            <template v-slot:cell(listTugas[0].tanggalMulaiTugas)="row">
              {{ row.item.listTugas[0].tanggalMulaiTugas | moment("ll") }}
            </template>
            <template v-slot:cell(listTugas[0].tanggalSelesaiTugas)="row">
              {{ row.item.listTugas.slice(-1)[0].tanggalSelesaiTugas | moment("ll") }}
            </template>

            <template v-slot:cell(action)="row">
              <router-link :to="{name: 'detail-activity-list-schedule', params: {id:row.item.id}}">
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
      activityListSchedule: [],
      fields: [
        { key: 'id', label: 'No', sortable: false, },
        { key: 'namaProyek', label: 'Project Name', sortable: true, },
        { key: 'namaPerusahaan', label: 'Company Name', sortable: true, },
        { key: 'listTugas[0].tanggalMulaiTugas', label: 'Start Date', sortable: true, },
        { key: 'listTugas[0].tanggalSelesaiTugas', label: 'End Date', sortable: true, },
        { key: 'action', label: 'Action', }
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
      this.totalRows = this.activityListSchedule.length;
      return this.activityListSchedule;
    }
  },
  beforeMount() {
    this.getAllActivityListSchedule();
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getAllActivityListSchedule: function(){
      axios.get('http://localhost:8080/api/activity-list-schedule/all')
      .then(response => this.activityListSchedule = response.data.result);
    },
  }
}
</script>
<style scoped>
#add_activity_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  width: 136px;
  height: 36px;
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
#view_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  line-height: 8px;
  width: 80px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}
.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
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
