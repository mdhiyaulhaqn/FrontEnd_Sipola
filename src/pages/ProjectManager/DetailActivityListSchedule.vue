<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Detail Activity List Schedule</strong></h3>
      <card>
        <div class="vue-app">
          <kendo-gantt id="gantt"
                      :height="'500'"
                      :editable-create="false"
                      :data-source="datasource"
                      :dependencies="dependencydatasource">
              <kendo-gantt-view :type="'day'"></kendo-gantt-view>
              <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
              <kendo-gantt-view :type="'month'"></kendo-gantt-view>
          </kendo-gantt>
        </div>
      </card>
    </div>
  </div>
</template>
<script>

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
      activityListSchedule: [],
    }
  },
  computed: {
    items() {
      return this.activityListSchedule;
    }
  },
  beforeMount() {
    this.getAllActivityListSchedule();
  },
  methods: {
    getAllActivityListSchedule: function(){
      axios.get('http://localhost:8081/api/activity-list-schedule/all')
      .then(response => this.activityListSchedule = response.data.result);
    },
  }
}
</script>

<style scoped>

</style>