<template>

    <b-row class="service_order_row">
        <span class="col-md-5 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label class="label">Description</label>
        </span>        
        <div class="col-md-5 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="deskripsi"
                v-model="service_order.deskripsi"
                type="text"
                required
                placeholder="Description"
                disabled
                >
            </b-form-input>
        </div>

        <span class="col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label class="label">UOM</label>
        </span>
        <div class="col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="uom"
                v-model="service_order.uom"
                type="text"
                required
                placeholder="UOM"
                disabled
                >
            </b-form-input>
        </div>

        <span class="col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label class="label">Quantity</label>
        </span>
        <div class="col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="quantity"
                v-model="service_order.quantity"
                type="number"
                required
                placeholder="0"
                disabled
                >
            </b-form-input>
        </div>
        
        <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none">
            <label class="label">Unit Price (IDR)</label>
        </span>
        <div class="col-md-3 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="pricePerUnit"
                v-model="service_order.pricePerUnit"
                type="number"
                required
                placeholder="0"
                disabled
                >
            </b-form-input>
        </div>

<!-- 
        <b-col md="1">
            <b-button @click="$emit('del-service-order', service_order.id_service_order)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </b-col> -->

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