<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Detail Activity List Schedule</strong></h3>
      <card>
        <b-row>
          <div class="col-sm-12 text-center">
            <h6 class="col-sm-12">{{activityListSchedule.namaProyek}}</h6>
            <p class="col-sm-12">{{activityListSchedule.namaPerusahaan}}</p>
          </div>
        </b-row>
        <div class="vue-app col-sm-12">
          <kendo-gantt id="gantt"
                      :height="'400'"
                      :editable-create="false"
                      :data-source="datasource"
                      :dependencies="dependencydatasource">
            <kendo-gantt-view :type="'day'"></kendo-gantt-view>
            <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
            <kendo-gantt-view :type="'month'"></kendo-gantt-view>
          </kendo-gantt>
        </div>
        <b-row>
          <div class = "col-sm-12" id="notes">
            <h6 class="col-sm-12">Notes :</h6>
            <p class="col-sm-12">{{activityListSchedule.catatan}}</p>
          </div>
        </b-row>
        <b-row>
          <div class = "button-group col-sm-12">
            <b-button v-b-modal.modal-delete id="delete-button" class="btn btn-primary">Delete</b-button>
            <router-link :to="{name: 'update-activity-list-schedule'}">
              <b-button id="edit-button" class="btn btn-primary">Edit</b-button>
            </router-link>
          </div>
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
      datasource: [{
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Main Project",
          summary: true,
          expanded: true,
          percentComplete: 0.3,
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
      },
      {
          id: 1,
          orderId: 1,
          parentId: 0,
          title: "Task1",
          percentComplete: 0.47,
          start: new Date("2014/6/17 11:00"),
          end: new Date("2014/6/20 14:00")
      }],
      dependencydatasource: [{
          predecessorId: 1,
          successorId: 2,
          type: 1
      }],
      activityListSchedule: '',
      successModal: false
    }
  },
  // computed: {
  //   items() {
  //     return this.getDetail;
  //   }
  // },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    showMessage(status){
      this.successModal = true;
    },
    getDetail: function(){
      axios.get('http://localhost:8081/api/activity-list-schedule/' + this.$route.params.id)
      .then(response => this.activityListSchedule = response.data )
      .catch(err => this.activityListSchedule = err.data);
    },
  }
}
</script>

<style scoped>
#notes{
  white-space: pre-line;
}

.vue-app{
  margin-bottom: 20px;
}

.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
}
#edit-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  width: 120px;
  margin-left: 10px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background: #FF3E1D;
  border-color: #FF3E1D;
  border-radius: 5px;
  width: 80px;
}

.button-group{
  margin-top: 30px;
  text-align: center;
}
p{
  font-size: 12px;
}
</style>

