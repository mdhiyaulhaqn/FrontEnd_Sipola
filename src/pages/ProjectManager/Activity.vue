<template>

<b-row class="activity_row">
    <b-col md="5">
        <b-form-input
            id="namaTugas"
            v-model="activity.namaTugas"
            type="text"
            required
            placeholder="Activity Name"
            >
        </b-form-input>
    </b-col>

    <b-col md="3">
            <b-form-input
            id="tanggalMulaiTugas"
            v-model="activity.tanggalMulaiTugas"
            type="date"
            required
            >
        </b-form-input>
    </b-col>

    <b-col md="3">
           <b-form-input
            id="tanggalSelesaiTugas"
            v-model="activity.tanggalSelesaiTugas"
            type="date"
            required
            >
        </b-form-input>
    </b-col>

    <b-col md="1">
        <b-button @click="$emit('del-activity', activity.id_activity)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </b-col>

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

</style>
