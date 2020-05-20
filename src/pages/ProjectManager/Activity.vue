<template>

<b-row class="activity_row" style="margin: 0 -15px 5px -7px;">
    <span class="col-md-5 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Activity Name</label>
    </span>
    <div class="col-md-5 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="namaTugas"
            v-model="activity.namaTugas"
            type="text"
            required
            :maxlength="255"
            placeholder="Activity Name"
            pattern=".*[a-zA-Z].*"
            >
        </b-form-input>
    </div>

    <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Start Date</label>
    </span>
    <div class="col-md-3 col-sm-8 col-xs-8 col-7">
            <b-form-input
            id="tanggalMulaiTugas"
            v-model="activity.tanggalMulaiTugas"
            type="date"
            required
            >
        </b-form-input>
    </div>

    <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">End Date</label>
    </span>
    <div class = "col-md-3 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
           <b-form-input
            id="tanggalSelesaiTugas"
            v-model="activity.tanggalSelesaiTugas"
            type="date"
            required
            >
        </b-form-input>
    </div>

    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none"></span>
    <div class = "col-md-1 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
        <b-button @click="$emit('del-activity', activity.id_activity)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </div>

</b-row>

</template>


<script>
export default {
    name: "Activity",
    props: ["activity"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.activity_row{
    margin-bottom: 10px;
    margin-right: 0px;
}
.label{
  font-weight: 600;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
