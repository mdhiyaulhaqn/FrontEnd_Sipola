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
    <b-modal
      id="modal-delete"
      ref="modal-delete"
      centered
      >
      <template v-slot:modal-title>
        <h5>Delete Activity List Schedule?</h5>
      </template>
      <template v-slot:default>
        <p>It will be removed from the list.</p>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
            Yes, delete it
          </b-button>
          <b-button @click="cancel()" id ="cancel_delete_button" class="btn btn-danger">
            Cancel
          </b-button>
        </b-col>
      </template>
      <!-- <div class="modal-dialog">
        <div class = "info">
          <b-row>
            <b-col cols="3" class="ti-trash"></b-col>
            <b-col cols="9">
                It will be removed from the list.
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col class="button-confirm-group">
            <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
                Yes, delete it
            </b-button>
            <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                Cancel
            </b-button>
          </b-col>
        </b-row>
      </div> -->
    </b-modal>
      <b-modal title="Success!" v-model="successModal" @ok="redirect()" centered ok-only>
        <div class = "container">
          <div class = "info">
            <b-row>
              <span class="ti-success"></span>Activity list schedule for project {{activityListSchedule.namaProyek}} was successfully deleted from list.
            </b-row>
          </div>
        </div>
    </b-modal>
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
      successModal: false,
    }
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.deleteActivityListSchedule(JSON.stringify(this.activityListSchedule));
    },
    showMessage(status){
      this.successModal = true;
    },
    getDetail: function(){
      axios.get('http://localhost:8080/api/activity-list-schedule/' + this.$route.params.id)
      .then(response => this.activityListSchedule = response.data)
      .catch(err => this.activityListSchedule = err.data);
    },
    deleteActivityListSchedule(activityListSchedule){
      axios.put('http://localhost:8080/api/activity-list-schedule/' + this.$route.params.id + '/delete',
      activityListSchedule,
          { headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(res => {this.showMessage(res.data.status)});
    },
    redirect(){
      this.$router.push({ name: 'activity-list-schedule'});
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
.ti-trash{
  font-size: 50px;
  text-align: center;
  color:#ff3e1d;
}
.button-confirm-group{
  text-align: right;
}
#confirm_delete_button{
  font-size: 10px;
  width: 130px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
}
#cancel_delete_button{
  font-size: 10px;
  background-color: #ff3e1d;
  color:white;
  border-color: white;
  border-width: 1px;
}
.modal-title{
  font-weight: bold;
  color: #FF3E1D;
}
</style>

