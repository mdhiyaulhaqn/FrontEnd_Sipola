<template>

<b-row class="service_row">
    <b-col md="6">
        <b-form-input
            id="nama"
            v-model="service.nama"
            type="text"
            required
            placeholder="Scope Name"
            >
        </b-form-input>
    </b-col>

    <b-col md="2">
            <b-form-input
            id="quantity"
            v-model="service.quantity"
            type="number"
            required
            placeholder="0"
            >
        </b-form-input>
    </b-col>

    <b-col md="3">
           <b-form-input
            id="harga"
            v-model="service.harga"
            type="number"
            required
            placeholder="0"
            >
        </b-form-input>
    </b-col>

    <b-col md="1">
        <b-button @click="$emit('del-service', service.id_service)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </b-col>

    </b-row>

</template>


<script>
export default {
    name: "Service",
    props: ["service"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.service_row{
    margin-bottom: 10px;
    margin-right: 0px;
}

</style>