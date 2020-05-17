<template>

<b-row class="service_row">
    <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label">Scope of Works</label>
    </span>

    <div class = "col-md-6 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="nama"
            v-model="service.nama"
            type="text"
            required
            placeholder="Scope Name"
            pattern=".*[a-zA-Z0-9-].*"
            >
        </b-form-input>
    </div>

    <span class = "col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label">Quantity</label>
    </span>
    <div class= "col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
            id="quantity"
            v-model="service.quantity"
            type="number"
            required
            placeholder="0"
            min="0"
            >
        </b-form-input>
    </div>

    <span class = "col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label">Unit Price (IDR)</label>
    </span>
    <div class = "col-md-3 col-sm-8 col-xs-8 col-7">
           <b-form-input
            id="harga"
            v-model="service.harga"
            type="number"
            required
            placeholder="0"
            lang="de-DE"
            >
        </b-form-input>
    </div>
    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
    </span>
    <div class = "col-md-1   col-sm-8 col-xs-8 col-7">
        <b-button id="delete-button" @click="$emit('del-service', service.id_service)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </div>

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
    margin:auto;
}
#delete-button{
    width: 100%;
}
.label{
  font-weight: 600;
}
.required label:after {
  content:" *";
  color: red;
}
</style>

