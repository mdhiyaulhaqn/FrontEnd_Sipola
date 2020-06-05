<template>

<b-row class="activity_row" style="margin: 0 -15px 5px -7px;">
    <span class="col-md-5 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Activity Name</label>
    </span>
    <div class="col-md-5 col-sm-8 col-xs-8 col-7">
      <b-form-group>
        <b-form-input
            id="namaTugas"
            v-model="activity.namaTugas"
            type="text"
            required
            :maxlength="255"
            placeholder="Ex: Delivery Radiators, Reporting"
            pattern=".*[a-zA-Z].*"
            >
        </b-form-input>
      </b-form-group>
    </div>

    <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Start Date</label>
    </span>
    <div class="col-md-3 col-sm-8 col-xs-8 col-7">
      <b-form-group :invalid-feedback="invalidFeedback1" :state="state">
        <b-form-input
            id="tanggalMulaiTugas"
            v-model="activity.tanggalMulaiTugas"
            placeholder="Choose a date"
            type="date"
            :state="state"
            required>
        </b-form-input>
      </b-form-group>
    </div>

    <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">End Date</label>
    </span>
    <div class = "col-md-3 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
      <b-form-group :invalid-feedback="invalidFeedback2" :state="state">
        <b-form-input
            id="tanggalSelesaiTugas"
            v-model="activity.tanggalSelesaiTugas"
            placeholder="Choose a date"
            type="date"
            :state="state"
            required>
        </b-form-input>
      </b-form-group>
    </div>

    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none"></span>
    <div class = "col-md-1 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
        <b-button @click="$emit('del-activity', activity.id_activity)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </div>

</b-row>

</template>


<script>
export default {
  data(){
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    minDate.setFullYear(minDate.getFullYear() - 5)
    const maxDate = new Date(today)
    maxDate.setFullYear(maxDate.getFullYear() + 2)
    return {
      name: "Activity",
      min: minDate,
      max: maxDate,
    }
  },
  props: ["activity"],

  computed:{
    state() {
      if ((this.activity.tanggalSelesaiTugas && this.activity.tanggalMulaiTugas) === '') return null
      return this.activity.tanggalSelesaiTugas >= this.activity.tanggalMulaiTugas ? true : false
    },
    invalidFeedback1() {
      if (this.activity.tanggalMulaiTugas === '') return ''
      if (this.activity.tanggalSelesaiTugas >= this.activity.tanggalMulaiTugas) {
        return ''
      } else {
        return 'Start date must be before end date.'
      }
    },
    invalidFeedback2() {
      if (this.activity.tanggalSelesaiTugas === '') return ''
      if (this.activity.tanggalSelesaiTugas >= this.activity.tanggalMulaiTugas) {
        return ''
      } else {
        return 'End date must be after start date.'
      }
    },
  },

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
