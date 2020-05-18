<template>

<b-row class="product_row">
    <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label">Description</label>
    </span>

    <div class = "col-md-6 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="nama"
            v-model="product.nama"
            type="text"
            required
            placeholder="Description"
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
            v-model="product.quantity"
            type="number"
            required
            placeholder="0"
            >
        </b-form-input>
    </div>

     <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label">Project/Service No</label>
    </span>

    <div class = "col-md-3 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="projectNo"
            v-model="product.projectNo"
            type="text"
            placeholder="Project / Service No"
            pattern=".*[a-zA-Z0-9-].*"
            >
        </b-form-input>
    </div>
    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
    </span>
    <div class = "col-md-1   col-sm-8 col-xs-8 col-7">
        <b-button id="delete-button" @click="$emit('del-product', product.id_product)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
    </div>

    </b-row>

</template>


<script>
export default {
    name: "Product",
    props: ["product"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.product_row{
    margin:auto;
}
.label{
  font-weight: 600;
}
.required label:after {
  content:" *";
  color: red;
}
</style>

