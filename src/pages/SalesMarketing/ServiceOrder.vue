<template>

    <b-row class="service_order_row">
        <span class = "col-md-6 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label>Description</label>
        </span>
        <div class = "col-md-5 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="deskripsi"
                v-model="service_order.deskripsi"
                type="text"
                required
                placeholder="Description"
                >
            </b-form-input>
        </div>

         <span class = "col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label>Quantity</label>
        </span>

         <div class= "col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="quantity"
                v-model="service_order.quantity"
                type="number"
                required
                placeholder="0"
                >
            </b-form-input>
        </div>

         <span class = "col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label>UOM</label>
        </span>

         <div class= "col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="uom"
                v-model="service_order.uom"
                type="text"
                required
                placeholder="UOM"
                >
            </b-form-input>
        </div>

         <span class = "col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label>Price Per Unit</label>
        </span>

        <div class= "col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="pricePerUnit"
                v-model="service_order.pricePerUnit"
                type="number"
                required
                placeholder="0"
                >
            </b-form-input>
        </div>


        <span class = "col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
        </span>
        <div class = "col-md-1   col-sm-8 col-xs-8 col-7">
            <b-button @click="$emit('del-service-order', service_order.id_service_order)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </div>

    </b-row>

</template>


<script>
export default {
    name: "ServiceOrder",
    props: ["service_order"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.service_order_row{
    margin-bottom: 10px;
    margin-right: 0px;
}

</style>