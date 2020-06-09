<template>

<b-row class="product_row" style="margin: 0 -15px 0 -7px;">
    <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Description</label>
    </span>

    <div class = "col-md-6 col-sm-8 col-xs-8 col-7">
        <b-form-input
            id="nama"
            v-model="product.nama"
            type="text"
            required
            placeholder="Item"
            pattern=".*[a-zA-Z0-9-].*"
            >
        </b-form-input>
    </div>

    <span class = "col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">Quantity</label>
    </span>
    <div class= "col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
            id="quantity"
            v-model="product.quantity"
            type="number"
            required
            placeholder="0"
            min="0"
            >
        </b-form-input>
    </div>

     <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
        <label class="label" style="margin-left: -8px;">UOM</label>
    </span>

    <div class = "col-md-3 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
        <b-form-input
            id="uom"
            v-model="product.uom"
            type="text"
            placeholder="Uom"
            pattern=".*[a-zA-Z0-9-].*"
            >
        </b-form-input>
    </div>
    <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
    </span>
    <div class = "col-md-1 col-sm-8 col-xs-8 col-7" style="margin-bottom: 5px;">
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

