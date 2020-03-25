<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Activity List Schedule</strong></h3>
      <card>
        <button id ="add_activity_button" class="btn btn-primary">
          Add Activity
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
import { mdbDatatable, mdbContainer } from 'mdbvue';
import axios from 'axios';

const tableColumns = [
            {
              label: 'No',
              field: 'no',
              sort: 'asc'
            },
            {
              label: 'Project Name',
              field: 'project name',
              sort: 'asc'
            },
            {
              label: 'Company Name',
              field: 'company name',
              sort: 'asc'
            },
            {
              label: 'Start Date',
              field: 'start date',
              sort: 'asc'
            },
            {
              label: 'End Date',
              field: 'end date',
              sort: 'asc'
            },
            {
              label: 'Action',
              field: 'action',
              sort: 'asc'
            },
          ];

export default {
  name: 'DatatablePage',
  components: {
    mdbDatatable,
    mdbContainer
  },
  data() {
    return {
      columns: [],
      rows: []
    }
  },
  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    },
  },
  methods: {
    filterData(dataArr, keys) {
      let data = dataArr.map(entry => {
        let filteredEntry = {};
        keys.forEach(key => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    }
  },
  mounted(){
    fetch('http://localhost:8081/api/activity-list-schedule/all')
      .then(res => res.json())
      .then(json => {
        let keys = ["id", "namaProyek", "namaPerusahaan", "listTugas", "Action"];
        let entries = this.filterData(json, keys);
        //columns
        this.columns = keys.map(key => {
          return {
            label: key,
            field: key,
            sort: 'asc'
          };
        });
        //rows
        entries.map(entry => this.rows.push(entry));
      })
      .catch(err => console.log(err));
  }
};
</script>
<style>
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
.judul{
    text-align: center;
    color: black;
    margin: 5px 0 24px 0;
}
</style>
